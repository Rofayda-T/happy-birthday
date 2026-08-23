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

  // MODAL 2: INTERACTIVE CAKE LOGIC
  const cakeTrigger = document.getElementById("cake-modal-trigger");
  const cakeModal = document.getElementById("cake-modal");
  const closeCake = document.getElementById("close-cake");
  const cakeSlices = document.querySelectorAll(".cake-slice");
  const cakeStatus = document.getElementById("cake-status-text");
  let slicesEaten = 0;

  if (cakeTrigger) {
    cakeTrigger.addEventListener("click", () => cakeModal.classList.remove("hidden"));
  }
  if (closeCake) {
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
});
