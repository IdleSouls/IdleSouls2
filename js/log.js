let isResizing = false;
let lastDownY = 0;
const defaultHeight = 90;  // altezza predefinita per 3 entry (90px)
const maxHeight = 300;  // massimo per 20 entry (300px)
const minHeight = 120;  // minimo per 3 entry (120px)

// Seleziona il contenitore e la linea di ridimensionamento
const logContainer = document.getElementById('log');
const logResizer = document.getElementById('log-resizer');

// Impostazione iniziale per la dimensione predefinita
logContainer.style.height = defaultHeight + 'px';

// Inizio del ridimensionamento
logResizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  lastDownY = e.clientY;
  document.documentElement.style.cursor = 'ns-resize'; // Cambia il cursore quando si clicca sulla linea di ridimensionamento
});

// Durante il ridimensionamento
document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const offset = lastDownY - e.clientY; // Cambia l'ordine per invertire il ridimensionamento
  let newHeight = logContainer.offsetHeight + offset; // Calcola la nuova altezza della finestra del log

  // Limita l'altezza tra minHeight e maxHeight
  if (newHeight >= minHeight && newHeight <= maxHeight) {
    logContainer.style.height = newHeight + 'px';
    lastDownY = e.clientY;  // Aggiorna la posizione dell'ultima Y
  }
});

// Fine del ridimensionamento
document.addEventListener('mouseup', () => {
  isResizing = false;
  document.documentElement.style.cursor = 'auto'; // Ripristina il cursore normale
});

// Funzione per aggiungere voci al log
function updateLog(message) {
  const logContainer = document.getElementById('log');

  // Crea un nuovo elemento div per il log
  const newLog = document.createElement('div');
  newLog.textContent = message;

  // Aggiungi il nuovo log in fondo
  logContainer.appendChild(newLog);

  // Limita il numero di log a 20
  const logItems = logContainer.getElementsByTagName('div');
  if (logItems.length > 20) {
    logContainer.removeChild(logItems[0]);  // Rimuovi il log più vecchio
  }

  // Imposta l'altezza del log per mantenere la finestra a 3 entry (ripristina la dimensione predefinita)
  logContainer.style.height = defaultHeight + 'px';

  // Assicura che l'ultima entry sia sempre visibile in fondo
  logContainer.scrollTop = logContainer.scrollHeight;
}

// Funzione di inizializzazione
function initializeLog() {
  const logContainer = document.getElementById('log');
  logContainer.style.height = defaultHeight + 'px'; // Imposta la finestra del log alla dimensione predefinita (3 entry)
  logContainer.style.transition = 'height 0.3s ease';
}

// Chiamare la funzione initializeLog all'inizio
initializeLog();
