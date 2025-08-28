function updateLog(message) {
  const logContainer = document.getElementById('log');
  if (!logContainer) return;

  const newLog = document.createElement('div');
  newLog.textContent = message;
  logContainer.insertBefore(newLog, logContainer.firstChild);

  // Mantiene massimo 10 messaggi nel log
  const logItems = logContainer.querySelectorAll('div');
  if (logItems.length > 10) {
    logContainer.removeChild(logItems[logItems.length - 1]);
  }
}
