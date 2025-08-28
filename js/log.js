// log.js: Gestisce l'aggiunta di voci al log e la gestione del ridimensionamento della finestra del log

let isResizing = false;
let lastDownY = 0;
let logHeight = 90;  // Impostiamo una dimensione iniziale della finestra di log (90px per 3 entry)

// Aggiungere la logica di ridimensionamento per la finestra del log
const logResizer = document.getElementById('log-resizer');
const logContainer = document.getElementById('log');

// Imposta la larghezza iniziale della finestra del log
logContainer.style.height = `${logHeight}px`;  // Altezza iniziale

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
  if (newHeight >= 150 && newHeight <= 300) {  // Limite di altezza tra 150px e 300px
    logContainer.style.height = newHeight + 'px';
    lastDownY = e.clientY;  // Aggiorna la posizione dell'ultima Y
    logHeight = newHeight;  // Salva la dimensione attuale
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

    // Aggiungi il nuovo log in fondo
    logContainer.appendChild(newLog);

    // Limita il numero di log che vengono mostrati (esempio: massimo 20 log)
    const logItems = logContainer.getElementsByTagName('div');
    if (logItems.length > 20) {
        logContainer.removeChild(logItems[0]);  // Rimuovi il log più vecchio (in cima)
    }

    // Impostare l'altezza della finestra in base al numero di log
    const maxHeight = logHeight || 90;  // Se non è stato modificato, usa il valore di default
    logContainer.style.height = `${Math.min(logItems.length, 20) * 30}px`;  // 30px per log

    // Assicurati che l'ultima entry sia sempre visibile in fondo
    logContainer.scrollTop = logContainer.scrollHeight;
}
