const correctCode = "2026";

let typedCode = "";
let wrongAttempts = 0;
let isLocked = false;
let isSoundEnabled = true;
let countdownInterval = null;
let moneyRainInterval = null;
let currentRiddleStep = 0;
let riddleSolvedSteps = [false, false, false, false, false];

const riddleAnswers = ["2", "0", "2", "6", correctCode];

const keys = document.querySelectorAll(".key");
const slots = document.querySelectorAll(".code-slot");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attemptsText");
const openButton = document.getElementById("openButton");
const resetButton = document.getElementById("resetButton");
const soundButton = document.getElementById("soundButton");
const safeCard = document.getElementById("safeCard");
const codeDisplay = document.getElementById("codeDisplay");
const lockScreen = document.getElementById("lockScreen");
const countdownText = document.getElementById("countdownText");
const moneyBox = document.getElementById("moneyBox");
const piggyBox = document.getElementById("piggyBox");
const moneyRainBox = document.getElementById("moneyRainBox");
const successMusic = document.getElementById("successMusic");
const attemptDots = document.querySelectorAll(".attempt-dot");

const hintButton = document.getElementById("hintButton");
const riddleModal = document.getElementById("riddleModal");
const closeRiddleButton = document.getElementById("closeRiddleButton");
const previousRiddleButton = document.getElementById("previousRiddleButton");
const checkRiddleButton = document.getElementById("checkRiddleButton");
const nextRiddleButton = document.getElementById("nextRiddleButton");
const riddleSteps = document.querySelectorAll(".riddle-step");
const progressSteps = document.querySelectorAll(".progress-step");
const progressLines = document.querySelectorAll(".progress-line");
const riddleAnswerInput = document.getElementById("riddleAnswerInput");
const riddleFeedback = document.getElementById("riddleFeedback");
const answerLabel = document.getElementById("answerLabel");

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

// Aqui eu crio sons simples com JavaScript, sem precisar de arquivos de áudio
function playTone(frequency, duration, type = "sine", volume = 0.08) {
  if (!isSoundEnabled) {
    return;
  }

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

function playKeySound() {
  playTone(620, 0.07, "sine", 0.05);
}

function playOpenAttemptSound() {
  playTone(340, 0.09, "triangle", 0.06);

  setTimeout(() => {
    playTone(460, 0.09, "triangle", 0.06);
  }, 90);
}

function playErrorSound() {
  playTone(180, 0.12, "sawtooth", 0.08);

  setTimeout(() => {
    playTone(130, 0.16, "sawtooth", 0.08);
  }, 120);
}

function playSuccessSound() {
  const notes = [520, 660, 780, 980, 1180];

  notes.forEach((note, index) => {
    setTimeout(() => {
      playTone(note, 0.13, "sine", 0.08);
    }, index * 110);
  });
}

function playEmergencySound() {
  playTone(780, 0.18, "square", 0.06);

  setTimeout(() => {
    playTone(420, 0.18, "square", 0.06);
  }, 190);
}

function playResetSound() {
  playTone(520, 0.08, "triangle", 0.05);

  setTimeout(() => {
    playTone(390, 0.08, "triangle", 0.05);
  }, 90);
}

function updateDisplay() {
  slots.forEach((slot, index) => {
    const digit = typedCode[index];

    slot.textContent = digit ? "•" : "";
    slot.classList.toggle("filled", Boolean(digit));
  });
}

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = "message";

  if (type) {
    message.classList.add(type);
  }
}

function updateAttempts() {
  const attemptsLeft = 3 - wrongAttempts;

  attemptsText.innerHTML = `Tentativas restantes: <strong>${attemptsLeft}</strong>`;

  attemptDots.forEach((dot, index) => {
    dot.className = "attempt-dot";

    if (index < wrongAttempts) {
      dot.classList.add("failed");
    }
  });
}

function flashDisplay(type) {
  codeDisplay.classList.remove("display-error", "display-success");

  const className = type === "success" ? "display-success" : "display-error";

  codeDisplay.classList.add(className);

  setTimeout(() => {
    codeDisplay.classList.remove(className);
  }, 650);
}

function clearCode() {
  typedCode = "";
  updateDisplay();
}

function shakeCard() {
  safeCard.classList.remove("shake");

  setTimeout(() => {
    safeCard.classList.add("shake");
  }, 10);
}

function setButtonsDisabled(disabled) {
  keys.forEach((key) => {
    key.disabled = disabled;
  });

  openButton.disabled = disabled;
}

function animateKeyClick(key) {
  key.classList.remove("clicked");

  setTimeout(() => {
    key.classList.add("clicked");
  }, 10);
}


function toggleSound() {
  isSoundEnabled = !isSoundEnabled;

  soundButton.classList.toggle("muted", !isSoundEnabled);

  soundButton.innerHTML = isSoundEnabled
    ? '<i class="fa-solid fa-volume-high"></i>'
    : '<i class="fa-solid fa-volume-xmark"></i>';

  soundButton.setAttribute(
    "aria-label",
    isSoundEnabled ? "Som ativado" : "Som desativado"
  );

  if (!isSoundEnabled) {
    stopSuccessMusic();
    return;
  }

  playTone(660, 0.08, "sine", 0.05);
}

function typeNumber(number) {
  if (isLocked) {
    return;
  }

  if (typedCode.length >= 4) {
    showMessage("O código já possui 4 dígitos.", "warning");
    return;
  }

  typedCode += number;

  updateDisplay();
  playKeySound();

  const keyButton = document.querySelector(`[data-number="${number}"]`);

  if (keyButton) {
    animateKeyClick(keyButton);
  }

  if (typedCode.length === 4) {
    showMessage("Código completo. Pressione Enter ou clique em destravar.", "warning");
    return;
  }

  showMessage("Digitando código...", "");
}

function removeLastDigit() {
  if (isLocked || typedCode.length === 0) {
    return;
  }

  typedCode = typedCode.slice(0, -1);

  updateDisplay();
  showMessage("Último dígito removido.", "warning");
}

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

function unlockSafeAfterCooldown() {
  clearInterval(countdownInterval);

  isLocked = false;
  wrongAttempts = 0;

  lockScreen.classList.remove("active");
  setButtonsDisabled(false);
  updateAttempts();

  showMessage("Cofre liberado. Tente novamente.", "warning");
}

function createMoneyAnimation() {
  moneyBox.innerHTML = "";

  for (let i = 0; i < 32; i++) {
    const money = document.createElement("span");

    money.classList.add("money");
    money.textContent = i % 2 === 0 ? "💵" : "💲";

    const randomX = `${Math.floor(Math.random() * 340 - 170)}px`;
    const randomY = `${Math.floor(Math.random() * -280 - 90)}px`;
    const randomRotation = `${Math.floor(Math.random() * 260 - 130)}deg`;
    const delay = `${Math.random() * 0.45}s`;

    money.style.setProperty("--money-x", randomX);
    money.style.setProperty("--money-y", randomY);
    money.style.setProperty("--money-r", randomRotation);
    money.style.animationDelay = delay;

    moneyBox.appendChild(money);
  }

  setTimeout(() => {
    moneyBox.innerHTML = "";
  }, 2800);
}

function createPiggyAnimation() {
  piggyBox.innerHTML = "";

  for (let i = 0; i < 14; i++) {
    const piggy = document.createElement("span");

    piggy.classList.add("piggy");
    piggy.textContent = i % 2 === 0 ? "🐷" : "🐖";

    const randomX = `${Math.floor(Math.random() * 300 - 150)}px`;
    const randomY = `${Math.floor(Math.random() * -240 - 70)}px`;
    const randomRotation = `${Math.floor(Math.random() * 180 - 90)}deg`;
    const delay = `${Math.random() * 0.5 + 0.15}s`;

    piggy.style.setProperty("--piggy-x", randomX);
    piggy.style.setProperty("--piggy-y", randomY);
    piggy.style.setProperty("--piggy-r", randomRotation);
    piggy.style.animationDelay = delay;

    piggyBox.appendChild(piggy);
  }

  const heroPiggy = document.createElement("div");

  heroPiggy.classList.add("hero-piggy");
  heroPiggy.textContent = "🐷";

  piggyBox.appendChild(heroPiggy);

  setTimeout(() => {
    piggyBox.innerHTML = "";
  }, 2800);
}

function startSuccessMusic() {
  if (!isSoundEnabled || !successMusic) {
    return;
  }

  successMusic.currentTime = 0;
  successMusic.volume = 0.55;

  successMusic.play().catch(() => {
    showMessage("Cofre aberto! O navegador bloqueou a música automática.", "success");
  });
}

function stopSuccessMusic() {
  if (!successMusic) {
    return;
  }

  successMusic.pause();
  successMusic.currentTime = 0;
}

function createMoneyRainDrop() {
  const money = document.createElement("span");

  money.classList.add("money-rain");
  money.textContent = Math.random() > 0.35 ? "💵" : "💸";

  const randomLeft = `${Math.random() * 100}%`;
  const randomDuration = `${Math.random() * 2.4 + 3.2}s`;
  const randomRotation = `${Math.floor(Math.random() * 420 - 210)}deg`;

  money.style.left = randomLeft;
  money.style.setProperty("--rain-duration", randomDuration);
  money.style.setProperty("--rain-rotation", randomRotation);

  moneyRainBox.appendChild(money);

  setTimeout(() => {
    money.remove();
  }, 6500);
}

function startMoneyRain() {
  moneyRainBox.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      createMoneyRainDrop();
    }, i * 90);
  }

  moneyRainInterval = setInterval(() => {
    for (let i = 0; i < 4; i++) {
      createMoneyRainDrop();
    }
  }, 420);
}

function stopMoneyRain() {
  clearInterval(moneyRainInterval);
  moneyRainInterval = null;
  moneyRainBox.innerHTML = "";
}

function openSafeSuccess() {
  isLocked = true;

  flashDisplay("success");
  showMessage("Senha correta! Cofre destravado.", "success");

  playSuccessSound();
  startSuccessMusic();

  safeCard.classList.add("opened");
  setButtonsDisabled(true);

  createMoneyAnimation();
  createPiggyAnimation();
  startMoneyRain();

  setTimeout(() => {
    showMessage("Cofre aberto com sucesso!", "success");
    resetButton.classList.add("visible");
  }, 900);
}

function validateCode() {
  if (isLocked) {
    return;
  }

  playOpenAttemptSound();

  if (typedCode.length < 4) {
    showMessage("Digite os 4 dígitos antes de abrir.", "warning");
    flashDisplay("error");
    shakeCard();
    return;
  }

  if (typedCode === correctCode) {
    openSafeSuccess();
    return;
  }

  wrongAttempts++;

  playErrorSound();
  flashDisplay("error");
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

function resetSafe() {
  typedCode = "";
  wrongAttempts = 0;
  isLocked = false;

  clearInterval(countdownInterval);

  stopMoneyRain();
  stopSuccessMusic();

  safeCard.classList.remove("opened", "shake");
  lockScreen.classList.remove("active");
  resetButton.classList.remove("visible");

  moneyBox.innerHTML = "";
  piggyBox.innerHTML = "";

  setButtonsDisabled(false);
  updateDisplay();
  updateAttempts();
  resetRiddleModal();

  showMessage("Cofre reiniciado. Digite o código.", "warning");
  playResetSound();
}

function openRiddleModal() {
  riddleModal.classList.add("active");
  currentRiddleStep = 0;
  updateRiddleView();
  showRiddleFeedback("Resolva o primeiro enigma para continuar.", "");

  setTimeout(() => {
    riddleAnswerInput.focus();
  }, 120);
}

function closeRiddleModal() {
  riddleModal.classList.remove("active");
}

function showRiddleFeedback(text, type = "") {
  riddleFeedback.textContent = text;
  riddleFeedback.className = "riddle-feedback";

  if (type) {
    riddleFeedback.classList.add(type);
  }
}

function updateRiddleProgress() {
  progressSteps.forEach((step, index) => {
    step.classList.remove("active", "done");

    if (riddleSolvedSteps[index]) {
      step.classList.add("done");
    }

    if (index === currentRiddleStep) {
      step.classList.add("active");
    }
  });

  progressLines.forEach((line, index) => {
    line.classList.toggle("done", riddleSolvedSteps[index]);
  });
}

function updateRiddleView() {
  riddleSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentRiddleStep);
  });

  const isFinalStep = currentRiddleStep === riddleAnswers.length - 1;

  answerLabel.textContent = isFinalStep ? "Senha descoberta" : "Resposta do enigma";
  riddleAnswerInput.value = "";
  riddleAnswerInput.className = "";
  riddleAnswerInput.maxLength = isFinalStep ? 4 : 2;
  riddleAnswerInput.placeholder = isFinalStep ? "Digite a chave final" : "Digite sua resposta";

  previousRiddleButton.disabled = currentRiddleStep === 0;
  nextRiddleButton.disabled = !riddleSolvedSteps[currentRiddleStep];

  checkRiddleButton.innerHTML = isFinalStep
    ? '<i class="fa-solid fa-key"></i><span>Confirmar</span>'
    : '<i class="fa-solid fa-magnifying-glass"></i><span>Verificar</span>';

  nextRiddleButton.innerHTML = isFinalStep
    ? '<span>Fechar</span><i class="fa-solid fa-check"></i>'
    : '<span>Próximo</span><i class="fa-solid fa-arrow-right"></i>';

  updateRiddleProgress();
}

function checkCurrentRiddle() {
  const answer = riddleAnswerInput.value.trim();
  const correctAnswer = riddleAnswers[currentRiddleStep];
  const isFinalStep = currentRiddleStep === riddleAnswers.length - 1;

  riddleAnswerInput.classList.remove("correct", "wrong");

  if (answer !== correctAnswer) {
    riddleAnswerInput.classList.add("wrong");

    showRiddleFeedback(
      isFinalStep
        ? "Ainda não é essa a chave final. Pense na ordem dos enigmas."
        : "Resposta incorreta. Revise o cálculo e tente novamente.",
      "error"
    );

    playErrorSound();
    return;
  }

  riddleSolvedSteps[currentRiddleStep] = true;
  riddleAnswerInput.classList.add("correct");
  nextRiddleButton.disabled = false;

  if (isFinalStep) {
    typedCode = correctCode;
    updateDisplay();
    showMessage("Senha descoberta. Digite o código no cofre.", "success");
    showRiddleFeedback("Senha descoberta: 2026. Agora volte ao cofre e destrave.", "success");
    playSuccessSound();

    setTimeout(() => {
      closeRiddleModal();
    }, 1400);

    updateRiddleProgress();
    return;
  }

  showRiddleFeedback("Resposta correta. O próximo enigma foi liberado.", "success");
  playSuccessSound();
  updateRiddleProgress();
}

function goToNextRiddle() {
  if (!riddleSolvedSteps[currentRiddleStep]) {
    showRiddleFeedback("Verifique a resposta antes de avançar.", "warning");
    return;
  }

  if (currentRiddleStep === riddleAnswers.length - 1) {
    closeRiddleModal();
    return;
  }

  currentRiddleStep++;
  updateRiddleView();

  const isFinalStep = currentRiddleStep === riddleAnswers.length - 1;

  showRiddleFeedback(
    isFinalStep
      ? "Enigma final desbloqueado. Descubra a chave completa."
      : `Enigma ${currentRiddleStep + 1} liberado.`,
    isFinalStep ? "success" : ""
  );

  setTimeout(() => {
    riddleAnswerInput.focus();
  }, 80);
}

function goToPreviousRiddle() {
  if (currentRiddleStep === 0) {
    return;
  }

  currentRiddleStep--;
  updateRiddleView();
  showRiddleFeedback("Você voltou para o enigma anterior.", "warning");

  setTimeout(() => {
    riddleAnswerInput.focus();
  }, 80);
}

function resetRiddleModal() {
  currentRiddleStep = 0;
  riddleSolvedSteps = [false, false, false, false, false];
  riddleAnswerInput.value = "";
  riddleAnswerInput.className = "";
  showRiddleFeedback("", "");
  updateRiddleView();
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const number = key.dataset.number;

    typeNumber(number);
  });
});

openButton.addEventListener("click", () => {
  validateCode();
});

resetButton.addEventListener("click", resetSafe);
soundButton.addEventListener("click", toggleSound);
hintButton.addEventListener("click", openRiddleModal);
closeRiddleButton.addEventListener("click", closeRiddleModal);
previousRiddleButton.addEventListener("click", goToPreviousRiddle);
checkRiddleButton.addEventListener("click", checkCurrentRiddle);
nextRiddleButton.addEventListener("click", goToNextRiddle);

riddleModal.addEventListener("click", (event) => {
  if (event.target === riddleModal) {
    closeRiddleModal();
  }
});

riddleAnswerInput.addEventListener("input", () => {
  const limit = currentRiddleStep === riddleAnswers.length - 1 ? 4 : 2;
  riddleAnswerInput.value = riddleAnswerInput.value.replace(/\D/g, "").slice(0, limit);
  riddleAnswerInput.classList.remove("correct", "wrong");
});

riddleAnswerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkCurrentRiddle();
  }
});

document.addEventListener("keydown", (event) => {
  const target = event.target;

  if (target === riddleAnswerInput) {
    return;
  }

  if (isLocked) {
    return;
  }

  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    event.preventDefault();
    typeNumber(key);
    return;
  }

  if (key === "Enter") {
    event.preventDefault();
    validateCode();
    return;
  }

  if (key === "Backspace") {
    event.preventDefault();
    removeLastDigit();
    return;
  }

  if (key === "Escape") {
    event.preventDefault();
    clearCode();
    showMessage("Código limpo.", "warning");
  }
});



updateDisplay();
updateAttempts();
updateRiddleView();
