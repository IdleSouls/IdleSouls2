document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".navButton");
    const mainContent = document.getElementById("mainContent");

    function loadSection(section) {
        fetch(`pages/${section}.html`)
            .then(res => res.text())
            .then(html => {
                mainContent.innerHTML = html;

                // Pulsante Focus solo se esiste nella sezione
                const focusButton = document.getElementById('focusButton');
                if (focusButton) {
                    focusButton.addEventListener('click', () => {
                        const gained = window.performGacha();
                        window.soulFragments += gained;
                        window.updateResourceCount();
                        window.updateLog(`Hai ottenuto ${gained} Soul Fragments! Totale: ${window.soulFragments}`);
                    });
                }
            })
            .catch(err => console.error(err));
    }

    buttons.forEach(btn => btn.addEventListener("click", () => loadSection(btn.dataset.section)));

    // Sezione iniziale
    loadSection("meditation");
});
