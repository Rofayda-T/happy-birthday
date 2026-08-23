document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");

  // SECTION NAVIGATION: Envelope Cover -> Main Content Reveal
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

      // Reveal main page directly
      envelopeScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
    });
  }

  // MODAL 1: MEMORIES PHOTO ALBUM LOGIC
  const memoriesTrigger = document.getElementById("memories-modal-trigger");
  const memoriesModal = document.getElementById("memories-modal");
  const closeMemories = document.getElementById("close-memories");

  if (memoriesTrigger) {
    memoriesTrigger.addEventListener("click", () => memoriesModal.classList.remove("hidden"));
  }
  if (closeMemories) {
    closeMemories.addEventListener("click", () => memoriesModal.classList.add("hidden"));
  }

  // MODAL 2: INTERACTIVE SHAKE SHACK FEAST LOGIC (BURGER, FRIES, DRINK)
  const cakeTrigger = document.getElementById("cake-modal-trigger");
  const cakeModal = document.getElementById("cake-modal");
  const closeCake = document.getElementById("close-cake");

  if (cakeTrigger) {
    cakeTrigger.addEventListener("click", () => cakeModal.classList.remove("hidden"));
  }
  if (closeCake) {
    closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));
  }

  // 1. ShackBurger Bite Logic
  const burgerBites = document.querySelectorAll(".burger-bite");
  const burgerStatus = document.getElementById("burger-status");
  let burgerCount = burgerBites.length;

  burgerBites.forEach((bite) => {
    bite.addEventListener("click", () => {
      if (bite.style.display !== "none") {
        bite.style.display = "none";
        burgerCount--;
        if (burgerStatus) {
          burgerStatus.textContent = burgerCount > 0 ? `${burgerCount} bites left` : "Burger finished! 😋";
        }
      }
    });
  });

  // 2. Crinkle Fries Logic
  const fryBatches = document.querySelectorAll(".fry-batch");
  const friesStatus = document.getElementById("fries-status");
  let friesCount = fryBatches.length;

  fryBatches.forEach((batch) => {
    batch.addEventListener("click", () => {
      if (batch.style.display !== "none") {
        batch.style.display = "none";
        friesCount--;
        if (friesStatus) {
          friesStatus.textContent = friesCount > 0 ? `${friesCount} handfuls left` : "Fries all gone! 🍟";
        }
      }
    });
  });

  // 3. Shake Drink Sip Logic
  const sipLayers = document.querySelectorAll(".sip-layer");
  const drinkStatus = document.getElementById("drink-status");
  let drinkCount = sipLayers.length;

  sipLayers.forEach((layer) => {
    layer.addEventListener("click", () => {
      if (layer.style.display !== "none") {
        layer.style.display = "none";
        drinkCount--;
        if (drinkStatus) {
          drinkStatus.textContent = drinkCount > 0 ? `${drinkCount} sips left` : "Empty cup! 🥤";
        }
      }
    });
  });

  // MODAL 3: SURPRISE FLOWER BOUQUET & FLIPPING POLAROID LOGIC
  const flowersTrigger = document.getElementById("flowers-modal-trigger");
  const flowersModal = document.getElementById("flowers-modal");
  const closeFlowers = document.getElementById("close-flowers");
  const flowers = document.querySelectorAll(".interactive-flower");
  const polaroidWrapper = document.getElementById("polaroid-wrapper");
  const polaroidCard = document.getElementById("polaroid-card");
  const polaroidImg = document.getElementById("polaroid-img");
  const polaroidDate = document.getElementById("polaroid-date");
  const polaroidMsg = document.getElementById("polaroid-msg");

  if (flowersTrigger) {
    flowersTrigger.addEventListener("click", () => flowersModal.classList.remove("hidden"));
  }
  if (closeFlowers) {
    closeFlowers.addEventListener("click", () => flowersModal.classList.add("hidden"));
  }

  flowers.forEach((flower) => {
    flower.addEventListener("click", () => {
      const photo = flower.getAttribute("data-photo");
      const date = flower.getAttribute("data-date");
      const msg = flower.getAttribute("data-msg");

      if (polaroidImg) polaroidImg.src = photo;
      if (polaroidDate) polaroidDate.textContent = date;
      if (polaroidMsg) polaroidMsg.textContent = msg;

      if (polaroidCard) polaroidCard.classList.remove("flipped");
      if (polaroidWrapper) polaroidWrapper.classList.remove("hidden");
    });
  });

  if (polaroidWrapper) {
    polaroidWrapper.addEventListener("click", () => {
      if (polaroidCard) polaroidCard.classList.toggle("flipped");
    });
  }

  // MODAL 4: VINTAGE CAMERA & VIDEO LOGIC
  const cameraTrigger = document.getElementById("camera-modal-trigger");
  const cameraModal = document.getElementById("camera-modal");
  const closeCamera = document.getElementById("close-camera");
  const shutterBtn = document.getElementById("shutter-btn");
  const cameraBody = document.getElementById("camera-body");
  const videoFrame = document.getElementById("video-display-frame");
  const cameraVideo = document.getElementById("camera-video");

  if (cameraTrigger) {
    cameraTrigger.addEventListener("click", () => {
      cameraModal.classList.remove("hidden");
      if (cameraBody) cameraBody.classList.remove("hidden");
      if (videoFrame) videoFrame.classList.add("hidden");
    });
  }

  if (closeCamera) {
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
