// Senha correta do cofre
const correctCode = "2026";

// Aqui eu controlo o código digitado e as tentativas do usuário
let typedCode = "";
let wrongAttempts = 0;
let isLocked = false;
let countdownInterval = null;

// Elementos principais da tela
const keys = document.querySelectorAll(".key");
const slots = document.querySelectorAll(".code-slot");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attemptsText");
const openButton = document.getElementById("openButton");
const safeCard = document.getElementById("safeCard");
const vaultIcon = document.getElementById("vaultIcon");
const lockScreen = document.getElementById("lockScreen");
const countdownText = document.getElementById("countdownText");
const moneyBox = document.getElementById("moneyBox");

// Crio o contexto de áudio só quando o usuário interagir
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

// Função base para criar sons com JavaScript puro
function playTone(frequency, duration, type = "sine", volume = 0.08) {
  const context = getAudioContext();

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

// Som de clique dos números
function playKeySound() {
  playTone(620, 0.07, "sine", 0.05);
}

// Som quando tenta abrir
function playOpenAttemptSound() {
  playTone(340, 0.09, "triangle", 0.06);

  setTimeout(() => {
    playTone(460, 0.09, "triangle", 0.06);
  }, 90);
}

// Som de erro
function playErrorSound() {
  playTone(180, 0.12, "sawtooth", 0.08);

  setTimeout(() => {
    playTone(130, 0.16, "sawtooth", 0.08);
  }, 120);
}

// Som de sucesso
function playSuccessSound() {
  const notes = [520, 660, 780, 980];

  notes.forEach((note, index) => {
    setTimeout(() => {
      playTone(note, 0.13, "sine", 0.08);
    }, index * 120);
  });
}

// Som de emergência durante o bloqueio
function playEmergencySound() {
  playTone(780, 0.18, "square", 0.06);

  setTimeout(() => {
    playTone(420, 0.18, "square", 0.06);
  }, 190);
}

// Atualiza os espaços visuais do código
function updateDisplay() {
  slots.forEach((slot, index) => {
    const digit = typedCode[index];

    slot.textContent = digit ? "•" : "";
    slot.classList.toggle("filled", Boolean(digit));
  });
}

// Mostra mensagem com cor diferente dependendo do tipo
function showMessage(text, type = "") {
  message.textContent = text;
  message.className = "message";

  if (type) {
    message.classList.add(type);
  }
}

// Atualiza as tentativas restantes na tela
function updateAttempts() {
  const attemptsLeft = 3 - wrongAttempts;

  attemptsText.innerHTML = `Tentativas restantes: <strong>${attemptsLeft}</strong>`;
}

// Limpa o código digitado
function clearCode() {
  typedCode = "";
  updateDisplay();
}

// Faz o card tremer quando houver erro
function shakeCard() {
  safeCard.classList.remove("shake");

  setTimeout(() => {
    safeCard.classList.add("shake");
  }, 10);
}

// Desativa ou ativa os botões da interface
function setButtonsDisabled(disabled) {
  keys.forEach((key) => {
    key.disabled = disabled;
  });

  openButton.disabled = disabled;
}

// Animação visual do botão clicado
function animateKeyClick(key) {
  key.classList.remove("clicked");

  setTimeout(() => {
    key.classList.add("clicked");
  }, 10);
}

// Bloqueia o cofre por 15 segundos
function lockSafe() {
  isLocked = true;

  clearCode();
  setButtonsDisabled(true);
  lockScreen.classList.add("active");

  showMessage("Cofre bloqueado por segurança.", "error");

  let seconds = 15;
  countdownText.textContent = seconds;

  playEmergencySound();

  countdownInterval = setInterval(() => {
    seconds--;
    countdownText.textContent = seconds;

    playEmergencySound();

    if (seconds <= 0) {
      unlockSafeAfterCooldown();
    }
  }, 1000);
}

// Libera o cofre depois do bloqueio
function unlockSafeAfterCooldown() {
  clearInterval(countdownInterval);

  isLocked = false;
  wrongAttempts = 0;

  lockScreen.classList.remove("active");
  setButtonsDisabled(false);
  updateAttempts();

  showMessage("Cofre liberado. Tente novamente.", "warning");
}

// Cria animação de dinheiro saindo do cofre
function createMoneyAnimation() {
  moneyBox.innerHTML = "";

  for (let i = 0; i < 28; i++) {
    const money = document.createElement("span");

    money.classList.add("money");
    money.textContent = i % 2 === 0 ? "💵" : "💲";

    const randomX = `${Math.floor(Math.random() * 320 - 160)}px`;
    const randomY = `${Math.floor(Math.random() * -260 - 90)}px`;
    const randomRotation = `${Math.floor(Math.random() * 240 - 120)}deg`;
    const delay = `${Math.random() * 0.45}s`;

    money.style.setProperty("--money-x", randomX);
    money.style.setProperty("--money-y", randomY);
    money.style.setProperty("--money-r", randomRotation);
    money.style.animationDelay = delay;

    moneyBox.appendChild(money);
  }

  setTimeout(() => {
    moneyBox.innerHTML = "";
  }, 2600);
}

// Animação completa quando o usuário acerta
function openSafeSuccess() {
  isLocked = true;

  showMessage("Senha correta! Cofre destravado.", "success");
  playSuccessSound();

  safeCard.classList.add("opened");
  setButtonsDisabled(true);

  createMoneyAnimation();

  setTimeout(() => {
    showMessage("Cofre aberto com sucesso!", "success");
  }, 700);
}

// Valida o código digitado
function validateCode() {
  if (isLocked) {
    return;
  }

  playOpenAttemptSound();

  if (typedCode.length < 4) {
    showMessage("Digite os 4 dígitos antes de abrir.", "warning");
    shakeCard();
    return;
  }

  if (typedCode === correctCode) {
    openSafeSuccess();
    return;
  }

  wrongAttempts++;

  playErrorSound();
  shakeCard();
  clearCode();
  updateAttempts();

  if (wrongAttempts >= 3) {
    showMessage("Sistema de segurança ativado.", "error");

    setTimeout(() => {
      lockSafe();
    }, 450);

    return;
  }

  showMessage("Senha incorreta. Tente novamente.", "error");
}

// Captura o clique em cada número do teclado
keys.forEach((key) => {
  key.addEventListener("click", () => {
    if (isLocked) {
      return;
    }

    const number = key.dataset.number;

    playKeySound();
    animateKeyClick(key);

    if (typedCode.length >= 4) {
      showMessage("O código já possui 4 dígitos.", "warning");
      return;
    }

    typedCode += number;

    updateDisplay();

    if (typedCode.length === 4) {
      showMessage("Código completo. Clique em destravar.", "warning");
      return;
    }

    showMessage("Digitando código...", "");
  });
});

// Captura o clique no botão principal
openButton.addEventListener("click", validateCode);

// Estado inicial da interface
updateDisplay();
updateAttempts();