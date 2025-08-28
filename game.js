// Stato globale Soul Fragments
window.soulFragments = 0;

window.updateResourceCount = function() {
    const resourceCount = document.getElementById('resourceCount');
    if (!resourceCount) return;
    resourceCount.textContent = 'Soul Fragments: ' + window.soulFragments;

    // Aggiorna immagine se disponibile
    if (typeof window.updateFragmentImage === 'function') {
        window.updateFragmentImage(window.soulFragments);
    }
};
