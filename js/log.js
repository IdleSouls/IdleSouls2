// Funzione per aggiungere nuovi log
function updateLog(message) {
  const logContainer = document.getElementById('log');
  console.log('Aggiungo log: ', message); // Debug: mostra cosa viene aggiunto al log

  // Crea un nuovo elemento div per il log
  const newLog = document.createElement('div');
  newLog.textContent = message;

  // Aggiungi il nuovo log all'inizio del contenitore (in basso, l'ultimo messaggio va sotto)
  logContainer.appendChild(newLog);

  // Aggiungi l'animazione per aumentare la dimensione del log
  logContainer.style.height = `${Math.min(logContainer.scrollHeight, 15 * 18)}px`; // Limita l'altezza

  // Limita il numero di log che vengono mostrati
  const logItems = logContainer.getElementsByTagName('div');
  if (logItems.length > 10) {
    logContainer.removeChild(logItems[0]); // Rimuove i log più vecchi quando superano il limite
  }
}
