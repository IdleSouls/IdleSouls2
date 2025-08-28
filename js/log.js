let isResizing = false;
let lastDownY = 0;
let currentHeight = 6;  // Altezza predefinita per il log (iniziale)
const minHeight = 30;   // Altezza minima (ad esempio 30px)
const maxHeight = 250;  // Altezza massima (ad esempio 250px)

// Aggiungere la logica di ridimensionamento per la finestra del log
const logResizer = document.getElementById('log-resizer');
const logContainer = document.getElementById('log');

// Aggiungi l'evento di ridimensionamento per il log
logResizer.addEventListener('mousedown', (e) => {
  // Inizio del ridimensionamento
  isResizing = true;
  lastDownY = e.clientY;
  document.documentElement.style.cursor = 'ns-resize';  // Cambia il cursore quando si clicca sulla linea di ridimensionamento
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const offset = e.clientY - lastDownY; // Calcola la differenza di posizione
  let newHeight = logContainer.offsetHeight - offset; // Calcola la nuova altezza della finestra del log

  // Imposta il nuovo valore di altezza, rispettando i limiti
  if (newHeight >= minHeight && newHeight <= maxHeight) {  // Limite di altezza tra minHeight e maxHeight
    logContainer.style.height = newHeight + 'px';
    lastDownY = e.clientY;  // Aggiorna la posizione dell'ultima Y
    currentHeight = newHeight; // Salva la dimensione attuale
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

    // Crea un nuovo elemento div per il log
    const newLog = document.createElement('div');
    newLog.textContent = message;

    // Applica il formato di testo al nuovo log
    newLog.style.fontFamily = "'Courier New', monospace";  // Mantieni il formato monospace
    newLog.style.fontSize = '1.1em';  // Imposta la dimensione del font

    // Aggiungi il nuovo log in fondo
    logContainer.appendChild(newLog);

    // Limita il numero di log che vengono mostrati (esempio: massimo 10 log)
    const logItems = logContainer.getElementsByTagName('div');
    if (logItems.length > 10) {
        logContainer.removeChild(logItems[0]);  // Rimuovi il log più vecchio (in cima)
    }

    // Assicura che la finestra del log si allunghi solo se necessario
    if (logContainer.scrollHeight > currentHeight) {
        logContainer.style.height = logContainer.scrollHeight + 'px';  // Allunga la finestra del log se necessario
    }

    // Mantieni l'altezza corrente senza forzare la dimensione predefinita
    if (currentHeight) {
        logContainer.style.height = currentHeight + 'px';
    }

    // Assicurati che l'ultima entry sia sempre visibile in fondo
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Funzione di inizializzazione (opzionale per risistemare la finestra del log)
function initializeLog() {
    const logContainer = document.getElementById('log');
    logContainer.style.height = '6em';  // Imposta la finestra del log alla dimensione predefinita (6em)
    logContainer.style.transition = 'height 0.3s ease';
}

// Chiamare la funzione initializeLog all'inizio
initializeLog();
