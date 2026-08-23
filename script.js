document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");

  // SECTION NAVIGATION: Envelope Cover -> Main Content Reveal
  const envelopeScreen = document.getElementById("envelope-screen");
  const openEnvelopeBtn = document.getElementById("open-envelope-btn");
  const mainContent = document.getElementById("main-content");

  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener("click", () => {
      if (bgMusic) {
        bgMusic.play().catch(() => console.log("Audio autoplay restriction handled"));
      }

      if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }

      envelopeScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
    });
  }

  // MODAL 1: MEMORIES PHOTO ALBUM
  const memoriesTrigger = document.getElementById("memories-modal-trigger");
  const memoriesModal = document.getElementById("memories-modal");
  const closeMemories = document.getElementById("close-memories");

  if (memoriesTrigger) memoriesTrigger.addEventListener("click", () => memoriesModal.classList.remove("hidden"));
  if (closeMemories) closeMemories.addEventListener("click", () => memoriesModal.classList.add("hidden"));

  // MODAL 2: INTERACTIVE CAKE
  const cakeTrigger = document.getElementById("cake-modal-trigger");
  const cakeModal = document.getElementById("cake-modal");
  const closeCake = document.getElementById("close-cake");
  const cakeSlices = document.querySelectorAll(".cake-slice");
  const cakeStatus = document.getElementById("cake-status-text");
  let slicesEaten = 0;

  if (cakeTrigger) cakeTrigger.addEventListener("click", () => cakeModal.classList.remove("hidden"));
  if (closeCake) closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));

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
            if (typeof confetti === "function") confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
          }
        }
      }
    });
  });

  // MODAL 3: SURPRISE FLOWER BOUQUET
  const flowersTrigger = document.getElementById("flowers-modal-trigger");
  const flowersModal = document.getElementById("flowers-modal");
  const closeFlowers = document.getElementById("close-flowers");
  const flowers = document.querySelectorAll(".interactive-flower");
  const polaroidWrapper = document.getElementById("polaroid-wrapper");
  const polaroidCard = document.getElementById("polaroid-card");
  const polaroidImg = document.getElementById("polaroid-img");
  const polaroidDate = document.getElementById("polaroid-date");
  const polaroidMsg = document.getElementById("polaroid-msg");

  if (flowersTrigger) flowersTrigger.addEventListener("click", () => flowersModal.classList.remove("hidden"));
  if (closeFlowers) closeFlowers.addEventListener("click", () => flowersModal.classList.add("hidden"));

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
    polaroidWrapper.addEventListener("click", () => polaroidCard && polaroidCard.classList.toggle("flipped"));
  }

  // MODAL 4: VINTAGE CAMERA & VIDEO LOGIC
  const cameraTrigger = document.getElementById("camera-modal-trigger");
  const cameraModal = document.getElementById("camera-modal");
  const closeCamera = document.getElementById("close-camera");
  const shutterBtn = document.getElementById("shutter-btn");
  const cameraBody = document.getElementById("camera-body");
  const videoFrame = document.getElementById("video-display-frame");
  const cameraVideo = document.getElementById("camera-video");

  if (cameraTrigger) cameraTrigger.addEventListener("click", () => cameraModal.classList.remove("hidden"));
  if (closeCamera) {
    closeCamera.addEventListener("click", () => {
      cameraModal.classList.add("hidden");
      if (cameraVideo) cameraVideo.pause();
    });
  }

  if (shutterBtn) {
    shutterBtn.addEventListener("click", () => {
      // Shutter Click Flash Animation
      cameraBody.classList.add("camera-flash");
      setTimeout(() => cameraBody.classList.remove("camera-flash"), 400);

      // Reveal Video Display
      setTimeout(() => {
        cameraBody.classList.add("hidden");
        videoFrame.classList.remove("hidden");
        if (cameraVideo) cameraVideo.play().catch(() => {});
      }, 500);
    });
  }
});
