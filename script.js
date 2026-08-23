document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");

  // SECTION NAVIGATION
  const envelopeScreen = document.getElementById("envelope-screen");
  const openEnvelopeBtn = document.getElementById("open-envelope-btn");
  const photoRevealScreen = document.getElementById("photo-reveal-screen");
  const continueBtn = document.getElementById("continue-to-main-btn");
  const mainContent = document.getElementById("main-content");

  // Step 1: Open Envelope -> Show Full Photo Reveal
  openEnvelopeBtn.addEventListener("click", () => {
    // Play Background Music
    if (bgMusic) {
      bgMusic.play().catch(() => console.log("Audio autoplay restricted"));
    }

    // Trigger Confetti
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    envelopeScreen.classList.add("hidden");
    photoRevealScreen.classList.remove("hidden");
  });

  // Step 2: Continue -> Show Main Content
  continueBtn.addEventListener("click", () => {
    photoRevealScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
  });

  // CAKE MODAL LOGIC
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

        if (remaining > 0) {
          cakeStatus.textContent = `${remaining} slice${remaining > 1 ? "s" : ""} remaining... YUM! 😋`;
        } else {
          cakeStatus.textContent = "All gone! Hope it was delicious! 🎉";
          if (typeof confetti === "function") {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
          }
        }
      }
    });
  });

  // FLOWER BOUQUET & POLAROID FLIP LOGIC
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

      polaroidImg.src = photo;
      polaroidDate.textContent = date;
      polaroidMsg.textContent = msg;

      // Reset Flip and Reveal Card
      polaroidCard.classList.remove("flipped");
      polaroidWrapper.classList.remove("hidden");
    });
  });

  // Flip Polaroid Card
  if (polaroidWrapper) {
    polaroidWrapper.addEventListener("click", () => {
      polaroidCard.classList.toggle("flipped");
    });
  }
});
