let logEntries = 0;

function updateLog(message) {
  const logContainer = document.getElementById('log');
  if (!logContainer) return;

  const newLog = document.createElement('div');
  newLog.textContent = message;
  logContainer.appendChild(newLog); // aggiungi in fondo

  logEntries++;

  // Auto espansione del log per i primi 3 messaggi
  if (logEntries <= 3) {
    const estimatedLineHeight = 22; // circa 1 riga in pixel
    const basePadding = 40; // padding interno già presente
    logContainer.style.height = `${estimatedLineHeight * logEntries + basePadding}px`;
  }

  // Mantieni massimo 10 messaggi
  if (logContainer.children.length > 10) {
    logContainer.removeChild(logContainer.firstChild);
  }

  // Scroll automatico verso il basso
  logContainer.scrollTop = logContainer.scrollHeight;
}
