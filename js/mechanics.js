// Upgrade globali
window.upgrades = {
    focusBoost: 0, // numero di volte acquistato
    rareGacha: 0,
    doubleFocus: 0
};

// Applica upgrade (incrementa contatore)
window.applyUpgrade = function(upgrade) {
    window.upgrades[upgrade]++;
    window.updateProbabilitiesUI();
};

// Aggiunge Soul Fragments
window.addSoulFragments = function(amount) {
    window.soulFragments += amount;
    window.updateResourceCount();
};

// Calcola e restituisce il guadagno dal Focus
window.performGacha = function() {
    let roll = Math.floor(Math.random() * 4); // 0-3

    // Effetto focusBoost: +50% per ogni livello
    if (window.upgrades.focusBoost > 0) {
        roll = Math.floor(roll * (1 + 0.5 * window.upgrades.focusBoost));
    }

    // Effetto doubleFocus: 25% di raddoppio per ogni livello
    if (window.upgrades.doubleFocus > 0 && Math.random() < 0.25 * window.upgrades.doubleFocus) {
        roll *= 2;
    }

    window.addSoulFragments(roll);
    window.updateLog(`Hai ottenuto ${roll} Soul Fragments! Totale: ${window.soulFragments}`, "gain");
    return roll;
};

// Funzione per ottenere probabilità dinamiche
window.getGachaProbabilities = function() {
    let base = "0-3 Soul Fragments";
    let focusBoostPercent = 50 * window.upgrades.focusBoost;
    let doubleChance = 25 * window.upgrades.doubleFocus;

    return {
        base: base,
        focusBoost: focusBoostPercent,
        doubleFocus: doubleChance
    };
};

// Aggiorna il box probabilità in Meditation
window.updateProbabilitiesUI = function() {
    const probBox = document.getElementById('gachaProbabilities');
    if (!probBox) return;

    const probs = window.getGachaProbabilities();
    probBox.innerHTML = `
        <h3>Probabilità Gacha:</h3>
        <p>${probs.base}</p>
        <p>+${probs.focusBoost}% se Focus Potenziato</p>
        <p>${probs.doubleFocus}% possibilità di Doppio Focus</p>
    `;
};
