// game.js

let fragments = 0;
let focusActive = false;
let focusProgress = 0;
let focusInterval = null;

// Struttura upgrades
const upgrades = {
    minFragments: { level: 0, value: 0, baseCost: 10 },
    maxFragments: { level: 0, value: 3, baseCost: 15 },
    doubleGachaChance: { level: 0, value: 0, baseCost: 50 }
};

// Inizializzazione
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("focusButton").addEventListener("click", startFocus);
    updateUI();
});

// Funzione focus
function startFocus() {
    if (focusActive) return;
    focusActive = true;
    focusProgress = 0;

    focusInterval = setInterval(() => {
        focusProgress += 2;
        if (focusProgress >= 100) {
            clearInterval(focusInterval);
            focusProgress = 100;
            gainFragments();
            focusActive = false;
            focusProgress = 0;
        }
        updateFocusBar();
    }, 100);
}

// Aggiorna barra focus
function updateFocusBar() {
    document.getElementById("focusBar").style.width = `${focusProgress}%`;
}

// Ottieni frammenti
function gainFragments() {
    const min = upgrades.minFragments.value;
    const max = upgrades.maxFragments.value;
    let gained = Math.floor(Math.random() * (max - min + 1)) + min;

    // Controllo doppio gacha
    if (Math.random() * 100 < upgrades.doubleGachaChance.value) {
        gained *= 2;
    }

    fragments += gained;
    logMessage(`Hai ottenuto ${gained} frammenti!`);
    updateUI();
}

// Compra upgrade
function buyUpgrade(type) {
    const upgrade = upgrades[type];
    const cost = getUpgradeCost(type);

    if (fragments >= cost) {
        fragments -= cost;
        upgrade.level++;

        if (type === "minFragments") upgrade.value++;
        if (type === "maxFragments") upgrade.value++;
        if (type === "doubleGachaChance") upgrade.value += 5;

        logMessage(`Hai comprato l'upgrade: ${type} (livello ${upgrade.level})`);
        updateUI();
    } else {
        logMessage("Frammenti insufficienti!");
    }
}

// Calcolo costo dinamico
function getUpgradeCost(type) {
    const upgrade = upgrades[type];
    return upgrade.baseCost * Math.pow(1.5, upgrade.level);
}

// Aggiorna UI
function updateUI() {
    document.getElementById("fragmentsCount").textContent = fragments;

    // Aggiorna probabilità gacha (dinamico!)
    const min = upgrades.minFragments.value;
    const max = upgrades.maxFragments.value;
    document.getElementById("probabilitiesText").textContent = `${min}-${max} frammenti`;
    document.getElementById("doubleChance").textContent = `${upgrades.doubleGachaChance.value}%`;

    // Aggiorna i pulsanti upgrade con costo
    for (let key in upgrades) {
        const button = document.getElementById(`${key}Upgrade`);
        if (button) {
            button.textContent = `Compra (${getUpgradeCost(key).toFixed(0)} frammenti)`;
        }
    }
}

// Log
function logMessage(msg) {
    const log = document.getElementById("log");
    if (!log) return;
    const p = document.createElement("p");
    p.textContent = msg;
    log.prepend(p);
}
