// =======================
// Variabili di Gioco
// =======================
let soulFragments = 0;
let minFragments = 0;
let maxFragments = 3;

let focusProgress = 0;
let focusSpeed = 1; // Percentuale al frame
window.focusState = { filling: false, draining: false };

// =======================
// Upgrade
// =======================
let upgrades = [
    {
        id: "maxFragment",
        name: "Frammenti Massimi",
        description: "Aumenta i frammenti massimi ottenibili",
        baseCost: 10,
        cost: 10,
        costMultiplier: 1.5,
        increment: 1,
        level: 0,
        limit: 20
    },
    {
        id: "minFragment",
        name: "Frammenti Minimi",
        description: "Aumenta i frammenti minimi ottenibili",
        baseCost: 20,
        cost: 20,
        costMultiplier: 1.5,
        increment: 1,
        level: 0,
        limit: 20
    },
    {
        id: "doubleChance",
        name: "Probabilità Doppio Gacha",
        description: "Aumenta la probabilità di ottenere un doppio gacha",
        baseCost: 50,
        cost: 50,
        costMultiplier: 2,
        increment: 1,
        level: 0,
        limit: 50
    },
    {
        id: "focusSpeed",
        name: "Velocità Focus",
        description: "Aumenta la velocità di caricamento della barra focus",
        baseCost: 40,
        cost: 40,
        costMultiplier: 1.8,
        increment: 5,
        level: 0,
        limit: 100
    }
];

// =======================
// Funzioni di base
// =======================
function updateSoulFragments(amount = 0) {
    soulFragments += amount;
    const count = document.getElementById("soulFragments");
    if (count) count.textContent = soulFragments;
    updateUpgradeUI();
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

    // Sottrai frammenti
    soulFragments -= upg.cost;
    upg.level++;

    // Applica effetti
    if (id === "maxFragment") maxFragments += upg.increment;
    else if (id === "minFragment" && minFragments + upg.increment <= maxFragments) minFragments += upg.increment;
    else if (id === "doubleChance") {} // da implementare
    else if (id === "focusSpeed") focusSpeed += upg.increment;

    // Aggiorna costo
    upg.cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level));

    // Log
    updateLog(`Hai acquistato "${upg.name}" (Livello ${upg.level})! Prossimo costo: ${upg.cost} SF`);

    // Aggiorna UI
    updateSoulFragments(0);
}

// =======================
// Loop Focus / Meditazione
// =======================
function meditateLoop() {
    const focusBar = document.getElementById("focusBar");
    if (!focusBar) return;

    if (window.focusState.filling && !window.focusState.draining) {
        focusProgress += focusSpeed * 0.1;
        if (focusProgress >= 100) {
            focusProgress = 100;
            window.focusState.filling = false;
            window.focusState.draining = true;

            // Calcolo frammenti
            const gained = Math.floor(Math.random() * (maxFragments - minFragments + 1)) + minFragments;
            updateSoulFragments(gained);
            updateLog(`Hai ottenuto ${gained} frammenti!`);
        }
    } else if (window.focusState.draining) {
        focusProgress -= focusSpeed * 0.05; // svuotamento lento
        if (focusProgress <= 0) {
            focusProgress = 0;
            window.focusState.draining = false;
        }
    }

    focusBar.style.width = `${focusProgress}%`;
    requestAnimationFrame(meditateLoop);
}

// Avvia il loop appena il file viene caricato
requestAnimationFrame(meditateLoop);
