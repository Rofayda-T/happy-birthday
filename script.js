document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");

  // ==========================================
  // 1. ENVELOPE OPEN & MAIN SCREEN REVEAL
  // ==========================================
  const envelopeScreen = document.getElementById("envelope-screen");
  const openEnvelopeBtn = document.getElementById("open-envelope-btn");
  const mainContent = document.getElementById("main-content");

  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener("click", () => {
  // Save flag in browser session so we know the envelope was opened
  sessionStorage.setItem("envelopeOpened", "true");

  if (bgMusic) {
    bgMusic.play().catch(() => console.log("Audio autoplay restriction handled"));
  }

  if (typeof confetti === "function") {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  }

      // Trigger Confetti
      if (typeof confetti === "function") {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      // Hide Envelope, Reveal Main Site
      if (envelopeScreen) envelopeScreen.classList.add("hidden");
      if (mainContent) mainContent.classList.remove("hidden");
    });
  }

  // ==========================================
  // 2. LIVE LYRICS SYNCHRONIZATION LOGIC
  // ==========================================
  const lyricLines = document.querySelectorAll(".lyric-line");
  const lyricsScreen = document.getElementById("lyrics-screen");
  let currentActiveIndex = -1;

  if (bgMusic && lyricLines.length > 0 && lyricsScreen) {
    bgMusic.addEventListener("timeupdate", () => {
      const currentTime = bgMusic.currentTime;
      let activeIndex = -1;

      lyricLines.forEach((line, index) => {
        const time = parseFloat(line.getAttribute("data-time"));
        if (currentTime >= time) {
          activeIndex = index;
        }
      });

      if (activeIndex !== -1 && activeIndex !== currentActiveIndex) {
        currentActiveIndex = activeIndex;

        lyricLines.forEach((line) => line.classList.remove("active"));

        const activeLine = lyricLines[activeIndex];
        activeLine.classList.add("active");

        const containerTop = lyricsScreen.offsetTop;
        const lineTop = activeLine.offsetTop;

        lyricsScreen.scrollTo({
          top: lineTop - containerTop - 40,
          behavior: "smooth"
        });
      }
    });
  }

  // ==========================================
  // 3. IMAGE POPUP MODAL HELPER
  // ==========================================
  const imageModal = document.getElementById('image-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function showPicturePopup(imagePath) {
    const modalImg = document.getElementById('modal-img');
    
    if (imageModal && modalImg) {
      modalImg.src = imagePath;
      imageModal.classList.remove('hidden');
    }
  }

  if (modalCloseBtn && imageModal) {
    modalCloseBtn.addEventListener('click', () => {
      imageModal.classList.add('hidden');
    });
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target.id === 'image-modal') {
        imageModal.classList.add('hidden');
      }
    });
  }

  // ==========================================
  // 4. MODAL 2: SHAKE SHACK LOGIC
  // ==========================================
  const shakeShackBtn = document.getElementById("cake-modal-trigger");
  const cakeModal = document.getElementById("cake-modal");
  const closeCake = document.getElementById("close-cake");
  const burgerBites = document.querySelectorAll(".burger-bite");
  const fryBatches = document.querySelectorAll(".fry-batch");
  const sipLayers = document.querySelectorAll(".sip-layer");
  const burgerStatus = document.getElementById("burger-status");
  const friesStatus = document.getElementById("fries-status");
  const drinkStatus = document.getElementById("drink-status");

  let burgerCount = burgerBites.length;
  let friesCount = fryBatches.length;
  let drinkCount = sipLayers.length;

  function checkIfFinished() {
    if (burgerCount === 0 && friesCount === 0 && drinkCount === 0) {
      showPicturePopup('Images/photo8.jpeg');
    }
  }

  if (shakeShackBtn && cakeModal) {
    shakeShackBtn.addEventListener("click", () => {
      cakeModal.classList.remove("hidden");
      showPicturePopup('Images/photo7.jpeg');
    });
  }

  if (closeCake && cakeModal) {
    closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));
  }

  if (burgerBites.length > 0) {
    burgerBites.forEach((bite) => {
      bite.addEventListener("click", (e) => {
        const elem = e.currentTarget;
        if (elem.style.display !== "none") {
          elem.style.display = "none";
          burgerCount--;
          if (burgerStatus) {
            burgerStatus.textContent = burgerCount > 0 ? `${burgerCount} bites left` : "Burger finished! 😋";
          }
          checkIfFinished();
        }
      });
    });
  }

  if (fryBatches.length > 0) {
    fryBatches.forEach((batch) => {
      batch.addEventListener("click", (e) => {
        const elem = e.currentTarget;
        if (elem.style.display !== "none") {
          elem.style.display = "none";
          friesCount--;
          if (friesStatus) {
            friesStatus.textContent = friesCount > 0 ? `${friesCount} handfuls left` : "Fries all gone! 🍟";
          }
          checkIfFinished();
        }
      });
    });
  }

  if (sipLayers.length > 0) {
    sipLayers.forEach((layer) => {
      layer.addEventListener("click", (e) => {
        const elem = e.currentTarget;
        if (elem.style.display !== "none") {
          elem.style.display = "none";
          drinkCount--;
          if (drinkStatus) {
            drinkStatus.textContent = drinkCount > 0 ? `${drinkCount} sips left` : "Cup empty! 🥤";
          }
          checkIfFinished();
        }
      });
    });
  }

  // ==========================================
  // 5. MODAL 3: BOUQUET & POLAROID LOGIC
  // ==========================================
  const flowersTrigger = document.getElementById("flowers-modal-trigger");
  const flowersModal = document.getElementById("flowers-modal");
  const closeFlowers = document.getElementById("close-flowers");
  const flowers = document.querySelectorAll(".interactive-flower");
  const polaroidWrapper = document.getElementById("polaroid-wrapper");
  const polaroidCard = document.getElementById("polaroid-card");
  const polaroidImg = document.getElementById("polaroid-img");
  const polaroidDate = document.getElementById("polaroid-date");
  const polaroidMsg = document.getElementById("polaroid-msg");

  if (flowersTrigger && flowersModal) {
    flowersTrigger.addEventListener("click", () => flowersModal.classList.remove("hidden"));
  }
  if (closeFlowers && flowersModal) {
    closeFlowers.addEventListener("click", () => flowersModal.classList.add("hidden"));
  }

  if (flowers && flowers.length > 0) {
    flowers.forEach((flower) => {
      flower.addEventListener("click", () => {
        if (polaroidImg) polaroidImg.src = flower.getAttribute("data-photo");
        if (polaroidDate) polaroidDate.textContent = flower.getAttribute("data-date");
        if (polaroidMsg) polaroidMsg.textContent = flower.getAttribute("data-msg");

        if (polaroidCard) polaroidCard.classList.remove("flipped");
        if (polaroidWrapper) polaroidWrapper.classList.remove("hidden");
      });
    });
  }

  if (polaroidWrapper && polaroidCard) {
    polaroidWrapper.addEventListener("click", () => polaroidCard.classList.toggle("flipped"));
  }

  // ==========================================
  // 6. MODAL 4: VINTAGE CAMERA & VIDEO LOGIC
  // ==========================================
  const cameraTrigger = document.getElementById("camera-modal-trigger");
  const cameraModal = document.getElementById("camera-modal");
  const closeCamera = document.getElementById("close-camera");
  const shutterBtn = document.getElementById("shutter-btn");
  const cameraBody = document.getElementById("camera-body");
  const videoFrame = document.getElementById("video-display-frame");
  const cameraVideo = document.getElementById("camera-video");
  const redShutter = document.getElementById('red-shutter');
  const closeCamBtn = document.getElementById('close-cam-btn');
  const camWindow = document.getElementById('cam-window');
  const camVideo = document.getElementById('cam-video');

  // Guarded Red Shutter Click Listener
  if (redShutter) {
    redShutter.addEventListener('click', () => {
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
      }

      if (camWindow) {
        camWindow.style.display = 'block';
      }

      if (camVideo) {
        camVideo.currentTime = 0;
        camVideo.play().catch(() => {});
      }
    });
  }

  // Guarded Close Button Click Listener
  if (closeCamBtn) {
    closeCamBtn.addEventListener('click', () => {
      if (camVideo) {
        camVideo.pause();
      }

      if (camWindow) {
        camWindow.style.display = 'none';
      }

      if (bgMusic) {
        bgMusic.play().catch(error => {
          console.log("Autoplay check or audio playback error:", error);
        });
      }
    });
  }

  if (cameraTrigger && cameraModal) {
    cameraTrigger.addEventListener("click", () => {
      cameraModal.classList.remove("hidden");
      if (cameraBody) cameraBody.classList.remove("hidden");
      if (videoFrame) videoFrame.classList.add("hidden");
    });
  }

  if (closeCamera && cameraModal) {
    closeCamera.addEventListener("click", () => {
      cameraModal.classList.add("hidden");
      if (cameraVideo) cameraVideo.pause();
    });
  }

  if (shutterBtn) {
    shutterBtn.addEventListener("click", () => {
      if (cameraBody) cameraBody.classList.add("camera-flash");

      setTimeout(() => {
        if (cameraBody) {
          cameraBody.classList.remove("camera-flash");
          cameraBody.classList.add("hidden");
        }
        if (videoFrame) videoFrame.classList.remove("hidden");
        if (cameraVideo) cameraVideo.play().catch(() => {});
      }, 400);
    });
  }
});
// Add this at the bottom of your main script file
// Automatically check state when returning from demo.html
window.addEventListener('pageshow', (event) => {
  // event.persisted is true when navigating back/forward from cache
  const isOpened = sessionStorage.getItem("envelopeOpened") === "true";
  const bgMusic = document.getElementById('bg-music');

  // Only attempt play if the envelope was already opened AND page loaded from back navigation
  if (event.persisted && isOpened && bgMusic && bgMusic.paused) {
    bgMusic.play().catch(error => {
      console.log("Audio resume error:", error);
    });
  }
});
