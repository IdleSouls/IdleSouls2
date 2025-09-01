// Upgrade globali
window.upgrades = {
    focusBoost: false,
    rareGacha: false,
    doubleFocus: false
};

// Applica effetto upgrade
function applyUpgrade(upgrade) {
    window.upgrades[upgrade] = true;
}

// Gacha globale con applicazione upgrade
window.performGacha = function() {
    let roll = Math.floor(Math.random() * 4); // 0-3

    if (window.upgrades.focusBoost) roll = Math.floor(roll * 1.5);
    if (window.upgrades.doubleFocus && Math.random() < 0.25) roll *= 2;

    window.addSoulFragments(roll);
    window.updateLog(`Hai ottenuto ${roll} Soul Fragments! Totale: ${window.soulFragments}`, "gain");
    return roll;
};
