// Upgrade globali
window.upgrades = {
    minFragments: 0,
    maxFragments: 0,
    doubleFocus: 0,
    fillSpeed: 0,
    drainSpeed: 0
};

// Stato Focus Bar
window.focusState = {
    filling: false,
    draining: false,
    progress: 0
};

// Funzione Gacha aggiornata
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
    return roll;
};

// Barra Focus
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

// Aggiorna probabilità Gacha dinamica
window.updateProbabilitiesUI = function() {
    const probText = document.getElementById('probabilitiesText');
    const doubleElem = document.getElementById('doubleChance');
    if (!probText || !doubleElem) return;

    const minF = 0 + window.upgrades.minFragments;
    const maxF = 3 + window.upgrades.maxFragments;

    probText.textContent = `${minF} - ${maxF} Soul Fragments`;
    doubleElem.textContent = `${window.upgrades.doubleFocus}%`;
};

// Funzione per applicare upgrade
window.applyUpgrade = function(upgrade) {
    switch(upgrade.type) {
        case 'minFragments': window.upgrades.minFragments += upgrade.value; break;
        case 'maxFragments': window.upgrades.maxFragments += upgrade.value; break;
        case 'doubleFocus': window.upgrades.doubleFocus += upgrade.value; break;
        case 'fillSpeed': window.upgrades.fillSpeed += upgrade.value; break;
        case 'drainSpeed': window.upgrades.drainSpeed += upgrade.value; break;
    }
    window.updateProbabilitiesUI();
    window.updateLog(`Upgrade acquistato: ${upgrade.name}`);
};
