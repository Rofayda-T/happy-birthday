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

  // MODAL 2: INTERACTIVE SHAKE SHACK FEAST LOGIC
  const cakeTrigger = document.getElementById("cake-modal-trigger");
  const cakeModal = document.getElementById("cake-modal");
  const closeCake = document.getElementById("close-cake");

  if (cakeTrigger) {
    cakeTrigger.addEventListener("click", () => cakeModal.classList.remove("hidden"));
  }
  if (closeCake) {
    closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));
  }

  // 1. ShackBurger Bite Animation
  const burgerBites = ["burger-bite-1", "burger-bite-2", "burger-bite-3", "burger-bite-4"];
  let currentBurgerBite = 0;
  const burgerSvg = document.getElementById("burger-svg");
  const burgerStatus = document.getElementById("burger-status");

  if (burgerSvg) {
    burgerSvg.addEventListener("click", () => {
      if (currentBurgerBite < burgerBites.length) {
        const biteElem = document.getElementById(burgerBites[currentBurgerBite]);
        if (biteElem) biteElem.style.opacity = "0";
        currentBurgerBite++;
        const remaining = burgerBites.length - currentBurgerBite;
        burgerStatus.textContent = remaining > 0 ? `${remaining} bites left` : "Finished! 🍔";
        
        if (remaining === 0 && typeof confetti === "function") {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }
      }
    });
  }

  // 2. Crinkle Fries Eating Animation
  const fryBatches = ["fry-batch-1", "fry-batch-2", "fry-batch-3"];
  let currentFryBatch = 0;
  const friesSvg = document.getElementById("fries-svg");
  const friesStatus = document.getElementById("fries-status");

  if (friesSvg) {
    friesSvg.addEventListener("click", () => {
      if (currentFryBatch < fryBatches.length) {
        const fryElem = document.getElementById(fryBatches[currentFryBatch]);
        if (fryElem) fryElem.style.opacity = "0";
        currentFryBatch++;
        const remaining = fryBatches.length - currentFryBatch;
        friesStatus.textContent = remaining > 0 ? `${remaining} handfuls left` : "All eaten! 🍟";
      }
    });
  }

  // 3. Shake / Drink Sipping Animation
  const sipLayers = ["sip-layer-1", "sip-layer-2", "sip-layer-3"];
  let currentSip = 0;
  const drinkSvg = document.getElementById("drink-svg");
  const drinkStatus = document.getElementById("drink-status");

  if (drinkSvg) {
    drinkSvg.addEventListener("click", () => {
      if (currentSip < sipLayers.length) {
        const sipElem = document.getElementById(sipLayers[currentSip]);
        if (sipElem) sipElem.style.opacity = "0";
        currentSip++;
        const remaining = sipLayers.length - currentSip;
        drinkStatus.textContent = remaining > 0 ? `${remaining} sips left` : "All finished! 🥤";
      }
    });
  }

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
