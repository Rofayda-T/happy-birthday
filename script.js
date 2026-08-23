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
  // 2. MODAL 1: MEMORIES PHOTO ALBUM
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
  // 3. MODAL 2: SHAKE SHACK / CAKE LOGIC
  // ==========================================
  const shakeShackBtn = document.getElementById("shake-shack-trigger");
  const cakeModal = document.getElementById("cake-modal");
  const closeCake = document.getElementById("close-cake");
  const cakeSlices = document.querySelectorAll(".cake-slice");
  const cakeStatus = document.getElementById("cake-status-text");
  let slicesEaten = 0;

  if (shakeShackBtn) {
    shakeShackBtn.addEventListener("click", () => {
      if (cakeModal) {
        cakeModal.classList.remove("hidden");
      } else {
        alert("Shake Shack treat redeemed! 🍔✨");
      }
    });
  }

  if (closeCake && cakeModal) {
    closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));
  }

  cakeSlices.forEach((slice) => {
    slice.addEventListener("click", (e) => {
      if (e.target.style.display !== "none") {
        e.target.style.display = "none";
        slicesEaten++;
        const remaining = 4 - slicesEaten;

        if (cakeStatus) {
          if (remaining > 0) {
            cakeStatus.textContent = `${remaining} slice${remaining > 1 ? "s" : ""} remaining... YUM! 😋`;
          } else {
            cakeStatus.textContent = "All gone! Hope it was delicious! 🎉";
            if (typeof confetti === "function") {
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
            }
          }
        }
      }
    });
  });

  // ==========================================
  // 4. MODAL 3: SURPRISE BOUQUET & POLAROID
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

  flowers.forEach((flower) => {
    flower.addEventListener("click", () => {
      if (polaroidImg) polaroidImg.src = flower.getAttribute("data-photo");
      if (polaroidDate) polaroidDate.textContent = flower.getAttribute("data-date");
      if (polaroidMsg) polaroidMsg.textContent = flower.getAttribute("data-msg");

      if (polaroidCard) polaroidCard.classList.remove("flipped");
      if (polaroidWrapper) polaroidWrapper.classList.remove("hidden");
    });
  });

  if (polaroidWrapper) {
    polaroidWrapper.addEventListener("click", () => {
      if (polaroidCard) polaroidCard.classList.toggle("flipped");
    });
  }

  // ==========================================
  // 5. MODAL 4: VINTAGE CAMERA & VIDEO LOGIC
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
      // Reset Camera view on open
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
      // Trigger Flash Animation
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

  // ==========================================
  // 6. VINYL PLAYER CONTROLS
  // ==========================================
  const vinylPlayer = document.getElementById("vinyl-player");
  if (vinylPlayer && bgMusic) {
    vinylPlayer.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        vinylPlayer.style.animationPlayState = "running";
      } else {
        bgMusic.pause();
        vinylPlayer.style.animationPlayState = "paused";
      }
    });
  }
});
