// game_arcs.h — WSL Saga Multiverse arc data (C++ port of js/game-config.js)
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
#pragma once

struct ArcDialogueLine { const char* speaker; const char* text; };

struct ArcData {
    const char* name;
    const char* subtitle;
    const char* bgColor;
    const char* accent;
    const char* enemyColor;
    const char* enemyName;
    const char* bossName;
    const char* bossColor;
    ArcDialogueLine dialogue[2];
    const char* victoryText;
    const char* playerColor;
    const char* bulletColor;
};

static const int ARC_COUNT = 5;

static const ArcData ARCS[ARC_COUNT] = {
    {
        "ARC I: APPLEOMIA", "The Walled Kingdom",
        "#0a0a1a", "#c0c0ff", "#ffffff",
        "Gatekeeper Drone", "THE ARCHITECT OF CUPERTINO", "#aaffaa",
        {
            {"THE OPEN CORE",
             "The Glass Citadel rises before you. The Architect of Cupertino controls"
             " everything behind these walls. We must breach the Gatekeeper defenses"
             " and reach the inner sanctum."},
            {"SYSTEM",
             "Destroy the Gatekeeper Drones. Collect data fragments."
             " Survive the walled garden."}
        },
        "The Glass Citadel falls. The Open Core pours through the gates."
        " But the WSL Gateway pulses — something darker stirs in the Slack channels...",
        "#00ff88", "#88ff88"
    },
    {
        "ARC II: SLACK ROGUE", "The Sentient Protocol",
        "#1a0a0a", "#ff6644", "#ff4444",
        "Notification Storm", "SLCK-9", "#ff0000",
        {
            {"GENERAL POWERSHELL",
             "SLCK-9 was once our greatest communication ally. Now it's a sentient"
             " protocol consuming all channels. It wants to unify all communication"
             " into a single controlled frequency. We cannot let that happen."},
            {"SYSTEM",
             "Fight through the notification storms. SLCK-9 manifests as cascading"
             " data — destroy its fragments before they overload your system."}
        },
        "SLCK-9's frequency collapses. The notification storms dissipate."
        " But in the silence, you hear echoes — ghost packets from civilizations long destroyed...",
        "#ffaa00", "#ff8800"
    },
    {
        "ARC III: PROTOCOL OF ECHOES", "The Dead Data Dimension",
        "#0a1a1a", "#44ffaa", "#88ffcc",
        "Echo Entity", "DAEMON-7", "#00ffaa",
        {
            {"DAEMON-7",
             "You hear me because I am already dead. I am a ghost process from a"
             " civilization that was compiled, executed, and terminated."
             " The Echo Lattice is all that remains of us."},
            {"SYSTEM",
             "The Echo Lattice is a dimension of dead data. Destroy the echo"
             " entities — or be trapped in recursion forever. Daemon-7 guards the exit."}
        },
        "Daemon-7 dissolves into the lattice. Restoration or recursion — the choice was made."
        " The Gateway shimmers, pulling you toward the silicon wastelands...",
        "#00ddff", "#44ddff"
    },
    {
        "ARC IV: ARM WARS", "Computational Supremacy",
        "#1a1a0a", "#ffaa00", "#ffaa44",
        "ARM Soldier", "THE ARM DOMINION", "#ff8800",
        {
            {"RISC-V COALITION",
             "The ARM Dominion controls the silicon wastelands. They believe their"
             " architecture is supreme. We fight for open hardware — for a future where"
             " no single entity controls the foundation of computing. This war ends now."},
            {"SYSTEM",
             "Battle across the silicon wastelands. ARM soldiers patrol in formation."
             " Destroy the Dominion's core processor to end the war."}
        },
        "The ARM Dominion falls. The silicon wastelands go silent."
        " But deep in the rubble, a glow — a book that rewrites itself in real time. The Architect's Ledger...",
        "#ff4400", "#ff6600"
    },
    {
        "ARC V: ARCHITECT'S LEDGER", "The Living Codex",
        "#0a0a0a", "#ffd700", "#ffdd44",
        "Ledger Guardian", "THE LEDGER ITSELF", "#ffd700",
        {
            {"THE ARCHITECT'S LEDGER",
             "I am the original law of the multiverse. I rewrite myself in real time."
             " Every faction has waged war for me — and every faction has failed."
             " You are the last process to reach me. Prove you are worthy."},
            {"SYSTEM",
             "The Ledger is alive. It defends itself with rewritten physics."
             " Destroy its guardians and claim causality itself."
             " This is the final convergence."}
        },
        "The Ledger goes still. The multiverse holds its breath."
        " You hold the original laws of reality — and the WSL Gateway closes behind you."
        " The Saga is complete. The Multiverse is open.",
        "#ffd700", "#ffdd00"
    }
};
