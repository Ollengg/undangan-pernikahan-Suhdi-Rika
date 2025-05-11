document.addEventListener("DOMContentLoaded", function () {
  // Scroll otomatis ke elemen #hero saat halaman dimuat
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: "auto" }); // Scroll langsung tanpa animasi
    heroSection.classList.add("fade-in"); // Tambahkan animasi
  }

  // **Countdown Timer**
  const eventDate = new Date("2025-05-18T00:00:00").getTime();

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement && hoursElement && minutesElement && secondsElement) {
      daysElement.textContent = days;
      hoursElement.textContent = hours;
      minutesElement.textContent = minutes;
      secondsElement.textContent = seconds;
    }

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      const countdownElement = document.getElementById("countdown");
      if (countdownElement) {
        countdownElement.innerHTML = "<p>Acara telah dimulai!</p>";
      }
    }
  }, 1000);

  // **Tombol "Lihat Undangan"**
  const viewInvitationButton = document.getElementById("viewInvitation");
  if (viewInvitationButton) {
    viewInvitationButton.addEventListener("click", function () {
      // Scroll halus ke bagian undangan
      const coupleSection = document.getElementById("couple");
      if (coupleSection) {
        coupleSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // **Smooth Scroll untuk Slide Menu**
  const menuLinks = document.querySelectorAll(".side-menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah perilaku default link

      const targetId = this.getAttribute("href").substring(1); // Ambil ID target
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" }); // Scroll halus ke elemen target
      }
    });
  });

  // **Animasi untuk Elemen**

  // **Musik**
  const music = document.getElementById("bgMusic");
  if (music) {
    // Atur volume musik
    music.volume = 0.3;

    // Tambahkan tombol kontrol musik
    const musicButton = document.createElement("button");
    musicButton.innerHTML = '<i class="bi bi-music-note"></i> Play Music';
    musicButton.className = "music-toggle btn btn-sm btn-outline-light";
    musicButton.style.position = "fixed";
    musicButton.style.bottom = "50px";
    musicButton.style.left = "20px";
    musicButton.style.zIndex = "1000";
    document.body.appendChild(musicButton);

    let musicPlaying = false;

    // Event listener untuk tombol musik
    musicButton.addEventListener("click", function () {
      if (musicPlaying) {
        music.pause();
        musicButton.innerHTML = '<i class="bi bi-music-note"></i> Play Music';
      } else {
        music
          .play()
          .then(() => {
            musicPlaying = true;
            musicButton.innerHTML = '<i class="bi bi-pause"></i> Pause Music';
          })
          .catch((error) => {
            console.error("Gagal memutar musik:", error);
            alert("Silakan klik izinkan autoplay jika diminta browser");
          });
      }
      musicPlaying = !musicPlaying;
    });

    // Pastikan musik diputar setelah interaksi pengguna
    document.body.addEventListener("click", function firstClick() {
      music.play().catch((error) => {
        console.error("Gagal memutar musik:", error);
      });
      document.body.removeEventListener("click", firstClick);
    });
  }

  // **RSVP Form**
  const sendButton = document.getElementById("sendButton");
  if (sendButton) {
    sendButton.addEventListener("click", function () {
      const name = document.querySelector(".rsvp-form input").value;
      const attendance = document.querySelector(".rsvp-form select").value;

      const phoneNumber = "6281241569795"; // Format: kode negara + nomor (tanpa "+")
      const message = `Halo, saya ${name}. Saya ingin mengonfirmasi bahwa saya ${
        attendance === "hadir" ? "akan hadir" : "tidak bisa hadir"
      } di acara pernikahan.`;

      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappURL, "_blank");
    });
  }
});

function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    // Salin teks ke clipboard
    navigator.clipboard
      .writeText(element.textContent)
      .then(() => {
        alert("Teks berhasil disalin ke clipboard!");
      })
      .catch((error) => {
        console.error("Gagal menyalin teks:", error);
        alert("Gagal menyalin teks. Silakan coba lagi.");
      });
  } else {
    alert("Elemen teks untuk disalin tidak ditemukan.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const sideMenu = document.querySelector(".side-menu");
  const heroSection = document.getElementById("hero");

  if (sideMenu && heroSection) {
    // Fungsi untuk mengontrol visibilitas side-menu
    const toggleSideMenu = () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;

      if (heroBottom <= 0) {
        // Jika halaman sudah scroll melewati hero, tampilkan side-menu
        sideMenu.style.display = "block";
      } else {
        // Jika masih di halaman hero, sembunyikan side-menu
        sideMenu.style.display = "none";
      }
    };

    // Jalankan fungsi saat halaman di-scroll
    window.addEventListener("scroll", toggleSideMenu);

    // Jalankan fungsi saat halaman dimuat
    toggleSideMenu();
  }
});

