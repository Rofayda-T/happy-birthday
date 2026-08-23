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
      // Play Background Audio
      if (bgMusic) {
        bgMusic.play().catch(() => console.log("Audio autoplay restriction handled"));
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
      envelopeScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
    });
  }

  // ==========================================
  // 2. LIVE LYRICS SYNCHRONIZATION LOGIC
  // ==========================================
  const lyricLines = document.querySelectorAll(".lyric-line");

  // This part is crucial for syncing the audio to the text
  if (bgMusic && lyricLines.length > 0) {
    bgMusic.addEventListener("timeupdate", () => {
      const currentTime = bgMusic.currentTime;
      let activeIndex = -1;

      // 1. Find the currently active lyric line
      lyricLines.forEach((line, index) => {
        const lineTime = parseFloat(line.getAttribute("data-time"));
        if (currentTime >= lineTime) {
          activeIndex = index;
        }
      });

      // 2. Highlight active line and smoothly scroll
      lyricLines.forEach((line, index) => {
        if (index === activeIndex) {
          line.classList.add("active");
          // Centers the active line in the screen
          line.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          line.classList.remove("active");
        }
      });
    });
  }

  // ==========================================
  // 3. MODAL 1: MEMORIES PHOTO ALBUM
  // ==========================================
  const memoriesTrigger = document.getElementById("memories-modal-trigger");
  const memoriesModal = document.getElementById("memories-modal");
  const closeMemories = document.getElementById("close-memories");

  if (memoriesTrigger && memoriesModal) {
    memoriesTrigger.addEventListener("click", () => memoriesModal.classList.remove("hidden"));
  }
  if (closeMemories && memoriesModal) {
    closeMemories.addEventListener("click", () => memoriesModal.classList.add("hidden"));
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

  if (shakeShackBtn && cakeModal) {
    shakeShackBtn.addEventListener("click", () => cakeModal.classList.remove("hidden"));
  }
  if (closeCake && cakeModal) {
    closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));
  }

  if (burgerBites) {
    burgerBites.forEach((bite) => {
      bite.addEventListener("click", (e) => {
        if (e.target.style.display !== "none") {
          e.target.style.display = "none";
          burgerCount--;
          if (burgerStatus) {
            burgerStatus.textContent = burgerCount > 0 ? `${burgerCount} bites left` : "Burger finished! 😋";
          }
        }
      });
    });
  }

  if (fryBatches) {
    fryBatches.forEach((batch) => {
      batch.addEventListener("click", (e) => {
        if (e.target.style.display !== "none") {
          e.target.style.display = "none";
          friesCount--;
          if (friesStatus) {
            friesStatus.textContent = friesCount > 0 ? `${friesCount} handfuls left` : "Fries all gone! 🍟";
          }
        }
      });
    });
  }

  if (sipLayers) {
    sipLayers.forEach((layer) => {
      layer.addEventListener("click", (e) => {
        if (e.target.style.display !== "none") {
          e.target.style.display = "none";
          drinkCount--;
          if (drinkStatus) {
            drinkStatus.textContent = drinkCount > 0 ? `${drinkCount} sips left` : "Cup empty! 🥤";
          }
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
