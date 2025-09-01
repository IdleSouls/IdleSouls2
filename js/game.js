// =======================
// Variabili di Gioco
// =======================
window.soulFragments = 0;

window.upgrades = {
    minFragments: 0,
    maxFragments: 0,
    doubleFocus: 0,
    fillSpeed: 0,
    drainSpeed: 0
};

// Definizione upgrade con costi, incremento e limite
window.upgradeDefinitions = [
    {
        id: "minFragments",
        name: "Frammenti Minimi",
        value: 1,
        baseCost: 20,
        costMultiplier: 1.5,
        level: 0,
        limit: 10
    },
    {
        id: "maxFragments",
        name: "Frammenti Massimi",
        value: 1,
        baseCost: 10,
        costMultiplier: 1.5,
        level: 0,
        limit: 20
    },
    {
        id: "doubleFocus",
        name: "Probabilità Doppio Focus",
        value: 1,
        baseCost: 50,
        costMultiplier: 2,
        level: 0,
        limit: 50
    },
    {
        id: "fillSpeed",
        name: "Velocità Focus",
        value: 0.5,
        baseCost: 40,
        costMultiplier: 1.8,
        level: 0,
        limit: 5
    },
    {
        id: "drainSpeed",
        name: "Velocità Svuotamento Barra",
        value: 0.2,
        baseCost: 30,
        costMultiplier: 1.7,
        level: 0,
        limit: 5
    }
];

// =======================
// Funzioni generali
// =======================

// Aggiorna contatore Soul Fragments
window.updateResourceCount = function() {
    const resourceCount = document.getElementById('resourceCount');
    if (!resourceCount) return;
    resourceCount.textContent = 'Soul Fragments: ' + window.soulFragments;
};

// Aggiunge Soul Fragments
window.addSoulFragments = function(amount) {
    window.soulFragments += amount;
    window.updateResourceCount();
};

// =======================
// Focus Bar e Gacha
// =======================
window.focusState = {
    filling: false,
    draining: false,
    progress: 0
};

window.performGacha = function() {
    const minF = 0 + window.upgrades.minFragments;
    const maxF = 3 + window.upgrades.maxFragments;
    let roll = Math.floor(Math.random() * (maxF - minF + 1)) + minF;

    if (window.upgrades.doubleFocus > 0 && Math.random() < 0.01 * window.upgrades.doubleFocus) {
        roll *= 2;
    }

    window.soulFragments += roll;
    window.updateResourceCount();
    window.updateLog(`Hai ottenuto ${roll} Soul Fragments! Totale: ${window.soulFragments}`);
    window.updateProbabilitiesUI();
};

window.updateFocusBarUI = function() {
    const bar = document.getElementById('focusBar');
    if (!bar) return;
    bar.style.width = window.focusState.progress + '%';
};

window.focusTick = function() {
    const fillSpeed = 0.5 + window.upgrades.fillSpeed;
    const drainSpeed = 0.2 + window.upgrades.drainSpeed;

    if (window.focusState.filling) {
        window.focusState.progress += fillSpeed;
        if (window.focusState.progress >= 100) {
            window.focusState.progress = 100;
            window.focusState.filling = false;
            window.performGacha();
            window.focusState.draining = true;
        }
    } else if (window.focusState.draining) {
        window.focusState.progress -= drainSpeed;
        if (window.focusState.progress <= 0) {
            window.focusState.progress = 0;
            window.focusState.draining = false;
        }
    }

    window.updateFocusBarUI();
};

setInterval(window.focusTick, 20);

// =======================
// Probabilità e upgrade UI
// =======================
window.updateProbabilitiesUI = function() {
    const probText = document.getElementById('probabilitiesText');
    const doubleElem = document.getElementById('doubleChance');
    if (!probText || !doubleElem) return;

    const minF = 0 + window.upgrades.minFragments;
    const maxF = 3 + window.upgrades.maxFragments;

    probText.textContent = `${minF} - ${maxF} Soul Fragments`;
    doubleElem.textContent = `${window.upgrades.doubleFocus}%`;
};

// Acquisto upgrade
window.applyUpgrade = function(id) {
    const upg = window.upgradeDefinitions.find(u => u.id === id);
    if (!upg) return;

    const cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level));

    if (window.soulFragments < cost) {
        window.updateLog(`Non hai abbastanza Soul Fragments per acquistare ${upg.name}`);
        return;
    }

    if (upg.level >= upg.limit) {
        window.updateLog(`${upg.name} ha già raggiunto il livello massimo`);
        return;
    }

    // Sottrai Soul Fragments
    window.soulFragments -= cost;
    window.updateResourceCount();

    // Applica effetto
    if (id === "minFragments") window.upgrades.minFragments += upg.value;
    if (id === "maxFragments") window.upgrades.maxFragments += upg.value;
    if (id === "doubleFocus") window.upgrades.doubleFocus += upg.value;
    if (id === "fillSpeed") window.upgrades.fillSpeed += upg.value;
    if (id === "drainSpeed") window.upgrades.drainSpeed += upg.value;

    upg.level++;
    window.updateProbabilitiesUI();
    window.updateLog(`Hai acquistato ${upg.name} (Livello ${upg.level}) - Costo: ${cost} SF`);

    // Aggiorna la UI degli upgrade
    renderUpgrades();
};

// =======================
// Rendering upgrade dinamico
// =======================
window.renderUpgrades = function() {
    const container = document.getElementById('upgradesContainer');
    if (!container) return;

    container.innerHTML = '';

    window.upgradeDefinitions.forEach(upg => {
        const item = document.createElement('div');
        item.className = 'upgradeItem';

        // Testo upgrade
        const textDiv = document.createElement('div');
        textDiv.className = 'upgradeText';
        textDiv.textContent = upg.name;

        // Pulsante compra + costo
        const btn = document.createElement('button');
        btn.className = 'upgradeButton';
        btn.textContent = upg.level >= upg.limit 
            ? 'MAX' 
            : `Compra - Costo: ${Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level))} SF`;

        btn.disabled = upg.level >= upg.limit || window.soulFragments < Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.level));

        btn.addEventListener('click', () => {
            window.applyUpgrade(upg.id);
        });

        item.appendChild(textDiv);
        item.appendChild(btn);
        container.appendChild(item);
    });
};
