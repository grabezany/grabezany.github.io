'use strict';

/* =========================
   GAME STATE
========================= */
let money = 0;
let clickPower = 1;
let passiveIncome = 0;

const TICK_LENGTH = 60;
let tickRemaining = TICK_LENGTH;

// Click cooldown
const CLICK_COOLDOWN = 3;      // seconds
let clickCooldownActive = false;

// Save keys
const SAVE_KEY = 'insaneInvestingSaveFile';
const TUTORIAL_KEY = 'tutorialCompleted';

// Encryption parameters (client-side)
const SAVE_CRYPTO = {
  version: 1,
  iter: 120000,
  hash: 'SHA-256',
  pepper: 'insane-investing::v1::pepper'
};

function bytesToB64(bytes) {
  let bin = '';
  bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin);
}

function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(saltBytes) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(SAVE_CRYPTO.pepper),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: SAVE_CRYPTO.iter,
      hash: SAVE_CRYPTO.hash
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function buildSavePayload() {
  return {
    money,
    clickPower,
    passiveIncome,
    stocks,
    upgrades,
    tickRemaining,
    lastOnline: Date.now(),
    dark: document.body.classList.contains('dark')
  };
}

function applySavePayload(save) {
  // Basic validation (prevents broken imports)
  if (!save || typeof save !== 'object') throw new Error('Invalid save');

  money = Number(save.money ?? 0);
  clickPower = Number(save.clickPower ?? 1);
  passiveIncome = Number(save.passiveIncome ?? 0);
  tickRemaining = Number(save.tickRemaining ?? TICK_LENGTH);

  if (save.stocks) Object.assign(stocks, save.stocks);
  if (save.upgrades) Object.assign(upgrades, save.upgrades);

  document.body.classList.toggle('dark', !!save.dark);
}


/* =========================
   STOCKS + UPGRADES
========================= */
const stocks = {
  banana:  { name: 'Banana Corp',     owned: 0, price: 10 },
  rocket:  { name: 'RocketTech',      owned: 0, price: 50 },
  aqua:    { name: 'Aqua Systems',    owned: 0, price: 120 },
  quantum: { name: 'Quantum Labs',    owned: 0, price: 300 },
  neon:    { name: 'Neon Industries', owned: 0, price: 600 }
};

const upgrades = {
  click1: {
    name: 'Better Mouse',
    description: 'A slightly better mouse that improves clicking speed.',
    cost: 100,
    click: 1,
    passive: 0,
    bought: false
  },
  click2: {
    name: 'Gaming Mouse',
    description: 'Precision clicks for serious money.',
    cost: 500,
    click: 3,
    passive: 0,
    bought: false
  },
  click3: {
    name: 'Mechanical Keyboard',
    description: 'Every keystroke counts towards your fortune.',
    cost: 1500,
    click: 5,
    passive: 0,
    bought: false
  },
  click4: {
    name: 'Ergonomic Setup',
    description: 'Comfort meets efficiency for maximum clicks.',
    cost: 5000,
    click: 10,
    passive: 0,
    bought: false
  },
  passive1: {
    name: 'Side Hustle',
    description: 'Earn a small amount every market tick.',
    cost: 250,
    click: 0,
    passive: 2,
    bought: false
  },
  passive2: {
    name: 'Freelance Network',
    description: 'A growing online business that generates a bit income.',
    cost: 10000,
    click: 0,
    passive: 15,
    bought: false
  },
  passive3: {
    name: "Automated Buisness",
    description: 'Set it and forget it. Money flows in automatically.',
    cost: 50000,
    click: 0,
    passive: 50,
    bought: false
  }

};

/* =========================
   LORE
========================= */
const loreTexts = [
  "Every empire begins with a single spark of ambition.",
  "The grind is real. Every dollar earned is a testament to your hustle.",
  "Great fortunes are built on small beginnings.",
  "Before the boardrooms and skyscrapers, there is always the struggle.",
  "Momentum is everything. Keep clicking, keep rising.",
  "In the world of investing, patience is a virtue, but action is king.",
  "The market rewards the bold and the persistent.",
  "Remember, every billionaire has a story. Make yours legendary.",
  "Seize the day, one click at a time.",
  "Your journey to the top starts with a single investment."
];
let loreIndex = 0;

function cycleLore() {
  const loreEl = document.getElementById('lore');
  if (!loreEl) return;

  loreEl.style.opacity = '0';
  setTimeout(() => {
    loreIndex = (loreIndex + 1) % loreTexts.length;
    loreEl.textContent = loreTexts[loreIndex];
    loreEl.style.opacity = '1';
  }, 500);
}

/* =========================
   SAVE / LOAD + OFFLINE EARNINGS
========================= */
function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(buildSavePayload()));
}

async function exportSave() {
  try {
    const payload = buildSavePayload();
    const plaintext = new TextEncoder().encode(JSON.stringify(payload));

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(salt);

    const ciphertext = new Uint8Array(
      await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext)
    );

    const wrapped = {
      app: 'insane-investing',
      v: SAVE_CRYPTO.version,
      salt: bytesToB64(salt),
      iv: bytesToB64(iv),
      data: bytesToB64(ciphertext)
    };

    const blob = new Blob([JSON.stringify(wrapped)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'insane-investing-save.iisave';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showSaveNotification();
  } catch (err) {
    alert('Export failed: ' + (err?.message || err));
  }
}

function triggerImport() {
  const file = document.getElementById('importFile');
  if (!file) return;
  file.value = '';
  file.click();
}

async function importSaveFromFile(file) {
  const text = await file.text();
  let wrapped;

  try {
    wrapped = JSON.parse(text);
  } catch {
    throw new Error('Not a valid save file');
  }

  if (!wrapped || wrapped.app !== 'insane-investing' || !wrapped.data || !wrapped.salt || !wrapped.iv) {
    throw new Error('Invalid save format');
  }

  const salt = b64ToBytes(wrapped.salt);
  const iv = b64ToBytes(wrapped.iv);
  const data = b64ToBytes(wrapped.data);

  const key = await deriveKey(salt);

  let plaintextBytes;
  try {
    plaintextBytes = new Uint8Array(
      await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
    );
  } catch {
    throw new Error('Could not decrypt save (wrong file or corrupted)');
  }

  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(plaintextBytes));
  } catch {
    throw new Error('Decrypted data was not valid');
  }


  applySavePayload(payload);
  localStorage.setItem(SAVE_KEY, JSON.stringify(buildSavePayload()));


  renderStocks?.();
  renderUpgrades?.();
  updateUI?.();

  // Offline earnings will apply next load  EDIT: Commpletely broken
  showSaveNotification();
}


function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;

  let save;
  try {
    save = JSON.parse(raw);
  } catch {
    return;
  }

  money = save.money ?? money;
  clickPower = save.clickPower ?? clickPower;
  passiveIncome = save.passiveIncome ?? passiveIncome;
  tickRemaining = save.tickRemaining ?? tickRemaining;

  if (save.stocks) Object.assign(stocks, save.stocks);
  if (save.upgrades) Object.assign(upgrades, save.upgrades);

  if (save.dark) document.body.classList.add('dark');

  // Offline earnings: fractional ticks, notification only if > 0
  if (save.lastOnline && passiveIncome > 0) {
    const now = Date.now();
    const diffMs = Math.max(0, now - save.lastOnline);

    const ticksAway = diffMs / (TICK_LENGTH * 1000);      // allow fractions
    const cappedTicks = Math.min(ticksAway, 24 * 60);     // cap: 24 hours worth of ticks (1440)
    const offlineEarnings = Math.floor(cappedTicks * passiveIncome);

    if (offlineEarnings > 0) {
      money += offlineEarnings;
      showOfflineEarnings(offlineEarnings);
    }
  }
}

/* =========================
   UI
========================= */
function updateUI() {
  const moneyEl = document.getElementById('money');
  if (moneyEl) moneyEl.textContent = Math.floor(money);

  const timerEl = document.getElementById('tickTimer');
  if (timerEl) timerEl.textContent = tickRemaining;

  const perTickEl = document.getElementById('perTick');
  if (perTickEl) perTickEl.textContent = `You earn $${passiveIncome} per tick`;

  
  const stocksTab = document.getElementById('stocks');
  if (stocksTab && stocksTab.classList.contains('active')) renderStocks();

  const upgradesTab = document.getElementById('upgrades');
  if (upgradesTab && upgradesTab.classList.contains('active')) renderUpgrades();

  saveGame();
}

function openTab(id, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById(id);
  if (tab) tab.classList.add('active');
  if (btn) btn.classList.add('active');
  updateUI();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  saveGame();
}

function showSaveNotification() {
  const note = document.getElementById('saveNotification');
  if (!note) return;
  note.style.opacity = '1';
  setTimeout(() => (note.style.opacity = '0'), 1500);
}

/* =========================
   PARTICLES (Not my code, Credit: ChatGPT :sweats:)
========================= */
function spawnParticle(text, e) {
  const button = document.getElementById('clickButton');
  const container = document.getElementById('particles');
  if (!button || !container || !e) return;

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = text;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  container.appendChild(particle);
  setTimeout(() => particle.remove(), 800);
}

/* =========================
   CLICK + COOLDOWN
========================= */
function manualClick(e) {
  if (clickCooldownActive) return;

  money += clickPower;
  spawnParticle(`+$${clickPower}`, e);
  startClickCooldown();
  updateUI();
}

function startClickCooldown() {
  const btn = document.getElementById('clickButton');
  if (!btn) return;

  clickCooldownActive = true;
  btn.disabled = true;

  const overlay = document.createElement('div');
  overlay.className = 'cooldown-overlay';
  btn.appendChild(overlay);

  let elapsed = 0;
  const total = CLICK_COOLDOWN * 1000;

  const interval = setInterval(() => {
    elapsed += 100;
    const progress = Math.min(elapsed / total, 1);
    overlay.style.transform = `scaleX(${1 - progress})`;

    if (progress >= 1) {
      clearInterval(interval);
      clickCooldownActive = false;
      btn.disabled = false;
      overlay.remove();
    }
  }, 100);
}

/* =========================
   HELPERS 
========================= */
function clampInt(v, min, max) {
  v = Math.floor(Number(v));
  if (Number.isNaN(v)) v = min;
  return Math.max(min, Math.min(max, v));
}

function stepInput(inputId, delta, min, max) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const cur = el.value === '' ? min : Number(el.value);
  el.value = clampInt(cur + delta, min, max);
}

/* =========================
   STOCK TRADING
========================= */
function buyStock(key) {
  const s = stocks[key];
  if (!s) return;
  if (money >= s.price) {
    money -= s.price;
    s.owned += 1;
    updateUI();
  }
}

function buyStockAmount(key, amount) {
  const s = stocks[key];
  if (!s) return;
  const affordable = Math.floor(money / s.price);
  if (affordable <= 0) return;

  const amt = clampInt(amount, 1, affordable);
  money -= s.price * amt;
  s.owned += amt;
  updateUI();
}

function buyAllPossible(key) {
  const s = stocks[key];
  if (!s) return;
  const affordable = Math.floor(money / s.price);
  if (affordable <= 0) return;
  buyStockAmount(key, affordable);
}

function sellStock(key) {
  const s = stocks[key];
  if (!s) return;
  if (s.owned > 0) {
    s.owned -= 1;
    money += s.price;
    updateUI();
  }
}

function sellStockAmount(key, amount) {
  const s = stocks[key];
  if (!s) return;
  if (s.owned <= 0) return;

  const amt = clampInt(amount, 1, s.owned);
  s.owned -= amt;
  money += s.price * amt;
  updateUI();
}

function sellAllStocks(key) {
  const s = stocks[key];
  if (!s) return;
  if (s.owned <= 0) return;
  sellStockAmount(key, s.owned);
}

/* =========================
   RENDER STOCKS
========================= */
function renderStocks() {
  const list = document.getElementById('stocksList');
  const searchEl = document.getElementById('search');
  if (!list || !searchEl) return;

  const filter = searchEl.value.toLowerCase();

 
  const saved = {};
  for (const k in stocks) {
    const buyEl = document.getElementById(`buyInput-${k}`);
    const sellEl = document.getElementById(`sellInput-${k}`);
    if (buyEl) saved[`buy-${k}`] = buyEl.value;
    if (sellEl) saved[`sell-${k}`] = sellEl.value;
  }

  const active = document.activeElement;
  let focusedId = null;
  let caretStart = null;
  let caretEnd = null;

  if (active && active.id && (active.id.startsWith('buyInput-') || active.id.startsWith('sellInput-'))) {
    focusedId = active.id;
    caretStart = active.selectionStart;
    caretEnd = active.selectionEnd;
  }

  list.innerHTML = '';

  for (const k in stocks) {
    const s = stocks[k];
    if (!s.name.toLowerCase().includes(filter)) continue;

    const affordable = Math.floor(money / s.price);

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="stock-header">
        <div class="stock-name">${s.name}</div>
        <div class="stock-meta">Owned: ${s.owned}</div>
      </div>
      <div class="stock-meta" style="margin-top:4px;">Price: $${Math.floor(s.price)}</div>

      <div class="controls">
        <div class="control-group">
          <span class="control-title">Buy</span>

          <button class="action" onclick="buyStock('${k}')" ${money < s.price ? 'disabled' : ''}>+1</button>

          <div class="num-wrap">
            <input
              class="num-input"
              type="number"
              min="1"
              max="${Math.max(affordable, 1)}"
              id="buyInput-${k}"
              placeholder="amount"
            >
      
          </div>

          <button class="action"
            onclick="buyStockAmount('${k}', document.getElementById('buyInput-${k}').value)"
            ${affordable <= 0 ? 'disabled' : ''}>
            Buy
          </button>

          <button class="action"
            onclick="buyAllPossible('${k}')"
            ${affordable <= 0 ? 'disabled' : ''}>
            Max
          </button>
        </div>

        <div class="control-group">
          <span class="control-title">Sell</span>

          <button class="action" onclick="sellStock('${k}')" ${s.owned === 0 ? 'disabled' : ''}>-1</button>

          <div class="num-wrap">
            <input
              class="num-input"
              type="number"
              min="1"
              max="${Math.max(s.owned, 1)}"
              id="sellInput-${k}"
              placeholder="amount"
            >
          
          </div>

          <button class="action"
            onclick="sellStockAmount('${k}', document.getElementById('sellInput-${k}').value)"
            ${s.owned === 0 ? 'disabled' : ''}>
            Sell
          </button>

          <button class="action"
            onclick="sellAllStocks('${k}')"
            ${s.owned === 0 ? 'disabled' : ''}>
            All
          </button>
        </div>
      </div>
    `;

    list.appendChild(card);

   
    const buyInput = card.querySelector(`#buyInput-${k}`);
    const sellInput = card.querySelector(`#sellInput-${k}`);
    if (buyInput && saved[`buy-${k}`] !== undefined) buyInput.value = saved[`buy-${k}`];
    if (sellInput && saved[`sell-${k}`] !== undefined) sellInput.value = saved[`sell-${k}`];
  }


  if (focusedId) {
    const el = document.getElementById(focusedId);
    if (el) {
      el.focus();
      try {
        if (caretStart != null && caretEnd != null) el.setSelectionRange(caretStart, caretEnd);
      } catch (_) {}
    }
  }
}

/* =========================
   RENDER UPGRADES
========================= */
function renderUpgrades() {
  const list = document.getElementById('upgradeList');
  if (!list) return;

  list.innerHTML = '';

  for (const k in upgrades) {
    const u = upgrades[k];
    if (u.bought) continue;

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <strong>${u.name}</strong><br>
      <small>${u.description}</small><br><br>
      ${u.click ? `+${u.click} per click<br>` : ''}
      ${u.passive ? `+$${u.passive} per tick<br>` : ''}
      <button class="action" onclick="buyUpgrade('${k}')" ${money < u.cost ? 'disabled' : ''}>
        Buy ($${u.cost})
      </button>
    `;
    list.appendChild(div);
  }
}

function buyUpgrade(key) {
  const u = upgrades[key];
  if (!u) return;

  if (!u.bought && money >= u.cost) {
    money -= u.cost;
    clickPower += u.click;
    passiveIncome += u.passive;
    u.bought = true;

    renderUpgrades();
    updateUI();
  }
}

/* =========================
   OFFLINE EARNINGS (Also busted)
========================= */
function showOfflineEarnings(amount) {
  const note = document.createElement('div');
  note.className = 'offline-earnings';
  note.textContent = `While you were away, you earned $${amount}`;
  document.body.appendChild(note);

  setTimeout(() => note.classList.add('show'), 50);
  setTimeout(() => {
    note.classList.remove('show');
    setTimeout(() => note.remove(), 400);
  }, 4000);
}

/* =========================
   TUTORIAL
========================= */
const tutorialSteps = [
  { title: 'Welcome',  text: "Welcome to Insane Investing. Let's get your first cash." },
  { title: 'Clicking', text: "Click 'Earn Seed Money' to build starting money. Cooldown keeps it fair." },
  { title: 'Stocks',   text: "Go to Stocks to buy and sell. Prices change every market tick." },
  { title: 'Upgrades', text: "Upgrades increase money per click or earn passive income each tick." },
  { title: 'Done',     text: "You’re ready. Build your empire." }
];
let tutorialIndex = 0;

function startTutorial() {
  const overlay = document.getElementById('tutorialOverlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  showTutorialStep();
}

function showTutorialStep() {
  const titleEl = document.getElementById('tutorialTitle');
  const textEl = document.getElementById('tutorialText');
  if (!titleEl || !textEl) return;

  titleEl.textContent = tutorialSteps[tutorialIndex].title;
  textEl.textContent = tutorialSteps[tutorialIndex].text;
}

function nextTutorialStep() {
  tutorialIndex++;
  if (tutorialIndex >= tutorialSteps.length) {
    endTutorial();
  } else {
    showTutorialStep();
  }
}

function endTutorial() {
  const overlay = document.getElementById('tutorialOverlay');
  if (overlay) overlay.classList.add('hidden');
  localStorage.setItem(TUTORIAL_KEY, 'true');
}

/* =========================
   MARKET TICK LOOP
========================= */
function marketTick() {
  
  for (const k in stocks) {
    // 0.8x to 1.2x
    stocks[k].price *= (0.8 + Math.random() * 0.4);
   
    if (stocks[k].price < 1) stocks[k].price = 1;
  }

  // Passive income
  money += passiveIncome;
}

function openEraseConfirm() {
  const o = document.getElementById('confirmOverlay');
  if (o) o.classList.remove('hidden');
}

function closeEraseConfirm() {
  const o = document.getElementById('confirmOverlay');
  if (o) o.classList.add('hidden');
}

function confirmEraseSave() {
  localStorage.removeItem(SAVE_KEY);

  // Reset state (minimal reset)
  money = 0;
  clickPower = 1;
  passiveIncome = 0;
  tickRemaining = TICK_LENGTH;

  for (const k in stocks) {
    stocks[k].owned = 0;
    
  }

  for (const k in upgrades) {
    upgrades[k].bought = false;
  }

  closeEraseConfirm();
  renderStocks?.();
  renderUpgrades?.();
  updateUI?.();
}


/* =========================
   INITIALIZATION
========================= */
document.addEventListener('DOMContentLoaded', () => {

  const loreEl = document.getElementById('lore');
  if (loreEl) loreEl.textContent = loreTexts[0];

  loadGame();
  renderStocks();
  renderUpgrades();
  updateUI();


  const clickBtn = document.getElementById('clickButton');
  if (clickBtn) clickBtn.addEventListener('click', manualClick);

  setInterval(cycleLore, 10000);


  if (!localStorage.getItem(TUTORIAL_KEY)) startTutorial();

  const importEl = document.getElementById('importFile');
if (importEl) {
  importEl.addEventListener('change', async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      await importSaveFromFile(f);
    } catch (err) {
      alert('Import failed: ' + (err?.message || err));
    }
  });
}

});


setInterval(() => {
  tickRemaining--;

  if (tickRemaining <= 0) {
    tickRemaining = TICK_LENGTH;
    marketTick();
  }

  updateUI();
}, 1000);
