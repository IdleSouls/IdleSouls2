// Upgrade globali
window.upgrades = {
    minFragments: 0,       // aumento minimo frammenti
    maxFragments: 0,       // aumento massimo frammenti
    doubleFocus: 0,        // probabilità di doppio gacha
    fillSpeed: 0,          // velocità riempimento barra
    drainSpeed: 0           // velocità svuotamento barra
};

// Stato Focus Bar
window.focusState = {
    filling: false,
    draining: false,
    progress: 0,
    fillSpeed: 0.5, // percentuale al tick
    drainSpeed: 0.2
};

// Funzione Gacha aggiornata
window.performGacha = function() {
    const minF = 0 + window.upgrades.minFragments;
    const maxF = 3 + window.upgrades.maxFragments;
    let roll = Math.floor(Math.random() * (maxF - minF + 1)) + minF;

    // Effetto doubleFocus
    if (window.upgrades.doubleFocus > 0 && Math.random() < 0.01 * window.upgrades.doubleFocus) {
        roll *= 2;
    }

    window.soulFragments += roll;
    window.updateResourceCount();
    window.updateLog(`Hai ottenuto ${roll} Soul Fragments! Totale: ${window.soulFragments}`);
    window.updateProbabilitiesUI();
    return roll;
};

// Aggiorna barra UI
window.updateFocusBarUI = function() {
    const bar = document.getElementById('focusBar');
    if (!bar) return;
    bar.style.width = window.focusState.progress + '%';
};

// Tick barra (riempimento / svuotamento)
window.focusTick = function() {
    if (window.focusState.filling) {
        window.focusState.progress += window.focusState.fillSpeed + window.upgrades.fillSpeed;
        if (window.focusState.progress >= 100) {
            window.focusState.progress = 100;
            window.focusState.filling = false;
            // Esegui il gacha
            window.performGacha();
            window.focusState.draining = true;
        }
    } else if (window.focusState.draining) {
        window.focusState.progress -= window.focusState.drainSpeed + window.upgrades.drainSpeed;
        if (window.focusState.progress <= 0) {
            window.focusState.progress = 0;
            window.focusState.draining = false;
        }
    }
    window.updateFocusBarUI();
};

// Start tick loop
setInterval(window.focusTick, 20); // 50 fps

// Aggiorna probabilità dinamiche
window.updateProbabilitiesUI = function() {
    const probText = document.getElementById('probabilitiesText');
    const doubleElem = document.getElementById('doubleChance');
    if (!probText || !doubleElem) return;

    const minF = 0 + window.upgrades.minFragments;
    const maxF = 3 + window.upgrades.maxFragments;

    probText.textContent = `${minF} - ${maxF} Soul Fragments`;
    doubleElem.textContent = `${window.upgrades.doubleFocus}%`;
};
