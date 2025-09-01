// =======================
// Variabili di gioco
// =======================
let soulFragments = 0;
let minFragments = 0;
let maxFragments = 3;

let focusProgress = 0;
let focusSpeed = 1; // % al secondo
let isFocusing = false;
let isDraining = false;

let upgrades = [
    { id: "maxFragment", name: "Frammenti Massimi", description: "Aumenta i frammenti massimi ottenibili", baseCost: 10, cost: 10, costMultiplier: 1.5, increment: 1, level: 0, limit: 20 },
    { id: "minFragment", name: "Frammenti Minimi", description: "Aumenta i frammenti minimi ottenibili", baseCost: 20, cost: 20, costMultiplier: 1.5, increment: 1, level: 0, limit: 20 },
    { id: "doubleChance", name: "Probabilità Doppio Gacha", description: "Aumenta la probabilità di ottenere un doppio gacha", baseCost: 50, cost: 50, costMultiplier: 2, increment: 1, level: 0, limit: 50 },
    { id: "focusSpeed", name: "Velocità Focus", description: "Aumenta la velocità di caricamento della barra focus", baseCost: 40, cost: 40, costMultiplier: 1.8, increment: 5, level: 0, limit: 100 }
];

// =======================
// Funzioni
// =======================
function updateSoulFragments(amount) {
    soulFragments += amount;
    document.getElementById("resourceCount").textContent = "Soul Fragments: " + soulFragments;
    updateUpgradeUI();
    updateProbabilitiesUI();
}

function updateUpgradeUI() {
    upgrades.forEach(upg => {
        const btn = document.getElementById(`buy-${upg.id}`);
        const costSpan = document.getElementById(`cost-${upg.id}`);
        if (btn) btn.disabled = soulFragments < upg.cost || upg.level >= upg.limit;
        if (costSpan) costSpan.textContent = upg.level >= upg.limit ? "MAX" : `${upg.cost} SF`;
    });
}

function buyUpgrade(id) {
    const upg = upgrades.find(u => u.id === id);
    if (!upg || soulFragments < upg.cost || upg.level >= upg.limit) return;

    soulFragments -= upg.cost;
    upg.level++;

    // Applica effetti
    if (id === "maxFragment") maxFragments += upg.increment;
    if (id === "minFragment" && minFragments + upg.increment <= maxFragments) minFragments += upg.increment;
    if (id === "doubleChance") { /* da implementare */ }
    if (id === "focusSpeed") focusSpeed += upg.increment;

    upg.cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level));

    updateLog(`Hai acquistato "${upg.name}" (Livello ${upg.level})! Prossimo costo: ${upg.cost} SF`);
    updateSoulFragments(0);
}

function updateProbabilitiesUI() {
    const text = document.getElementById("probabilitiesText");
    if (text) text.textContent = `${minFragments} - ${maxFragments} frammenti`;
}

function meditateLoop() {
    const focusBar = document.getElementById("focusBar");
    if (!focusBar) return;

    if (window.focusState.filling && !isFocusing && !isDraining) {
        focusProgress += focusSpeed;
        if (focusProgress >= 100) {
            focusProgress = 100;
            isFocusing = true;
            window.focusState.filling = false;
            // Lancia il gacha
            const gained = Math.floor(Math.random() * (maxFragments - minFragments + 1)) + minFragments;
            updateSoulFragments(gained);
            updateLog(`Hai ottenuto ${gained} frammenti!`);
            // Inizia il draining della barra
            isDraining = true;
        }
    } else if (isDraining) {
        focusProgress -= focusSpeed / 2; // svuotamento più lento
        if (focusProgress <= 0) {
            focusProgress = 0;
            isDraining = false;
            isFocusing = false;
        }
    }

    focusBar.style.width = `${focusProgress}%`;
    requestAnimationFrame(meditateLoop);
}

// =======================
// Stato globale focus
// =======================
window.focusState = { filling: false, draining: false };

// =======================
// Avvio loop
// =======================
requestAnimationFrame(meditateLoop);

// =======================
// Log
// =======================
function updateLog(message) {
    const log = document.getElementById("log");
    if (!log) return;
    const entry = document.createElement("div");
    entry.textContent = message;
    log.prepend(entry);
}
