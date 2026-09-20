// ========================================
// DATA LOGIN
// ========================================

const emailBenar = "abdillah@gmail.com";
const sandiBenar = "123456";


// ========================================
// ELEMENT LOGIN
// ========================================

const loginPage = document.getElementById("loginPage");
const homePage = document.getElementById("homePage");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");
const togglePassword = document.getElementById("togglePassword");

const message = document.getElementById("message");

const logoutButton = document.getElementById("logoutButton");
const startButton = document.getElementById("startButton");


// ========================================
// TAMPILKAN / SEMBUNYIKAN PASSWORD
// ========================================

if (togglePassword) {
    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁";
        }

    });
}


// ========================================
// LOGIN
// ========================================

if (loginButton) {
    loginButton.addEventListener("click", function () {

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Email kosong
        if (email === "") {
            message.textContent = "⚠ Silakan masukkan email.";
            message.style.color = "#ff5c5c";
            emailInput.focus();
            return;
        }

        // Password kosong
        if (password === "") {
            message.textContent = "⚠ Silakan masukkan sandi.";
            message.style.color = "#ff5c5c";
            passwordInput.focus();
            return;
        }

        // Login benar
        if (
            email === emailBenar &&
            password === sandiBenar
        ) {

            message.textContent = "✓ Login berhasil!";
            message.style.color = "#22c55e";

            loginButton.textContent = "✓ BERHASIL";

            setTimeout(function () {

                loginPage.style.display = "none";
                homePage.style.display = "block";

                window.scrollTo(0, 0);

            }, 700);

        } else {

            message.textContent = "✕ Email atau sandi salah.";
            message.style.color = "#ff5c5c";

        }

    });
}


// ========================================
// ENTER UNTUK LOGIN
// ========================================

if (emailInput) {
    emailInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            loginButton.click();
        }

    });
}

if (passwordInput) {
    passwordInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            loginButton.click();
        }

    });
}


// ========================================
// LOGOUT
// ========================================

if (logoutButton) {
    logoutButton.addEventListener("click", function () {

        homePage.style.display = "none";
        loginPage.style.display = "flex";

        emailInput.value = "";
        passwordInput.value = "";

        message.textContent = "";

        loginButton.textContent = "MASUK";

        // Reset game
        resetGame();

    });
}


// ========================================
// TOMBOL MULAI WEBSITE
// ========================================

if (startButton) {
    startButton.addEventListener("click", function () {

        alert(
            "Halo! Selamat datang di website Abdillah Hakiki Herdiansyah 🚀"
        );

    });
}


// ========================================
// GAME DRAGON CATCH
// ========================================

const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");

const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");

const gameMessage = document.getElementById("gameMessage");

const gameStartButton = document.getElementById("gameStartButton");
const restartButton = document.getElementById("restartButton");

let level = 1;
let score = 0;
let lives = 3;

let gameStarted = false;
let timer = null;


// ========================================
// UPDATE INFORMASI GAME
// ========================================

function updateInfo() {

    if (levelText) {
        levelText.textContent = level;
    }

    if (scoreText) {
        scoreText.textContent = score;
    }

    if (livesText) {
        livesText.textContent = lives;
    }

}


// ========================================
// PINDAHKAN NAGA
// ========================================

function pindahkanTarget() {

    if (!target || !gameArea) return;

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;

    const maxX = Math.max(0, areaWidth - targetWidth);
    const maxY = Math.max(0, areaHeight - targetHeight);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";

}


// ========================================
// TIMER GAME
// ========================================

function mulaiTimer() {

    clearInterval(timer);

    // Semakin tinggi level, semakin cepat
    const kecepatan = Math.max(
        350,
        1200 - (level * 80)
    );

    timer = setInterval(function () {

        if (gameStarted) {
            pindahkanTarget();
        }

    }, kecepatan);

}


// ========================================
// MULAI GAME
// ========================================

function mulaiGame() {

    if (!target || !gameArea) return;

    level = 1;
    score = 0;
    lives = 3;

    gameStarted = true;

    updateInfo();

    target.style.display = "block";

    if (gameStartButton) {
        gameStartButton.style.display = "none";
    }

    if (restartButton) {
        restartButton.style.display = "inline-block";
    }

    if (gameMessage) {
        gameMessage.textContent =
            "🐉 Tangkap naga sebanyak mungkin!";
    }

    pindahkanTarget();
    mulaiTimer();

}


// ========================================
// NAGA BERHASIL DITANGKAP
// ========================================

if (target) {

    target.addEventListener("click", function () {

        if (!gameStarted) return;

        score += 10;

        // Setiap 50 skor naik level
        if (score % 50 === 0) {

            if (level < 10) {

                level++;

                if (gameMessage) {
                    gameMessage.textContent =
                        "🔥 LEVEL " + level + "!";
                }

                mulaiTimer();

            } else {

                menang();
                return;

            }

        }

        updateInfo();
        pindahkanTarget();

    });

}


// ========================================
// NAGA TERLEWAT
// ========================================

function nagaTerlewat() {

    if (!gameStarted) return;

    lives--;

    updateInfo();

    if (lives <= 0) {

        gameOver();

    } else {

        if (gameMessage) {
            gameMessage.textContent =
                "⚠ Naga terlewat! Sisa nyawa: " + lives;
        }

    }

}


// ========================================
// GAME MENANG
// ========================================

function menang() {

    gameStarted = false;

    clearInterval(timer);

    target.style.display = "none";

    if (gameMessage) {
        gameMessage.textContent =
            "🏆 SELAMAT! LEVEL 10 SELESAI!";
    }

    if (gameStartButton) {
        gameStartButton.textContent = "▶ MAIN LAGI";
        gameStartButton.style.display = "inline-block";
    }

}


// ========================================
// GAME OVER
// ========================================

function gameOver() {

    gameStarted = false;

    clearInterval(timer);

    target.style.display = "none";

    if (gameMessage) {
        gameMessage.textContent =
            "💀 GAME OVER! Skor: " + score;
    }

    if (gameStartButton) {
        gameStartButton.textContent = "▶ COBA LAGI";
        gameStartButton.style.display = "inline-block";
    }

}


// ========================================
// RESET GAME
// ========================================

function resetGame() {

    clearInterval(timer);

    level = 1;
    score = 0;
    lives = 3;

    gameStarted = false;

    updateInfo();

    if (target) {
        target.style.display = "none";
    }

    if (gameMessage) {
        gameMessage.textContent =
            "Tekan MULAI untuk bermain!";
    }

    if (gameStartButton) {
        gameStartButton.textContent = "▶ MULAI GAME";
        gameStartButton.style.display = "inline-block";
    }

    if (restartButton) {
        restartButton.style.display = "none";
    }

}


// ========================================
// TOMBOL MULAI GAME
// ========================================

if (gameStartButton) {

    gameStartButton.addEventListener("click", function () {
        mulaiGame();
    });

}


// ========================================
// TOMBOL ULANGI GAME
// ========================================

if (restartButton) {

    restartButton.addEventListener("click", function () {
        mulaiGame();
    });

}


// ========================================
// KONDISI AWAL GAME
// ========================================

resetGame();