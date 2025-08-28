// log.js: Gestisce l'aggiunta di voci al log e la gestione del ridimensionamento della finestra del log

// Funzione per aggiungere un nuovo messaggio al log
function updateLog(message) {
    const logContainer = document.getElementById('log');
    const logResizer = document.getElementById('log-resizer');

    console.log('Aggiungo log: ', message); // Debug: mostra cosa viene aggiunto al log

    // Crea un nuovo elemento div per il log
    const newLog = document.createElement('div');
    newLog.textContent = message;

    // Aggiungi il nuovo log in fondo
    logContainer.appendChild(newLog);

    // Assicura che la finestra del log si allunghi solo se necessario
    if (logContainer.offsetHeight < logContainer.scrollHeight) {
        logContainer.style.height = logContainer.scrollHeight + 'px';
    }

    // Limita il numero di log che vengono mostrati (esempio: massimo 10 log)
    const logItems = logContainer.getElementsByTagName('div');
    if (logItems.length > 10) {
        logContainer.removeChild(logItems[0]);  // Rimuovi il log più vecchio (in cima)
    }

    // Assicurati che l'ultima entry sia sempre visibile in fondo
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Gestire il ridimensionamento del log
const logResizer = document.getElementById('log-resizer');
const logContainer = document.getElementById('log');

// log.js: Gestisce l'aggiunta di voci al log e la gestione del ridimensionamento della finestra del log

let isResizing = false;
let lastDownY = 0;
let logHeight = 6;  // Impostiamo una dimensione iniziale della finestra di log

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
  const newHeight = logContainer.offsetHeight - offset; // Calcola la nuova altezza della finestra del log

  // Imposta il nuovo valore di altezza, rispettando i limiti
  if (newHeight >= 30 && newHeight <= 150) {  // Limite di altezza tra 30px e 150px (circa 3 entry)
    logContainer.style.height = newHeight + 'px';
    lastDownY = e.clientY;  // Aggiorna la posizione dell'ultima Y
    logHeight = newHeight; // Salva la dimensione attuale
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

    // Limita il numero di log che vengono mostrati (esempio: massimo 3 log)
    const logItems = logContainer.getElementsByTagName('div');
    if (logItems.length > 3) {
        logContainer.removeChild(logItems[0]);  // Rimuovi il log più vecchio (in cima)
    }

    // Impostare l'altezza della finestra in base al numero di log
    const maxHeight = logHeight || 30;  // Se non è stato modificato, usa il valore di default
    logContainer.style.height = `${Math.min(logItems.length, 3) * 50}px`;  // 50px per log

    // Assicurati che l'ultima entry sia sempre visibile in fondo
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Funzione di inizializzazione (opzionale per risistemare la finestra del log)
function initializeLog() {
    const logContainer = document.getElementById('log');
    logContainer.style.height = '0px'; // Imposta la finestra del log invisibile all'inizio
    logContainer.style.transition = 'height 0.3s ease';
}

// Chiamare la funzione initializeLog all'inizio
initializeLog();
