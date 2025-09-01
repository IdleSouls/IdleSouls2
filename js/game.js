// =======================
// Variabili di Gioco
// =======================
let soulFragments = 0;
let minFragments = 0;
let maxFragments = 3;

let focusProgress = 0;
let focusSpeed = 0.5; // % al frame, sarà scalato in requestAnimationFrame
let isFocusing = false;
let isDraining = false;

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
    const res = document.getElementById("soulFragments");
    if(res) res.textContent = soulFragments;
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

    soulFragments -= upg.cost;
    upg.level++;

    if (id === "maxFragment") maxFragments += upg.increment;
    else if (id === "minFragment" && minFragments + upg.increment <= maxFragments) minFragments += upg.increment;
    else if (id === "focusSpeed") focusSpeed += upg.increment;

    upg.cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level));

    window.updateLog(`Hai acquistato "${upg.name}" (Livello ${upg.level})! Prossimo costo: ${upg.cost} SF`, "upgrade");

    updateSoulFragments(0);
    updateUpgradeUI();
}

// =======================
// Focus Bar Logica
// =======================
const focusBar = document.getElementById("focusBar");
let filling = false;
let draining = false;

function focusLoop() {
    if (!focusBar) return;

    if (filling && !draining) {
        focusProgress += focusSpeed;
        if (focusProgress >= 100) {
            focusProgress = 100;
            // Gacha
            const gained = Math.floor(Math.random() * (maxFragments - minFragments + 1)) + minFragments;
            updateSoulFragments(gained);
            window.updateLog(`Hai ottenuto ${gained} frammenti!`, "gacha");

            // Inizia svuotamento
            draining = true;
            filling = false;
        }
    } else if (draining) {
        focusProgress -= 0.5; // velocità di svuotamento
        if (focusProgress <= 0) {
            focusProgress = 0;
            draining = false;
        }
    }

    focusBar.style.width = `${focusProgress}%`;
    requestAnimationFrame(focusLoop);
}

requestAnimationFrame(focusLoop);

// Funzione upgrade già presente
window.applyUpgrade = buyUpgrade;

// Aggiorna probabilità Gacha (da implementare in probabilità dinamica)
window.updateProbabilitiesUI = function() {
    const probText = document.getElementById("probabilitiesText");
    if (!probText) return;
    probText.textContent = `Range: ${minFragments} - ${maxFragments} frammenti`;
};
