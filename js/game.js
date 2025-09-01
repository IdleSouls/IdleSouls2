// Stato globale dei Soul Fragments
window.soulFragments = 0;

// Aggiorna il contatore delle risorse
window.updateResourceCount = function() {
    const resourceCount = document.getElementById('resourceCount');
    if (!resourceCount) return;
    resourceCount.textContent = 'Soul Fragments: ' + window.soulFragments;

    // Aggiorna immagine se disponibile
    if (typeof window.updateFragmentImage === 'function') {
        window.updateFragmentImage(window.soulFragments);
    }
};

// Aggiunge Soul Fragments e aggiorna contatore + log
window.addSoulFragments = function(amount) {
    window.soulFragments += amount;
    window.updateResourceCount();
};
