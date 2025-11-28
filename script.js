const openBtn = document.getElementById("openBtn");
const opening = document.getElementById("opening");
const content = document.getElementById("content");

openBtn.onclick = () => {
    opening.style.opacity = "0";
    opening.style.transition = "0.8s";
    setTimeout(() => {
        opening.style.display = "none";
        content.classList.remove("hidden");
    }, 800);
};

document.addEventListener("DOMContentLoaded", function() {
    const box = document.querySelector(".gift-box");
    const explosion = document.querySelector(".explosion");
    const flower = document.querySelector(".flower");
    const flowerBucket = document.getElementById("flowerBucket");
    
    box.addEventListener("click", function () {
        const rect = box.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        createExplosion(x, y);

        // 1. Hilangkan box
        box.style.opacity = "0";
        box.style.transform = "scale(0.5)";
        setTimeout(() => box.classList.add("hidden"), 300);

        // 2. Ledakan muncul
        explosion.classList.remove("hidden");
        setTimeout(() => explosion.classList.add("show"), 50);

        // 3. Ledakan hilang
        setTimeout(() => {
            explosion.classList.remove("show");
            explosion.style.opacity = "0";
        }, 900);

        // 4. Bouquet muncul
        setTimeout(() => {
            flowerBucket.classList.add("show");
            flower.classList.remove("hidden");
            setTimeout(() => flower.classList.add("show"), 50);
        }, 500);
    });
});

// Explosion function
function createExplosion(x, y) {
    const container = document.querySelector(".particles");
    const shapes = ["❤️","✨","🎀","🌸","💖","⭐"];
    const glows  = ["#ff66cc", "#ff99dd", "#ffee88", "#88e3ff", "#ffd1dc"];

    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        p.textContent = shapes[Math.floor(Math.random()*shapes.length)];
        p.style.setProperty("--glow", glows[Math.floor(Math.random()*glows.length)]);
        container.appendChild(p);

        const angle = Math.random()*Math.PI*2;
        const distance = Math.random()*110 + 70;
        const duration = Math.random()*900 + 600;
        const destX = Math.cos(angle)*distance;
        const destY = Math.sin(angle)*distance*0.7;
        const rotate = Math.floor(Math.random()*360);

        p.animate([
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) rotate(${rotate}deg) scale(0.9)`, opacity: 0.9 }
        ], { duration: duration, easing: "cubic-bezier(0.3,0.15,0.25,1)", fill:"forwards"});

        setTimeout(() => {
            p.animate([
                { transform: `translate(${destX}px, ${destY}px) rotate(${rotate}deg) scale(0.9)`, opacity: 0.9 },
                { transform: `translate(${destX}px, ${destY+80}px) rotate(${rotate+40}deg) scale(0.5)`, opacity: 0 }
            ], { duration: 1200, easing: "ease-in", fill:"forwards"});
        }, duration-200);

        setTimeout(()=>p.remove(), duration+1500);
    }
}

// ==========================
// PLAY MUSIK ULTAH (BUTTON START)
// ==========================
document.getElementById("openBtn").addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    music.volume = 0.35;
    music.play().catch(err => console.log("Music blocked:", err));
});

// ==========================
// GIFT BOX EVENT
// ==========================
document.addEventListener("DOMContentLoaded", function() {

    const box          = document.querySelector(".gift-box");
    const explosion    = document.querySelector(".explosion");
    const flower       = document.querySelector(".flower");
    const flowerBucket = document.getElementById("flowerBucket");

    const boom1 = document.getElementById("boom1");  // ledakan
    const boom2 = document.getElementById("boom2");  // musik ucapan / efek tambahan


    // ====== Fungsi Suara ======
    function playBoom1() {
        boom1.currentTime = 0;
        boom1.volume = 1;
        boom1.play().catch(err => console.log("Sound 1 blocked:", err));
    }

    function playBoom2() {
        boom2.currentTime = 0;
        boom2.volume = 1;
        boom2.play().catch(err => console.log("Sound 2 blocked:", err));
    }


    // ====== Saat Box Di-Klik ======
    box.addEventListener("click", function () {

        // mainkan suara ledakan
        playBoom1();

        // ambil posisi tengah box
        const rect = box.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top  + rect.height / 2;

        // efek partikel custom
        createExplosion(x, y);

        // hilangkan box
        box.style.opacity = "0";
        box.style.transform = "scale(0.5)";
        setTimeout(() => box.classList.add("hidden"), 300);

        // ledakan visual muncul
        explosion.classList.remove("hidden");
        setTimeout(() => explosion.classList.add("show"), 50);

        // ledakan visual hilang
        setTimeout(() => {
            explosion.classList.remove("show");
            explosion.style.opacity = "0";
        }, 900);

        // bunga muncul belakangan
        setTimeout(() => {
            flowerBucket.classList.add("show");
            flower.classList.remove("hidden");

            setTimeout(() => flower.classList.add("show"), 50);
        }, 500);

        // play musik kedua setelah efek muncul
        setTimeout(() => playBoom2(), 800);
        
        // Ubah teks sesaat setelah diklik
        document.getElementById("tapText").textContent = "";

        // Setelah bucket bunga muncul
        setTimeout(() => {
            document.getElementById("tapText").textContent = "Bunganya online dulu yaa 💖 Semoga sayangg suka… 🌸";
        }, 800);
    });
});