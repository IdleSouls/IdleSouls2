document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".navButton");
    const mainContent = document.getElementById("mainContent");

    function loadSection(section) {
        fetch(`pages/${section}.html`)
            .then(res => res.text())
            .then(html => {
                mainContent.innerHTML = html;

                // Sezione Meditation: listener Focus
                const focusButton = document.getElementById('focusButton');
                if (focusButton) {
                    focusButton.addEventListener('click', () => {
                        window.performGacha();
                    });
                }

                // Sezione Upgrades: listener acquisto
                const buyButtons = document.querySelectorAll('.buy-upgrade');
                buyButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const upgrade = btn.dataset.upgrade;
                        const cost = parseInt(btn.previousElementSibling.querySelector('.upgrade-cost').textContent);

                        if (window.soulFragments >= cost) {
                            window.soulFragments -= cost;
                            window.updateResourceCount();
                            window.applyUpgrade(upgrade);
                            window.updateLog(`Hai acquistato l'upgrade: ${upgrade} (Livello ${window.upgrades[upgrade]})`);
                        } else {
                            window.updateLog(`Non hai abbastanza Soul Fragments per ${upgrade}`);
                        }
                    });
                });

                // Aggiorna probabilità se Meditation
                window.updateProbabilitiesUI();
            })
            .catch(err => console.error(err));
    }

    buttons.forEach(btn => btn.addEventListener("click", () => loadSection(btn.dataset.section)));

    // Sezione iniziale
    loadSection("meditation");
});
