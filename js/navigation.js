document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".navButton");
    const mainContent = document.getElementById("mainContent");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const section = button.dataset.section;
            loadSection(section);
        });
    });

    function loadSection(section) {
        if (section === "meditation") {
            mainContent.innerHTML = `
                <h2>Meditazione</h2>
                <button onclick="meditate()">Focus</button>
                <div class="progressBar">
                    <div id="focusProgress" class="progressFill"></div>
                </div>
                <p>Frammenti attuali: <span id="soulFragments">${soulFragments}</span></p>
                <p>Probabilità: da ${minFragments} a ${maxFragments} frammenti</p>
            `;
        }

        if (section === "upgrades") {
            mainContent.innerHTML = `
                <h2>Upgrade</h2>
                <div id="upgradeList"></div>
            `;
            renderUpgrades();
        }

        if (section === "log") {
            mainContent.innerHTML = `<h2>Log</h2><div id="log"></div>`;
        }
    }

    function renderUpgrades() {
        const container = document.getElementById("upgradeList");
        container.innerHTML = "";
        upgrades.forEach(upg => {
            const item = document.createElement("div");
            item.className = "upgradeItem";
            item.innerHTML = `
                <h3>${upg.name}</h3>
                <p>${upg.description}</p>
                <div class="upgradeActions">
                    <button id="buy-${upg.id}" onclick="buyUpgrade('${upg.id}')">Compra</button>
                    <span id="cost-${upg.id}" class="upgradeCost">${upg.cost} SF</span>
                </div>
            `;
            container.appendChild(item);
        });
        updateUpgradeUI();
    }
});
