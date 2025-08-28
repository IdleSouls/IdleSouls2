// Aggiorna il log
window.updateLog = function(message) {
    const logContainer = document.getElementById('log');
    if (!logContainer) return;

    const entry = document.createElement('div');
    entry.textContent = message;
    logContainer.insertBefore(entry, logContainer.firstChild);

    const items = logContainer.getElementsByTagName('div');
    if (items.length > 10) logContainer.removeChild(items[items.length - 1]);
};

// Pulsante Focus
document.addEventListener("DOMContentLoaded", () => {
    const focusButton = document.getElementById('focusButton');
    if (!focusButton) return;

    focusButton.addEventListener('click', () => {
        const gained = window.performGacha();
        window.soulFragments += gained;
        window.updateResourceCount();
        window.updateLog(`Hai ottenuto ${gained} Soul Fragments! Totale: ${window.soulFragments}`);
    });
});
