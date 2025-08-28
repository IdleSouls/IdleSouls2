// log.js: Gestisce l'aggiunta di voci al log e la gestione del ridimensionamento della finestra del log

// Funzione per aggiungere un nuovo messaggio al log
function updateLog(message) {
    const logContainer = document.getElementById('log');
    const logResizer = document.getElementById('log-resizer');

    console.log('Aggiungo log: ', message); // Debug: mostra cosa viene aggiunto al log

    // Crea un nuovo elemento div per il log
    const newLog = document.createElement('div');
    newLog.textContent = message;

    // Aggiungi il nuovo log in cima
    logContainer.insertBefore(newLog, logContainer.firstChild);

    // Assicura che la finestra del log si allunghi solo se necessario
    if (logContainer.offsetHeight < logContainer.scrollHeight) {
        logContainer.style.height = logContainer.scrollHeight + 'px';
    }

    // Limita il numero di log che vengono mostrati (esempio: massimo 10 log)
    const logItems = logContainer.getElementsByTagName('div');
    if (logItems.length > 10) {
        logContainer.removeChild(logItems[logItems.length - 1]);  // Rimuovi l'ultimo log (meno recente)
    }

    // Assicurati che l'ultima entry sia sempre visibile in fondo
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Gestire il ridimensionamento del log
const logResizer = document.getElementById('log-resizer');
const logContainer = document.getElementById('log');

// Variabili per il ridimensionamento
let isResizing = false;
let lastDownY = 0;

logResizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  lastDownY = e.clientY;
  document.documentElement.style.cursor = 'ns-resize';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const offset = e.clientY - lastDownY;
  const newHeight = logContainer.offsetHeight - offset;
  
  // Imposta il nuovo valore di altezza mantenendo i limiti
  if (newHeight >= 1 && newHeight <= 250) {  // tra 1px e 250px (circa 10 righe)
    logContainer.style.height = newHeight + 'px';
    lastDownY = e.clientY;  // aggiorna la posizione dell'ultima Y
  }
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.documentElement.style.cursor = 'auto';
});

// Funzione di inizializzazione (opzionale per risistemare la finestra del log)
function initializeLog() {
    const logContainer = document.getElementById('log');
    logContainer.style.height = '0px'; // Imposta la finestra del log invisibile all'inizio
    logContainer.style.transition = 'height 0.3s ease';
}

// Chiamare la funzione initializeLog all'inizio
initializeLog();
