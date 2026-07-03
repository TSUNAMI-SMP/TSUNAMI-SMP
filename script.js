// ===== IPコピー =====
function copyIP() {
  const ipElement = document.getElementById("server-ip");
  const ip = ipElement ? ipElement.innerText : "tsunamismp.ddns.net";
  navigator.clipboard.writeText(ip);
  alert("サーバーIPをコピーしました！");
}

// ===== スクロールアニメーション =====
const reveals = document.querySelectorAll(".reveal");
function revealElements() {
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) element.classList.add("active");
  });
}
window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// ===== ヘッダー透明度変化 =====
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(5, 20, 35, 0.9)";
      header.style.boxShadow = "0 0 25px rgba(0,183,255,0.15)";
    } else {
      header.style.background = "rgba(5, 20, 35, 0.65)";
      header.style.boxShadow = "none";
    }
  });
}

// ===== タイトルふわふわ =====
const heroTitle = document.querySelector(".hero h1");
let floatOffset = 0;
function animateTitle() {
  if (!heroTitle) return;
  floatOffset += 0.02;
  heroTitle.style.transform = `translateY(${Math.sin(floatOffset) * 6}px)`;
  requestAnimationFrame(animateTitle);
}
animateTitle();

// ===== マウス追従光エフェクト =====
const light = document.createElement("div");
light.style.position = "fixed";
light.style.width = "300px";
light.style.height = "300px";
light.style.borderRadius = "50%";
light.style.pointerEvents = "none";
light.style.background = "radial-gradient(circle, rgba(0,183,255,0.12), transparent 70%)";
light.style.zIndex = "1";
document.body.appendChild(light);
document.addEventListener("mousemove", (e) => {
  light.style.left = (e.clientX - 150) + "px";
  light.style.top = (e.clientY - 150) + "px";
});

// ===== Minecraft Server Status =====
async function loadServerStatus() {
  const statusText = document.getElementById("server-status");
  const playerText = document.getElementById("server-players");
  if (!statusText || !playerText) return;

  try {
    const response = await fetch("https://api.mcsrvstat.us/3/tsunamismp.ddns.net");
    const data = await response.json();

    if (data.online === true) {
      statusText.innerHTML = "🟢 オンライン";
      playerText.innerHTML = data.players ? `${data.players.online} / ${data.players.max}` : "取得不可";
    } else {
      statusText.innerHTML = "🔴 オフライン";
      playerText.innerHTML = "-";
    }
  } catch (error) {
    statusText.innerHTML = "⚠️ 取得失敗";
    playerText.innerHTML = "-";
  }
}
loadServerStatus();
setInterval(loadServerStatus, 60000);

// ===== コマンド検索 =====
const searchInput = document.getElementById("commandSearch");
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".command-card").forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "" : "none";
    });

    document.querySelectorAll(".command-section").forEach(section => {
      const cards = section.querySelectorAll(".command-card");
      let visibleCount = 0;
      cards.forEach(card => {
        if (card.style.display !== "none") visibleCount++;
      });
      section.style.display = value === "" || visibleCount > 0 ? "" : "none";
    });
  });
}
