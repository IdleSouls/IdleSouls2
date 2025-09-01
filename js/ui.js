window.updateLog = function(message, type="info") {
    const logContainer = document.getElementById("log");
    if (!logContainer) return;
    const entry = document.createElement("div");
    entry.textContent = message;
    entry.classList.add("log-" + type);
    logContainer.insertBefore(entry, logContainer.firstChild);

    const items = logContainer.getElementsByTagName("div");
    if (items.length > 20) logContainer.removeChild(items[items.length - 1]);
    logContainer.scrollTop = logContainer.scrollHeight;
};
