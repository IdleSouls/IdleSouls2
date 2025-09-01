document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".navButton");
    const mainContent = document.getElementById("mainContent");

    function loadSection(section) {
        fetch(`pages/${section}.html`)
            .then(res => res.text())
            .then(html => {
                mainContent.innerHTML = html;

                // Sezione meditation
                const focusButton = document.getElementById('focusButton');
                if (focusButton) {
                    focusButton.addEventListener('mousedown', () => {
                        if (!window.focusState.draining && !window.focusState.filling) window.focusState.filling = true;
                    });
                    focusButton.addEventListener('mouseup', () => { window.focusState.filling = false; });
                    focusButton.addEventListener('mouseleave', () => { window.focusState.filling = false; });
                }

                // Sezione upgrades
                if (typeof window.renderUpgrades === 'function') {
                    window.renderUpgrades();
                }

                window.updateProbabilitiesUI();
            })
            .catch(err => console.error(err));
    }

    buttons.forEach(btn => btn.addEventListener("click", () => loadSection(btn.dataset.section)));

    loadSection("meditation"); // sezione iniziale
});
