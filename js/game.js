// =======================
// Variabili di Gioco
// =======================
let soulFragments = 0;
let minFragments = 0;
let maxFragments = 3;

let focusProgress = 0;
let focusSpeed = 1; // % al secondo
let isFocusing = false;

window.focusState = {
    filling: false,
    draining: false
};

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
// Funzioni
// =======================
function updateSoulFragments(amount) {
    soulFragments += amount;
    const rc = document.getElementById("soulFragments");
    if (rc) rc.textContent = soulFragments;
}

function updateUpgradeUI() {
    upgrades.forEach(upg => {
        const btn = document.getElementById(`buy-${upg.id}`);
        const costSpan = document.getElementById(`cost-${upg.id}`);
        if (btn) {
            btn.disabled = soulFragments < upg.cost || upg.level >= upg.limit;
        }
        if (costSpan) {
            if (upg.level >= upg.limit) {
                costSpan.textContent = "MAX";
            } else {
                costSpan.textContent = `${upg.cost} SF`;
            }
        }
    });
}

function buyUpgrade(id) {
    const upg = upgrades.find(u => u.id === id);
    if (!upg || soulFragments < upg.cost || upg.level >= upg.limit) return;

    soulFragments -= upg.cost;
    upg.level++;

    if (id === "maxFragment") {
        maxFragments += upg.increment;
    } else if (id === "minFragment") {
        if (minFragments + upg.increment <= maxFragments) {
            minFragments += upg.increment;
        }
    } else if (id === "doubleChance") {
        // futuro
    } else if (id === "focusSpeed") {
        focusSpeed += upg.increment;
    }

    upg.cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level));
    updateLog(`Hai acquistato "${upg.name}" (Livello ${upg.level})! Prossimo costo: ${upg.cost} SF`);

    updateSoulFragments(0);
    updateUpgradeUI();
}

// =======================
// Focus Loop
// =======================
window.focusLoop = function() {
    const bar = document.getElementById("focusBar");
    if (!bar) return; // se non esiste, ferma

    if (window.focusState.filling && !window.focusState.draining) {
        focusProgress += focusSpeed * 0.5; // moltiplica per delta time se vuoi più fine
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
        focusProgress -= 0.5; // velocità di svuotamento
        if (focusProgress <= 0) {
            focusProgress = 0;
            window.focusState.draining = false;
        }
    }

    bar.style.width = `${focusProgress}%`;

    requestAnimationFrame(window.focusLoop);
};
