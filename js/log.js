// log.js: Gestisce l'aggiunta di voci al log e la gestione del ridimensionamento della finestra del log

let isResizing = false;
let lastDownY = 0;

// Aggiungere la logica di ridimensionamento per la finestra del log
const logResizer = document.getElementById('log-resizer');
const logContainer = document.getElementById('log');

logResizer.addEventListener('mousedown', (e) => {
  // Inizio del ridimensionamento
  isResizing = true;
  lastDownY = e.clientY;
  document.documentElement.style.cursor = 'ns-resize';  // Cambia il cursore quando si clicca sulla linea di ridimensionamento
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const offset = e.clientY - lastDownY; // Calcola la differenza di posizione
  const newHeight = logContainer.offsetHeight - offset; // Invertiamo il comportamento (se trascini verso l'alto, aumenta)

  // Imposta il nuovo valore di altezza, rispettando i limiti
  if (newHeight >= 90 && newHeight <= 120) {  // Limite di altezza tra 3 entry (90px) e 4 entry (120px)
    logContainer.style.height = newHeight + 'px';
    lastDownY = e.clientY;  // Aggiorna la posizione dell'ultima Y
  }
});

document.addEventListener('mouseup', () => {
  // Fine del ridimensionamento
  isResizing = false;
  document.documentElement.style.cursor = 'auto';  // Ripristina il cursore normale
});

// Funzione per aggiungere voci al log
function updateLog(message) {
    const logContainer = document.getElementById('log');
    const logResizer = document.getElementById('log-resizer');

    // Crea un nuovo elemento div per il log
    const newLog = document.createElement('div');
    newLog.textContent = message;

    // Aggiungi il nuovo log in fondo
    logContainer.appendChild(newLog);

    // Assicura che la finestra del log si allunghi solo se necessario
    if (logContainer.offsetHeight < logContainer.scrollHeight) {
        logContainer.style.height = logContainer.scrollHeight + 'px';
    }

    // Limita il numero di log che vengono mostrati (esempio: massimo 20 log)
    const logItems = logContainer.getElementsByTagName('div');
    if (logItems.length > 20) {
        logContainer.removeChild(logItems[0]);  // Rimuovi il log più vecchio (in cima)
    }

    // Assicurati che l'ultima entry sia sempre visibile in fondo
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Funzione di inizializzazione (opzionale per risistemare la finestra del log)
function initializeLog() {
    const logContainer = document.getElementById('log');
    logContainer.style.height = '90px'; // Imposta la finestra del log visibile con l'altezza di default (3 entry)
    logContainer.style.transition = 'height 0.3s ease';
}

// Chiamare la funzione initializeLog all'inizio
initializeLog();
