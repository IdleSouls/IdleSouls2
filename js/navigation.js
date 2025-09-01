document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".navButton");
    const mainContent = document.getElementById("mainContent");

    function loadSection(section){
        fetch(`pages/${section}.html`)
            .then(res=>res.text())
            .then(html=>{
                mainContent.innerHTML = html;

                // Se la sezione è meditation
                const focusButton = document.getElementById('focusButton');
                if(focusButton){
                    focusButton.addEventListener('mousedown',()=>{
                        if(!window.focusState.filling && !window.focusState.draining)
                            window.focusState.filling=true;
                    });
                    focusButton.addEventListener('mouseup',()=>window.focusState.filling=false);
                    focusButton.addEventListener('mouseleave',()=>window.focusState.filling=false);
                }

                // Se la sezione è upgrades
                if(section==='upgrades'){
                    window.renderUpgrades();
                }

                window.updateProbabilitiesUI();
            })
            .catch(err=>console.error(err));
    }

    buttons.forEach(btn=>btn.addEventListener('click',()=>loadSection(btn.dataset.section)));
    loadSection("meditation");
});
