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

// Funzione Gacha con upgrade
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
    window.updateProbabilitiesUI();
    return roll;
};

// Calcola probabilità dinamiche
window.getGachaProbabilities = function() {
    let baseProb = [0.25, 0.25, 0.25, 0.25]; // 0,1,2,3 frammenti di base

    // Applica focusBoost (incrementa mediamente i frammenti)
    const multiplier = 1 + 0.5 * window.upgrades.focusBoost;
    const adjustedProb = baseProb.map((p, i) => p * (i * multiplier + 1));
    const total = adjustedProb.reduce((a,b)=>a+b,0);
    const normalized = adjustedProb.map(p => (p/total*100).toFixed(0) + "%");

    return normalized; // array di percentuali per 0,1,2,3
};

// Aggiorna il box probabilità in Meditation
window.updateProbabilitiesUI = function() {
    const probBox = document.getElementById('probabilitiesText');
    if (!probBox) return;

    const probs = window.getGachaProbabilities();
    probBox.innerHTML = `
        0 Fragments: ${probs[0]}<br>
        1 Fragment: ${probs[1]}<br>
        2 Fragments: ${probs[2]}<br>
        3 Fragments: ${probs[3]}<br>
        Probabilità di doppio Focus: ${25 * window.upgrades.doubleFocus}%
    `;
};
