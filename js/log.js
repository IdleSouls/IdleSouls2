let logEntries = 0;

function updateLog(message) {
  const logContainer = document.getElementById('log');
  if (!logContainer) return;

  const newLog = document.createElement('div');
  newLog.textContent = message;

  logContainer.appendChild(newLog); // log più recente in fondo
  logEntries++;

  // Auto espansione del log per i primi 3 messaggi
  if (logEntries <= 3) {
    const lineHeight = 1.4 * 1.1 * 16; // approssimazione em → px (1.1em, 1.4 line-height)
    logContainer.style.height = `${lineHeight * logEntries + 40}px`; // include padding
  }

  // Mantieni massimo 10 messaggi visibili
  if (logContainer.children.length > 10) {
    logContainer.removeChild(logContainer.children[0]);
  }

  // Scorri verso il basso automaticamente
  logContainer.scrollTop = logContainer.scrollHeight;
}
