// log.js

window.updateLog = function(message, type = "info") {
    const logContainer = document.getElementById('log');
    if (!logContainer) return;

    const entry = document.createElement('div');
    entry.textContent = message;
    entry.classList.add("log-" + type);

    // Aggiunge in fondo invece che in cima
    logContainer.appendChild(entry);

    // Limita a massimo 20 entry
    const items = logContainer.getElementsByTagName('div');
    if (items.length > 20) logContainer.removeChild(items[0]);

    // Scroll automatico in basso
    logContainer.scrollTop = logContainer.scrollHeight;
};

// Resizer del log
(function() {
    let isResizing = false;
    let lastDownY = 0;
    const logContainer = document.getElementById('log');
    const logResizer = document.getElementById('log-resizer');
    if (!logContainer || !logResizer) return;

    logResizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        lastDownY = e.clientY;
        document.documentElement.style.cursor = 'ns-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const offset = e.clientY - lastDownY;
        const newHeight = logContainer.offsetHeight - offset;
        if (newHeight >= 90 && newHeight <= 300) {
            logContainer.style.height = newHeight + 'px';
            lastDownY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.documentElement.style.cursor = 'auto';
    });
})();
