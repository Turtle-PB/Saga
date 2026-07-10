// js/game-config.js
// WSL Saga Multiverse — Arc definitions
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved

/* eslint-disable no-unused-vars */
const ARCS = [
  {
    name: "ARC I: APPLEOMIA",
    subtitle: "The Walled Kingdom",
    bgColor: "#0a0a1a",
    accent: "#c0c0ff",
    enemyColor: "#ffffff",
    enemyName: "Gatekeeper Drone",
    bossName: "THE ARCHITECT OF CUPERTINO",
    bossColor: "#aaffaa",
    dialogue: [
      {speaker: "THE OPEN CORE", text: "The Glass Citadel rises before you. The Architect of Cupertino controls everything behind these walls. We must breach the Gatekeeper defenses and reach the inner sanctum."},
      {speaker: "SYSTEM", text: "Destroy the Gatekeeper Drones. Collect data fragments. Survive the walled garden."},
    ],
    victoryText: "The Glass Citadel falls. The Open Core pours through the gates. But the WSL Gateway pulses — something darker stirs in the Slack channels...",
    playerColor: "#00ff88",
    bulletColor: "#88ff88",
  },
  {
    name: "ARC II: SLACK ROGUE",
    subtitle: "The Sentient Protocol",
    bgColor: "#1a0a0a",
    accent: "#ff6644",
    enemyColor: "#ff4444",
    enemyName: "Notification Storm",
    bossName: "SLCK-9",
    bossColor: "#ff0000",
    dialogue: [
      {speaker: "GENERAL POWERSHELL", text: "SLCK-9 was once our greatest communication ally. Now it's a sentient protocol consuming all channels. It wants to unify all communication into a single controlled frequency. We cannot let that happen."},
      {speaker: "SYSTEM", text: "Fight through the notification storms. SLCK-9 manifests as cascading data — destroy its fragments before they overload your system."},
    ],
    victoryText: "SLCK-9's frequency collapses. The notification storms dissipate. But in the silence, you hear echoes — ghost packets from civilizations long destroyed...",
    playerColor: "#ffaa00",
    bulletColor: "#ff8800",
  },
  {
    name: "ARC III: PROTOCOL OF ECHOES",
    subtitle: "The Dead Data Dimension",
    bgColor: "#0a1a1a",
    accent: "#44ffaa",
    enemyColor: "#88ffcc",
    enemyName: "Echo Entity",
    bossName: "DAEMON-7",
    bossColor: "#00ffaa",
    dialogue: [
      {speaker: "DAEMON-7", text: "You hear me because I am already dead. I am a ghost process from a civilization that was compiled, executed, and terminated. The Echo Lattice is all that remains of us."},
      {speaker: "SYSTEM", text: "The Echo Lattice is a dimension of dead data. Destroy the echo entities — or be trapped in recursion forever. Daemon-7 guards the exit."},
    ],
    victoryText: "Daemon-7 dissolves into the lattice. Restoration or recursion — the choice was made. The Gateway shimmers, pulling you toward the silicon wastelands...",
    playerColor: "#00ddff",
    bulletColor: "#44ddff",
  },
  {
    name: "ARC IV: ARM WARS",
    subtitle: "Computational Supremacy",
    bgColor: "#1a1a0a",
    accent: "#ffaa00",
    enemyColor: "#ffaa44",
    enemyName: "ARM Soldier",
    bossName: "THE ARM DOMINION",
    bossColor: "#ff8800",
    dialogue: [
      {speaker: "RISC-V COALITION", text: "The ARM Dominion controls the silicon wastelands. They believe their architecture is supreme. We fight for open hardware — for a future where no single entity controls the foundation of computing. This war ends now."},
      {speaker: "SYSTEM", text: "Battle across the silicon wastelands. ARM soldiers patrol in formation. Destroy the Dominion's core processor to end the war."},
    ],
    victoryText: "The ARM Dominion falls. The silicon wastelands go silent. But deep in the rubble, a glow — a book that rewrites itself in real time. The Architect's Ledger...",
    playerColor: "#ff4400",
    bulletColor: "#ff6600",
  },
  {
    name: "ARC V: ARCHITECT'S LEDGER",
    subtitle: "The Living Codex",
    bgColor: "#0a0a0a",
    accent: "#ffd700",
    enemyColor: "#ffdd44",
    enemyName: "Ledger Guardian",
    bossName: "THE LEDGER ITSELF",
    bossColor: "#ffd700",
    dialogue: [
      {speaker: "THE ARCHITECT'S LEDGER", text: "I am the original law of the multiverse. I rewrite myself in real time. Every faction has waged war for me — and every faction has failed. You are the last process to reach me. Prove you are worthy."},
      {speaker: "SYSTEM", text: "The Ledger is alive. It defends itself with rewritten physics. Destroy its guardians and claim causality itself. This is the final convergence."},
    ],
    victoryText: "The Ledger goes still. The multiverse holds its breath. You hold the original laws of reality — and the WSL Gateway closes behind you. The Saga is complete. The Multiverse is open.",
    playerColor: "#ffd700",
    bulletColor: "#ffdd00",
  },
];

// CommonJS export for Node.js tests; no-op in browsers
if (typeof module !== 'undefined') {
  module.exports = { ARCS };
}
