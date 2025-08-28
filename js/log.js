function updateLog(message) {
  const logContainer = document.getElementById('log');
  if (!logContainer) return;
  const newLog = document.createElement('div');
  newLog.textContent = message;
  logContainer.insertBefore(newLog, logContainer.firstChild);
  // Mantieni un massimo di 10 messaggi
  if (logContainer.children.length > 10) {
    logContainer.removeChild(logContainer.lastChild);
  }
}
