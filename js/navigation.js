document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".navButton");
    const mainContent = document.getElementById("mainContent");

    function loadSection(section) {
        fetch(`pages/${section}.html`)
            .then(res => res.text())
            .then(html => {
                mainContent.innerHTML = html;

                // Meditation
                const focusButton = document.getElementById('focusButton');
                if (focusButton) {
                    focusButton.addEventListener('mousedown', () => {
                        if (!window.focusState.draining && !window.focusState.filling) {
                            window.focusState.filling = true;
                        }
                    });
                    focusButton.addEventListener('mouseup', () => { window.focusState.filling = false; });
                    focusButton.addEventListener('mouseleave', () => { window.focusState.filling = false; });
                }

                // Upgrades
                const upgradeButtons = document.querySelectorAll('.upgradeButton');
                upgradeButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const type = btn.dataset.type;
                        const value = parseFloat(btn.dataset.value);
                        const name = btn.parentElement.querySelector('span').textContent;
                        window.applyUpgrade(type, value, name);
                    });
                });

                window.updateProbabilitiesUI();

                // Avvia loop Focus solo se siamo su Meditation
                if (section === "meditation") {
                    requestAnimationFrame(window.focusLoop);
                }
            })
            .catch(err => console.error(err));
    }

    buttons.forEach(btn => btn.addEventListener("click", () => loadSection(btn.dataset.section)));

    loadSection("meditation");
});
