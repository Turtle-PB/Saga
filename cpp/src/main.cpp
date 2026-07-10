// main.cpp — WSL Saga Multiverse (C++ / Dear ImGui / Emscripten engine)
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
//
// Rendering strategy:
//   - Dear ImGui BackgroundDrawList  → game canvas (player, enemies, bullets, pickups)
//   - Dear ImGui windows             → all UI (HUD, menus, dialogue)
//   - SDL2 + OpenGL ES 2 / OpenGL 3  → windowing, context, event loop
//
// Build:  make -f Makefile.emscripten          (Emscripten / WebAssembly)
//         make -f Makefile.native              (Linux / macOS native SDL2+GL)

#include "imgui.h"
#include "imgui_impl_sdl2.h"
#include "imgui_impl_opengl3.h"
#include "game_arcs.h"

#include <SDL.h>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <algorithm>
#include <vector>
#include <string>

#if defined(IMGUI_IMPL_OPENGL_ES2)
#include <SDL_opengles2.h>
#else
#include <SDL_opengl.h>
#endif

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
// Emscripten main-loop helper (from Dear ImGui examples)
#include <functional>
static std::function<void()> g_MainLoopFn;
static void EmscriptenMainLoop() { g_MainLoopFn(); }
#define EMSCRIPTEN_MAINLOOP_BEGIN \
    g_MainLoopFn = [&]() { do
#define EMSCRIPTEN_MAINLOOP_END \
    while (0); }; emscripten_set_main_loop(EmscriptenMainLoop, 0, true)
#else
#define EMSCRIPTEN_MAINLOOP_BEGIN
#define EMSCRIPTEN_MAINLOOP_END
#endif

// ── Maths helpers ────────────────────────────────────────────────────────────

struct Vec2 { float x = 0, y = 0; };

static inline Vec2  operator+(Vec2 a, Vec2 b)  { return {a.x+b.x, a.y+b.y}; }
static inline Vec2  operator-(Vec2 a, Vec2 b)  { return {a.x-b.x, a.y-b.y}; }
static inline Vec2  operator*(Vec2 a, float s) { return {a.x*s,   a.y*s};   }
static inline Vec2& operator+=(Vec2& a, Vec2 b){ a.x+=b.x; a.y+=b.y; return a; }
static inline float dot(Vec2 a, Vec2 b)        { return a.x*b.x + a.y*b.y; }
static inline float lenSq(Vec2 v)              { return dot(v, v); }
static inline float len(Vec2 v)                { return sqrtf(lenSq(v)); }
static inline Vec2  normalize(Vec2 v)          {
    float l = len(v);
    return l > 0.0001f ? Vec2{v.x/l, v.y/l} : Vec2{0,0};
}
static inline ImVec2 toIV(Vec2 v)              { return {v.x, v.y}; }

// circleCollides — squared-distance check (no sqrt, matching game-utils.js)
static inline bool circleCollides(Vec2 a, float ar, Vec2 b, float br) {
    float md = ar + br;
    return lenSq(a - b) < md * md;
}

// ── Colour helpers ───────────────────────────────────────────────────────────

// Parse a "#rrggbb" hex colour string to ImU32 (RGBA).
static ImU32 hexCol(const char* hex, float alpha = 1.0f) {
    unsigned r = 0, g = 0, b = 0;
    if (hex && hex[0] == '#')
        sscanf(hex + 1, "%02x%02x%02x", &r, &g, &b);
    return IM_COL32(r, g, b, static_cast<int>(alpha * 255.0f));
}

static ImVec4 hexCol4(const char* hex, float alpha = 1.0f) {
    unsigned r = 0, g = 0, b = 0;
    if (hex && hex[0] == '#')
        sscanf(hex + 1, "%02x%02x%02x", &r, &g, &b);
    return ImVec4(r/255.0f, g/255.0f, b/255.0f, alpha);
}

// ── Game state types ─────────────────────────────────────────────────────────

static const float PLAYER_SPEED    = 220.0f;
static const float PLAYER_RADIUS   = 14.0f;
static const float BULLET_SPEED    = 420.0f;
static const float BULLET_RADIUS   = 5.0f;
static const float ENEMY_RADIUS    = 17.0f;
static const float ENEMY_SPEED_MIN = 55.0f;
static const float ENEMY_SPEED_MAX = 95.0f;
static const float BOSS_RADIUS     = 42.0f;
static const float PICKUP_RADIUS   = 9.0f;
static const float DASH_SPEED      = 600.0f;
static const float DASH_DURATION   = 0.18f;
static const float DASH_COOLDOWN   = 1.2f;
static const int   ENEMIES_PER_ARC = 8;
static const int   BOSS_MAX_HP     = 14;
static const int   SCORE_PER_KILL  = 100;
static const int   SCORE_PER_PICKUP= 50;

enum class GamePhase { MENU, DIALOGUE, PLAYING, BOSS_INTRO, VICTORY_ARC, VICTORY_ALL, GAME_OVER };

struct Bullet  { Vec2 pos, vel; bool alive = true; bool isEnemy = false; };
struct Enemy   { Vec2 pos; float speed; bool alive = true; int hp = 2; float shootTimer = 0; };
struct Boss    { Vec2 pos, vel; int hp = BOSS_MAX_HP; bool alive = false; float shootTimer = 0; };
struct Pickup  { Vec2 pos; bool alive = true; };
struct Particle{ Vec2 pos, vel; float life = 1.0f; float maxLife = 1.0f; ImU32 col; float radius; };

struct GameState {
    GamePhase phase     = GamePhase::MENU;
    int       arcIndex  = 0;      // which arc is active (0–4)
    int       score     = 0;
    int       enemiesKilled = 0;

    // Player
    Vec2  playerPos     = {400, 300};
    Vec2  playerVel     = {};
    float playerHP      = 100.0f;
    bool  dashing       = false;
    float dashTimer     = 0;
    float dashCooldown  = 0;
    float iframes       = 0;   // invincibility frames after hit

    // Game objects
    std::vector<Enemy>   enemies;
    Boss                 boss;
    std::vector<Bullet>  bullets;
    std::vector<Pickup>  pickups;
    std::vector<Particle>particles;

    // Dialogue
    int  dialogueIndex  = 0;
    bool dialogueOpen   = false;

    // Timing / mouse
    float     dt        = 0;
    Vec2      mousePos  = {};
    float     shootCooldown = 0;
    bool      mouseDown = false;

    // Spawning
    float enemySpawnTimer = 0;
    int   enemiesSpawned  = 0;

    // Arc selection in menu
    int selectedArc = 0;

    // Victory text display
    std::string victoryMsg;
};

// ── Spawn helpers ─────────────────────────────────────────────────────────────

static Vec2 randomEdgePos(int W, int H) {
    int edge = rand() % 4;
    float rx = static_cast<float>(rand()) / RAND_MAX;
    float ry = static_cast<float>(rand()) / RAND_MAX;
    switch (edge) {
        case 0: return { rx * W,  -ENEMY_RADIUS * 2 };
        case 1: return { rx * W,   H + ENEMY_RADIUS * 2 };
        case 2: return { -ENEMY_RADIUS * 2, ry * H };
        default:return {  W + ENEMY_RADIUS * 2, ry * H };
    }
}

static void spawnParticles(GameState& gs, Vec2 pos, ImU32 col, int count = 12) {
    for (int i = 0; i < count; ++i) {
        float ang = (float)(rand() % 628) * 0.01f;
        float spd = 40.0f + (float)(rand() % 120);
        Particle p;
        p.pos  = pos;
        p.vel  = { cosf(ang) * spd, sinf(ang) * spd };
        p.life = p.maxLife = 0.5f + (float)(rand() % 40) * 0.01f;
        p.col  = col;
        p.radius = 2.0f + (float)(rand() % 4);
        gs.particles.push_back(p);
    }
}

static void resetArc(GameState& gs, int W, int H) {
    gs.enemies.clear();
    gs.bullets.clear();
    gs.pickups.clear();
    gs.particles.clear();
    gs.boss.alive      = false;
    gs.boss.hp         = BOSS_MAX_HP;
    gs.enemiesKilled   = 0;
    gs.enemiesSpawned  = 0;
    gs.enemySpawnTimer = 0;
    gs.playerPos       = { W * 0.5f, H * 0.5f };
    gs.playerVel       = {};
    gs.playerHP        = 100.0f;
    gs.dashing         = false;
    gs.dashCooldown    = 0;
    gs.iframes         = 0;
    gs.dialogueIndex   = 0;
    gs.dialogueOpen    = false;
    gs.shootCooldown   = 0;
}

// ── Update ────────────────────────────────────────────────────────────────────

static void updateGame(GameState& gs, int W, int H) {
    float dt = gs.dt;
    const ArcData& arc = ARCS[gs.arcIndex];

    // ── Player movement ──────────────────────────────────────────────────────
    const Uint8* keys = SDL_GetKeyboardState(nullptr);
    Vec2 move = {};
    if (keys[SDL_SCANCODE_W] || keys[SDL_SCANCODE_UP])    move.y -= 1;
    if (keys[SDL_SCANCODE_S] || keys[SDL_SCANCODE_DOWN])  move.y += 1;
    if (keys[SDL_SCANCODE_A] || keys[SDL_SCANCODE_LEFT])  move.x -= 1;
    if (keys[SDL_SCANCODE_D] || keys[SDL_SCANCODE_RIGHT]) move.x += 1;
    move = normalize(move);

    bool tryDash = keys[SDL_SCANCODE_SPACE] || keys[SDL_SCANCODE_LSHIFT];

    if (gs.dashCooldown > 0) gs.dashCooldown -= dt;

    if (tryDash && !gs.dashing && gs.dashCooldown <= 0 && (move.x != 0 || move.y != 0)) {
        gs.dashing    = true;
        gs.dashTimer  = DASH_DURATION;
        gs.dashCooldown = DASH_COOLDOWN;
        gs.iframes    = DASH_DURATION + 0.05f;
        gs.playerVel  = move * DASH_SPEED;
    }

    if (gs.dashing) {
        gs.dashTimer -= dt;
        if (gs.dashTimer <= 0) { gs.dashing = false; }
    } else {
        gs.playerVel = move * PLAYER_SPEED;
    }

    gs.playerPos += gs.playerVel * dt;
    gs.playerPos.x = std::max(PLAYER_RADIUS, std::min((float)W - PLAYER_RADIUS, gs.playerPos.x));
    gs.playerPos.y = std::max(PLAYER_RADIUS, std::min((float)H - PLAYER_RADIUS, gs.playerPos.y));

    if (gs.iframes > 0) gs.iframes -= dt;

    // ── Player shooting ──────────────────────────────────────────────────────
    if (gs.shootCooldown > 0) gs.shootCooldown -= dt;

    if (gs.mouseDown && gs.shootCooldown <= 0) {
        Vec2 dir = normalize(gs.mousePos - gs.playerPos);
        if (dir.x != 0 || dir.y != 0) {
            Bullet b;
            b.pos   = gs.playerPos + dir * (PLAYER_RADIUS + BULLET_RADIUS + 2);
            b.vel   = dir * BULLET_SPEED;
            b.isEnemy = false;
            gs.bullets.push_back(b);
            gs.shootCooldown = 0.12f;
        }
    }

    // ── Enemy spawning ───────────────────────────────────────────────────────
    if (!gs.boss.alive && gs.enemiesSpawned < ENEMIES_PER_ARC) {
        gs.enemySpawnTimer -= dt;
        if (gs.enemySpawnTimer <= 0) {
            Enemy e;
            e.pos   = randomEdgePos(W, H);
            e.speed = ENEMY_SPEED_MIN + (float)(rand() % (int)(ENEMY_SPEED_MAX - ENEMY_SPEED_MIN));
            e.hp    = 2;
            gs.enemies.push_back(e);
            gs.enemiesSpawned++;
            gs.enemySpawnTimer = 1.2f - gs.arcIndex * 0.15f;
        }
    }

    // ── Enemy update ─────────────────────────────────────────────────────────
    for (auto& e : gs.enemies) {
        if (!e.alive) continue;
        Vec2 dir = normalize(gs.playerPos - e.pos);
        e.pos += dir * (e.speed * dt);

        // damage player
        if (gs.iframes <= 0 && circleCollides(e.pos, ENEMY_RADIUS, gs.playerPos, PLAYER_RADIUS)) {
            gs.playerHP -= 15.0f;
            gs.iframes   = 0.5f;
            spawnParticles(gs, gs.playerPos, IM_COL32(255, 50, 50, 200), 8);
            if (gs.playerHP <= 0) {
                gs.playerHP = 0;
                gs.phase    = GamePhase::GAME_OVER;
                return;
            }
        }
    }

    // ── Boss update ──────────────────────────────────────────────────────────
    if (gs.boss.alive) {
        Vec2 dir = normalize(gs.playerPos - gs.boss.pos);
        float bossSpeed = 60.0f + gs.arcIndex * 8.0f;
        gs.boss.vel = dir * bossSpeed;
        gs.boss.pos += gs.boss.vel * dt;

        gs.boss.shootTimer -= dt;
        if (gs.boss.shootTimer <= 0) {
            // Shoot spread burst
            int shots = 3 + gs.arcIndex;
            for (int i = 0; i < shots; ++i) {
                float ang = atan2f(dir.y, dir.x) + (i - shots/2) * 0.35f;
                Bullet b;
                b.pos     = gs.boss.pos;
                b.vel     = { cosf(ang) * (BULLET_SPEED * 0.55f), sinf(ang) * (BULLET_SPEED * 0.55f) };
                b.isEnemy = true;
                gs.bullets.push_back(b);
            }
            gs.boss.shootTimer = 1.4f - gs.arcIndex * 0.12f;
        }

        if (gs.iframes <= 0 && circleCollides(gs.boss.pos, BOSS_RADIUS, gs.playerPos, PLAYER_RADIUS)) {
            gs.playerHP -= 20.0f;
            gs.iframes   = 0.6f;
            spawnParticles(gs, gs.playerPos, IM_COL32(255, 50, 50, 200), 10);
            if (gs.playerHP <= 0) { gs.playerHP = 0; gs.phase = GamePhase::GAME_OVER; return; }
        }
    }

    // ── Bullet update ────────────────────────────────────────────────────────
    for (auto& b : gs.bullets) {
        if (!b.alive) continue;
        b.pos += b.vel * dt;

        // Off screen
        if (b.pos.x < -50 || b.pos.x > W+50 || b.pos.y < -50 || b.pos.y > H+50) {
            b.alive = false; continue;
        }

        if (!b.isEnemy) {
            // Hit enemies
            for (auto& e : gs.enemies) {
                if (!e.alive) continue;
                if (circleCollides(b.pos, BULLET_RADIUS, e.pos, ENEMY_RADIUS)) {
                    b.alive = false;
                    e.hp--;
                    if (e.hp <= 0) {
                        e.alive = false;
                        gs.score += SCORE_PER_KILL;
                        gs.enemiesKilled++;
                        spawnParticles(gs, e.pos, hexCol(arc.enemyColor), 12);
                        // Drop pickup
                        if (rand() % 3 == 0) {
                            Pickup pk;
                            pk.pos = e.pos;
                            gs.pickups.push_back(pk);
                        }
                        // Trigger boss when all enemies for arc cleared
                        if (!gs.boss.alive && gs.enemiesKilled >= ENEMIES_PER_ARC) {
                            gs.boss.alive = true;
                            gs.boss.hp    = BOSS_MAX_HP + gs.arcIndex * 4;
                            gs.boss.pos   = randomEdgePos(W, H);
                        }
                    }
                    break;
                }
            }
            // Hit boss
            if (b.alive && gs.boss.alive) {
                if (circleCollides(b.pos, BULLET_RADIUS, gs.boss.pos, BOSS_RADIUS)) {
                    b.alive = false;
                    gs.boss.hp--;
                    spawnParticles(gs, b.pos, hexCol(arc.bossColor, 0.7f), 6);
                    if (gs.boss.hp <= 0) {
                        gs.boss.alive = false;
                        gs.score += SCORE_PER_KILL * 5;
                        spawnParticles(gs, gs.boss.pos, hexCol(arc.bossColor), 40);
                        gs.victoryMsg = arc.victoryText;
                        if (gs.arcIndex < ARC_COUNT - 1) {
                            gs.phase = GamePhase::VICTORY_ARC;
                        } else {
                            gs.phase = GamePhase::VICTORY_ALL;
                        }
                        return;
                    }
                }
            }
        } else {
            // Enemy bullet hits player
            if (gs.iframes <= 0 && circleCollides(b.pos, BULLET_RADIUS, gs.playerPos, PLAYER_RADIUS)) {
                b.alive = false;
                gs.playerHP -= 12.0f;
                gs.iframes   = 0.25f;
                spawnParticles(gs, gs.playerPos, IM_COL32(255, 80, 80, 200), 6);
                if (gs.playerHP <= 0) { gs.playerHP = 0; gs.phase = GamePhase::GAME_OVER; return; }
            }
        }
    }

    // ── Pickups ───────────────────────────────────────────────────────────────
    for (auto& pk : gs.pickups) {
        if (!pk.alive) continue;
        if (circleCollides(pk.pos, PICKUP_RADIUS, gs.playerPos, PLAYER_RADIUS + 12.0f)) {
            pk.alive = false;
            gs.score += SCORE_PER_PICKUP;
            gs.playerHP = std::min(100.0f, gs.playerHP + 5.0f);
            spawnParticles(gs, pk.pos, IM_COL32(0, 220, 100, 200), 8);
        }
    }

    // ── Particles ─────────────────────────────────────────────────────────────
    for (auto& p : gs.particles) {
        p.pos  += p.vel * dt;
        p.vel  = p.vel * (1.0f - dt * 3.0f);
        p.life -= dt;
    }

    // Prune dead objects (compact to avoid O(n) fragmentation over time)
    gs.bullets.erase(std::remove_if(gs.bullets.begin(),   gs.bullets.end(),   [](const Bullet& b){ return !b.alive; }), gs.bullets.end());
    gs.enemies.erase(std::remove_if(gs.enemies.begin(),   gs.enemies.end(),   [](const Enemy& e){ return !e.alive; }), gs.enemies.end());
    gs.pickups.erase(std::remove_if(gs.pickups.begin(),   gs.pickups.end(),   [](const Pickup& p){ return !p.alive; }), gs.pickups.end());
    gs.particles.erase(std::remove_if(gs.particles.begin(),gs.particles.end(),[](const Particle& p){ return p.life <= 0; }), gs.particles.end());
}

// ── Render (Dear ImGui DrawList + windows) ────────────────────────────────────

static void renderGame(GameState& gs, int W, int H) {
    const ArcData& arc = ARCS[gs.arcIndex];
    ImDrawList* bg = ImGui::GetBackgroundDrawList();

    // Background
    bg->AddRectFilled({0,0}, {(float)W,(float)H}, hexCol(arc.bgColor));

    // Subtle vignette — dark overlay ring near edges
    ImVec2 centre = {W * 0.5f, H * 0.5f};
    float  rOuter = len({(float)W * 0.5f, (float)H * 0.5f}) * 1.35f;
    // Draw concentric circles from opaque-at-edge to transparent-at-centre
    for (int i = 0; i < 8; ++i) {
        float t   = (float)i / 7.0f;
        float r   = rOuter * (1.0f - t * 0.5f);
        int   a   = (int)((1.0f - t) * 90);
        bg->AddCircleFilled(centre, r, IM_COL32(0, 0, 0, a), 40);
    }

    // Grid lines (subtle)
    ImU32 gridCol = IM_COL32(255,255,255,12);
    for (int x = 0; x < W; x += 60) bg->AddLine({(float)x, 0}, {(float)x, (float)H}, gridCol);
    for (int y = 0; y < H; y += 60) bg->AddLine({0, (float)y}, {(float)W, (float)y}, gridCol);

    // Pickups
    ImU32 pkCol = IM_COL32(0, 220, 120, 200);
    for (const auto& pk : gs.pickups) {
        if (!pk.alive) continue;
        bg->AddCircleFilled(toIV(pk.pos), PICKUP_RADIUS, pkCol);
        bg->AddCircle(toIV(pk.pos), PICKUP_RADIUS + 3, IM_COL32(0, 255, 140, 80));
    }

    // Particles
    for (const auto& p : gs.particles) {
        float t = p.life / p.maxLife;
        ImU32 col = (p.col & 0x00FFFFFF) | (static_cast<int>(t * 200) << 24);
        bg->AddCircleFilled(toIV(p.pos), p.radius * t, col);
    }

    // Enemy bullets
    ImU32 eBulCol = IM_COL32(255, 80, 40, 220);
    for (const auto& b : gs.bullets) {
        if (!b.alive || !b.isEnemy) continue;
        bg->AddCircleFilled(toIV(b.pos), BULLET_RADIUS, eBulCol);
    }

    // Player bullets
    ImU32 pBulCol = hexCol(arc.bulletColor, 0.9f);
    for (const auto& b : gs.bullets) {
        if (!b.alive || b.isEnemy) continue;
        bg->AddCircleFilled(toIV(b.pos), BULLET_RADIUS, pBulCol);
        bg->AddCircle(toIV(b.pos), BULLET_RADIUS + 2, pBulCol & 0x44FFFFFF);
    }

    // Enemies
    ImU32 eCol = hexCol(arc.enemyColor);
    for (const auto& e : gs.enemies) {
        if (!e.alive) continue;
        bg->AddCircleFilled(toIV(e.pos), ENEMY_RADIUS, eCol);
        bg->AddCircle(toIV(e.pos), ENEMY_RADIUS + 3, eCol & 0x44FFFFFF);
    }

    // Boss
    if (gs.boss.alive) {
        ImU32 bCol  = hexCol(arc.bossColor);
        ImU32 bGlow = bCol & 0x33FFFFFF;
        bg->AddCircleFilled(toIV(gs.boss.pos), BOSS_RADIUS + 8, bGlow);
        bg->AddCircleFilled(toIV(gs.boss.pos), BOSS_RADIUS, bCol);
        // Boss HP ring
        float hpFrac = (float)gs.boss.hp / (BOSS_MAX_HP + gs.arcIndex * 4);
        bg->AddCircle(toIV(gs.boss.pos), BOSS_RADIUS + 6, IM_COL32(255,80,80,180), 0, 2.0f);
        // Simplified arc for HP — draw a wedge approximation with many lines
        int  segs   = 48;
        float start = -(float)M_PI * 0.5f;
        float end   = start + (float)(M_PI * 2.0 * hpFrac);
        ImVec2 prev = { gs.boss.pos.x + cosf(start)*(BOSS_RADIUS+6), gs.boss.pos.y + sinf(start)*(BOSS_RADIUS+6) };
        for (int i = 1; i <= segs; ++i) {
            float t   = start + (end - start) * i / segs;
            ImVec2 cur = { gs.boss.pos.x + cosf(t)*(BOSS_RADIUS+6), gs.boss.pos.y + sinf(t)*(BOSS_RADIUS+6) };
            bg->AddLine(prev, cur, IM_COL32(0, 220, 80, 220), 3.0f);
            prev = cur;
        }
        // Boss name label
        ImVec2 labelPos = { gs.boss.pos.x - 60, gs.boss.pos.y - BOSS_RADIUS - 20 };
        bg->AddText(labelPos, IM_COL32(255,255,255,200), arc.bossName);
    }

    // Player
    ImU32 pCol  = hexCol(arc.playerColor);
    ImU32 pGlow = pCol & 0x44FFFFFF;
    if (gs.dashing) {
        bg->AddCircleFilled(toIV(gs.playerPos), PLAYER_RADIUS * 1.6f, pGlow);
    }
    if (gs.iframes > 0 && (int)(gs.iframes * 10) % 2 == 0) {
        // Flash while invincible
    } else {
        bg->AddCircleFilled(toIV(gs.playerPos), PLAYER_RADIUS, pCol);
        bg->AddCircle(toIV(gs.playerPos), PLAYER_RADIUS + 4, pGlow);
    }
}

static void renderHUD(GameState& gs, int W, int /*H*/) {
    const ArcData& arc = ARCS[gs.arcIndex];
    ImGuiIO& io = ImGui::GetIO();

    ImGui::SetNextWindowPos({0, 0}, ImGuiCond_Always);
    ImGui::SetNextWindowSize({(float)W, 48}, ImGuiCond_Always);
    ImGui::SetNextWindowBgAlpha(0.75f);
    ImGuiWindowFlags hf = ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoInputs |
                          ImGuiWindowFlags_NoMove | ImGuiWindowFlags_NoSavedSettings |
                          ImGuiWindowFlags_NoBringToFrontOnFocus;
    ImGui::PushStyleColor(ImGuiCol_WindowBg, ImVec4(0,0,0,0.75f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(12, 8));

    if (ImGui::Begin("##HUD", nullptr, hf)) {
        // Health bar
        ImGui::SetCursorPos({12, 8});
        ImGui::PushStyleColor(ImGuiCol_PlotHistogram, hexCol4(arc.playerColor));
        ImGui::PushStyleColor(ImGuiCol_FrameBg, ImVec4(0, 0.08f, 0.08f, 1));
        char hpLabel[32]; snprintf(hpLabel, sizeof(hpLabel), "HP %.0f%%", gs.playerHP);
        ImGui::ProgressBar(gs.playerHP / 100.0f, ImVec2(190, 22), hpLabel);
        ImGui::PopStyleColor(2);

        // Arc name (centre)
        float tw = ImGui::CalcTextSize(arc.name).x;
        ImGui::SetCursorPos({(W - tw) * 0.5f, 14});
        ImGui::TextColored(hexCol4(arc.accent), "%s", arc.name);

        // Score (right)
        char scoreBuf[32]; snprintf(scoreBuf, sizeof(scoreBuf), "%d", gs.score);
        float sw = ImGui::CalcTextSize(scoreBuf).x;
        ImGui::SetCursorPos({W - sw - 12, 14});
        ImGui::TextColored(ImVec4(0, 1, 1, 1), "%s", scoreBuf);
    }
    ImGui::End();
    ImGui::PopStyleColor();
    ImGui::PopStyleVar();
    (void)io;
}

static void renderDialogue(GameState& gs, int W, int H) {
    if (!gs.dialogueOpen) return;
    const ArcData& arc = ARCS[gs.arcIndex];
    const ArcDialogueLine& line = arc.dialogue[gs.dialogueIndex];

    ImGui::SetNextWindowPos({0, (float)H - 120}, ImGuiCond_Always);
    ImGui::SetNextWindowSize({(float)W, 120}, ImGuiCond_Always);
    ImGui::SetNextWindowBgAlpha(0.92f);
    ImGuiWindowFlags df = ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoMove |
                          ImGuiWindowFlags_NoSavedSettings;
    ImGui::PushStyleColor(ImGuiCol_WindowBg,  ImVec4(0, 0, 0, 0.92f));
    ImGui::PushStyleColor(ImGuiCol_Border,    hexCol4(arc.accent));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(20, 12));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 1.5f);

    if (ImGui::Begin("##Dialogue", nullptr, df)) {
        ImGui::TextColored(hexCol4(arc.accent), "%s", line.speaker);
        ImGui::SetCursorPosY(ImGui::GetCursorPosY() + 4);
        ImGui::PushTextWrapPos((float)W - 160);
        ImGui::TextColored(ImVec4(0.8f, 0.8f, 0.8f, 1), "%s", line.text);
        ImGui::PopTextWrapPos();

        ImGui::SetCursorPos({(float)W - 140, 12});
        if (ImGui::Button("[ CONTINUE >]", ImVec2(120, 0))) {
            gs.dialogueIndex++;
            if (gs.dialogueIndex >= 2) {
                gs.dialogueOpen = false;
                gs.phase        = GamePhase::PLAYING;
            }
        }
    }
    ImGui::End();
    ImGui::PopStyleVar(2);
    ImGui::PopStyleColor(2);
}

static void renderStartMenu(GameState& gs, int W, int H) {
    ImGui::SetNextWindowPos({(float)W * 0.5f, (float)H * 0.5f}, ImGuiCond_Always, {0.5f, 0.5f});
    ImGui::SetNextWindowSize({680, 480}, ImGuiCond_Always);
    ImGui::SetNextWindowBgAlpha(0.94f);
    ImGuiWindowFlags mf = ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoMove |
                          ImGuiWindowFlags_NoSavedSettings;
    ImGui::PushStyleColor(ImGuiCol_WindowBg, ImVec4(0, 0.06f, 0.11f, 0.94f));
    ImGui::PushStyleColor(ImGuiCol_Border,   ImVec4(0, 1, 1, 0.6f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 1.5f);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding,    ImVec2(32, 28));

    if (ImGui::Begin("##StartMenu", nullptr, mf)) {
        // Title
        float tw = ImGui::CalcTextSize("WSL SAGA MULTIVERSE").x;
        ImGui::SetCursorPosX((680 - tw) * 0.5f);
        ImGui::TextColored(ImVec4(0, 1, 1, 1), "WSL SAGA MULTIVERSE");
        tw = ImGui::CalcTextSize("THE BREACH").x;
        ImGui::SetCursorPosX((680 - tw) * 0.5f);
        ImGui::TextColored(ImVec4(1, 1, 0, 0.9f), "THE BREACH");
        ImGui::Spacing(); ImGui::Separator(); ImGui::Spacing();

        // Arc selector
        ImGui::TextColored(ImVec4(0.5f, 0.8f, 0.8f, 1), "SELECT STARTING ARC:");
        ImGui::Spacing();
        for (int i = 0; i < ARC_COUNT; ++i) {
            bool sel = (gs.selectedArc == i);
            if (sel) ImGui::PushStyleColor(ImGuiCol_Button,        ImVec4(0, 0.35f, 0.35f, 1));
            else      ImGui::PushStyleColor(ImGuiCol_Button,        ImVec4(0, 0.12f, 0.12f, 1));
            ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(0, 0.45f, 0.45f, 1));

            char label[64];
            snprintf(label, sizeof(label), "%s — %s", ARCS[i].name, ARCS[i].subtitle);
            if (ImGui::Button(label, ImVec2(610, 0)))
                gs.selectedArc = i;

            ImGui::PopStyleColor(2);
            ImGui::Spacing();
        }

        ImGui::Spacing(); ImGui::Separator(); ImGui::Spacing();
        ImGui::TextColored(ImVec4(0.4f, 0.4f, 0.4f, 1),
            "WASD / Arrows: move   |   Mouse: aim & shoot   |   Space / Shift: dash");
        ImGui::Spacing();

        // Start button
        float bw = 240;
        ImGui::SetCursorPosX((680 - bw) * 0.5f);
        ImGui::PushStyleColor(ImGuiCol_Button,        ImVec4(0, 0.4f, 0.4f, 1));
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(0, 1, 1, 1));
        ImGui::PushStyleColor(ImGuiCol_ButtonActive,  ImVec4(0, 0.6f, 0.6f, 1));
        ImGui::PushStyleColor(ImGuiCol_Text,          ImVec4(0, 1, 1, 1));
        if (ImGui::Button("[ INITIATE BREACH ]", ImVec2(bw, 36))) {
            gs.arcIndex     = gs.selectedArc;
            gs.score        = 0;
            resetArc(gs, W, H);
            gs.phase        = GamePhase::DIALOGUE;
            gs.dialogueOpen = true;
            gs.dialogueIndex = 0;
        }
        ImGui::PopStyleColor(4);
    }
    ImGui::End();
    ImGui::PopStyleVar(2);
    ImGui::PopStyleColor(2);
}

static void renderGameOver(GameState& gs, int W, int H) {
    ImGui::SetNextWindowPos({(float)W * 0.5f, (float)H * 0.5f}, ImGuiCond_Always, {0.5f, 0.5f});
    ImGui::SetNextWindowSize({440, 220}, ImGuiCond_Always);
    ImGui::SetNextWindowBgAlpha(0.92f);
    ImGuiWindowFlags gf = ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoMove |
                          ImGuiWindowFlags_NoSavedSettings;
    ImGui::PushStyleColor(ImGuiCol_WindowBg, ImVec4(0.08f, 0, 0, 0.92f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(28, 24));

    if (ImGui::Begin("##GameOver", nullptr, gf)) {
        float tw = ImGui::CalcTextSize("PROCESS TERMINATED").x;
        ImGui::SetCursorPosX((440 - tw) * 0.5f);
        ImGui::TextColored(ImVec4(1, 0.1f, 0.1f, 1), "PROCESS TERMINATED");
        ImGui::Spacing();
        char sc[64]; snprintf(sc, sizeof(sc), "Final score: %d", gs.score);
        float sw = ImGui::CalcTextSize(sc).x;
        ImGui::SetCursorPosX((440 - sw) * 0.5f);
        ImGui::TextColored(ImVec4(0.6f, 0.6f, 0.6f, 1), "%s", sc);
        ImGui::Spacing(); ImGui::Spacing();
        float bw = 200;
        ImGui::SetCursorPosX((440 - bw) * 0.5f);
        ImGui::PushStyleColor(ImGuiCol_Button,        ImVec4(0.4f, 0, 0, 1));
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(1, 0, 0, 1));
        ImGui::PushStyleColor(ImGuiCol_Text,          ImVec4(1, 0.2f, 0.2f, 1));
        if (ImGui::Button("[ REBOOT SEQUENCE ]", ImVec2(bw, 0))) {
            gs.phase = GamePhase::MENU;
            gs.score = 0;
        }
        ImGui::PopStyleColor(3);
    }
    ImGui::End();
    ImGui::PopStyleVar();
    ImGui::PopStyleColor();
}

static void renderVictory(GameState& gs, int W, int H) {
    bool allDone = (gs.phase == GamePhase::VICTORY_ALL);

    ImGui::SetNextWindowPos({(float)W * 0.5f, (float)H * 0.5f}, ImGuiCond_Always, {0.5f, 0.5f});
    ImGui::SetNextWindowSize({600, 260}, ImGuiCond_Always);
    ImGui::SetNextWindowBgAlpha(0.93f);
    ImGuiWindowFlags vf = ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoMove |
                          ImGuiWindowFlags_NoSavedSettings;
    ImGui::PushStyleColor(ImGuiCol_WindowBg, ImVec4(0, 0.08f, 0, 0.93f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(28, 24));

    if (ImGui::Begin("##Victory", nullptr, vf)) {
        const char* title = allDone ? "SAGA COMPLETE" : "ARC CLEARED";
        float tw = ImGui::CalcTextSize(title).x;
        ImGui::SetCursorPosX((600 - tw) * 0.5f);
        ImGui::TextColored(ImVec4(0.2f, 1, 0.2f, 1), "%s", title);
        ImGui::Spacing();
        ImGui::PushTextWrapPos(550);
        ImGui::TextColored(ImVec4(0.75f, 0.75f, 0.75f, 1), "%s", gs.victoryMsg.c_str());
        ImGui::PopTextWrapPos();
        ImGui::Spacing(); ImGui::Spacing();
        float bw = 200;
        ImGui::SetCursorPosX((600 - bw) * 0.5f);
        ImGui::PushStyleColor(ImGuiCol_Button,        ImVec4(0, 0.4f, 0, 1));
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(0, 1, 0, 1));
        ImGui::PushStyleColor(ImGuiCol_Text,          ImVec4(0, 1, 0, 1));
        const char* btnLabel = allDone ? "[ RETURN TO MENU ]" : "[ NEXT ARC >>> ]";
        if (ImGui::Button(btnLabel, ImVec2(bw, 0))) {
            if (allDone) {
                gs.phase = GamePhase::MENU;
                gs.score = 0;
            } else {
                gs.arcIndex++;
                resetArc(gs, W, H);
                gs.phase        = GamePhase::DIALOGUE;
                gs.dialogueOpen = true;
                gs.dialogueIndex = 0;
            }
        }
        ImGui::PopStyleColor(3);
    }
    ImGui::End();
    ImGui::PopStyleVar();
    ImGui::PopStyleColor();
}

// ── Main ──────────────────────────────────────────────────────────────────────

int main(int, char**) {
    srand(static_cast<unsigned>(time(nullptr)));

    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_TIMER) != 0) {
        fprintf(stderr, "SDL_Init error: %s\n", SDL_GetError());
        return 1;
    }

    // GL context attributes (ES2 for Emscripten / WebGL1, else GL3)
#if defined(IMGUI_IMPL_OPENGL_ES2)
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_FLAGS, 0);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_ES);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 2);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 0);
    const char* glsl_version = "#version 100";
#else
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_FLAGS, 0);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_CORE);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 3);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 0);
    const char* glsl_version = "#version 130";
#endif
    SDL_GL_SetAttribute(SDL_GL_DOUBLEBUFFER, 1);
    SDL_GL_SetAttribute(SDL_GL_DEPTH_SIZE,   24);
    SDL_GL_SetAttribute(SDL_GL_STENCIL_SIZE, 8);

    int W = 900, H = 600;
    SDL_WindowFlags wflags = static_cast<SDL_WindowFlags>(
        SDL_WINDOW_OPENGL | SDL_WINDOW_RESIZABLE | SDL_WINDOW_ALLOW_HIGHDPI);
    SDL_Window* window = SDL_CreateWindow(
        "WSL Saga Multiverse — The Breach", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
        W, H, wflags);
    if (!window) { fprintf(stderr, "SDL_CreateWindow: %s\n", SDL_GetError()); return 1; }

    SDL_GLContext gl_context = SDL_GL_CreateContext(window);
    if (!gl_context) { fprintf(stderr, "SDL_GL_CreateContext: %s\n", SDL_GetError()); return 1; }
    SDL_GL_MakeCurrent(window, gl_context);
    SDL_GL_SetSwapInterval(1); // vsync

    // Dear ImGui setup
    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO& io = ImGui::GetIO(); (void)io;
    io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;

    // Cyberpunk-ish dark style
    ImGui::StyleColorsDark();
    ImGuiStyle& style = ImGui::GetStyle();
    style.WindowRounding    = 2.0f;
    style.FrameRounding     = 2.0f;
    style.ScrollbarRounding = 2.0f;
    style.Colors[ImGuiCol_WindowBg]  = ImVec4(0.03f, 0.03f, 0.08f, 0.90f);
    style.Colors[ImGuiCol_Border]    = ImVec4(0.0f,  1.0f,  1.0f,  0.40f);
    style.Colors[ImGuiCol_FrameBg]   = ImVec4(0.0f,  0.12f, 0.12f, 1.0f);
    style.Colors[ImGuiCol_Button]    = ImVec4(0.0f,  0.25f, 0.25f, 1.0f);
    style.Colors[ImGuiCol_ButtonHovered] = ImVec4(0.0f, 0.6f, 0.6f, 1.0f);
    style.Colors[ImGuiCol_Text]      = ImVec4(0.85f, 0.85f, 0.85f, 1.0f);

    ImGui_ImplSDL2_InitForOpenGL(window, gl_context);
    ImGui_ImplOpenGL3_Init(glsl_version);

    GameState gs;
    resetArc(gs, W, H);

    Uint64 lastTime = SDL_GetPerformanceCounter();
    bool running    = true;

    EMSCRIPTEN_MAINLOOP_BEGIN
    {
        // ── Events ──────────────────────────────────────────────────────────
        SDL_Event event;
        while (SDL_PollEvent(&event)) {
            ImGui_ImplSDL2_ProcessEvent(&event);
            if (event.type == SDL_QUIT) running = false;
            if (event.type == SDL_WINDOWEVENT &&
                event.window.event == SDL_WINDOWEVENT_CLOSE &&
                event.window.windowID == SDL_GetWindowID(window))
                running = false;
            if (event.type == SDL_MOUSEBUTTONDOWN && event.button.button == SDL_BUTTON_LEFT)
                gs.mouseDown = true;
            if (event.type == SDL_MOUSEBUTTONUP   && event.button.button == SDL_BUTTON_LEFT)
                gs.mouseDown = false;
        }
        if (!running) { SDL_Quit(); return 0; }

        // Window size (may have been resized)
        SDL_GetWindowSize(window, &W, &H);

        // Delta time
        Uint64 now = SDL_GetPerformanceCounter();
        gs.dt = static_cast<float>(now - lastTime) / SDL_GetPerformanceFrequency();
        gs.dt = std::min(gs.dt, 0.05f); // cap at 50 ms
        lastTime = now;

        // Mouse position (world == screen coords)
        int mx, my;
        SDL_GetMouseState(&mx, &my);
        gs.mousePos = {(float)mx, (float)my};

        // ── Dear ImGui new frame ─────────────────────────────────────────────
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplSDL2_NewFrame();
        ImGui::NewFrame();

        // ── Background clear ─────────────────────────────────────────────────
        glViewport(0, 0, W, H);
        glClearColor(0, 0, 0, 1);
        glClear(GL_COLOR_BUFFER_BIT);

        // ── Game logic + rendering ───────────────────────────────────────────
        switch (gs.phase) {
            case GamePhase::MENU:
                ImGui::GetBackgroundDrawList()->AddRectFilled({0,0},{(float)W,(float)H},IM_COL32(0,0,10,255));
                renderStartMenu(gs, W, H);
                break;

            case GamePhase::DIALOGUE:
                renderGame(gs, W, H);
                renderHUD(gs, W, H);
                renderDialogue(gs, W, H);
                break;

            case GamePhase::PLAYING:
                updateGame(gs, W, H);
                if (gs.phase == GamePhase::PLAYING) {
                    renderGame(gs, W, H);
                    renderHUD(gs, W, H);
                    // Dash cooldown hint
                    if (gs.dashCooldown > 0) {
                        ImDrawList* fg = ImGui::GetForegroundDrawList();
                        char buf[32]; snprintf(buf, sizeof(buf), "DASH %.1fs", gs.dashCooldown);
                        fg->AddText({8, (float)H - 22}, IM_COL32(0, 180, 180, 160), buf);
                    }
                }
                break;

            case GamePhase::VICTORY_ARC:
            case GamePhase::VICTORY_ALL:
                renderGame(gs, W, H);
                renderVictory(gs, W, H);
                break;

            case GamePhase::GAME_OVER:
                renderGame(gs, W, H);
                renderGameOver(gs, W, H);
                break;

            default: break;
        }

        // Copyright watermark
        ImGui::GetForegroundDrawList()->AddText(
            {(float)W - 310, (float)H - 16},
            IM_COL32(50, 50, 50, 200),
            "© 2026 P&B DevCo · Paul Adcock · All Rights Reserved");

        // ── Render ───────────────────────────────────────────────────────────
        ImGui::Render();
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
        SDL_GL_SwapWindow(window);
    }
    EMSCRIPTEN_MAINLOOP_END;

    // Cleanup (only reached in native build)
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplSDL2_Shutdown();
    ImGui::DestroyContext();
    SDL_GL_DeleteContext(gl_context);
    SDL_DestroyWindow(window);
    SDL_Quit();
    return 0;
}
