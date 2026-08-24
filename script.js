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

      // Find the current lyric line based on timestamp
      lyricLines.forEach((line, index) => {
        const time = parseFloat(line.getAttribute("data-time"));
        if (currentTime >= time) {
          activeIndex = index;
        }
      });

      // ONLY trigger scroll inside the lyrics box if active line changes
      if (activeIndex !== -1 && activeIndex !== currentActiveIndex) {
        currentActiveIndex = activeIndex;

        // Remove active class from all lines
        lyricLines.forEach((line) => line.classList.remove("active"));

        // Highlight current line
        const activeLine = lyricLines[activeIndex];
        activeLine.classList.add("active");

        // Scroll inside lyrics container without stealing page scroll
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
  // 4. MODAL 2: SHAKE SHACK LOGIC & POPUP
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

  // Helper function to show any picture in the modal popup
  function showPicturePopup(imagePath) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    if (modal && modalImg) {
      modalImg.src = imagePath;
      modal.classList.remove('hidden');
    }
  }

  // Check if all items are finished
  function checkIfFinished() {
    if (burgerCount === 0 && friesCount === 0 && drinkCount === 0) {
      // Show Picture 2 (photo8.jpg) when everything is finished
      showPicturePopup('Images/photo8.jpeg');
    }
  }

  // Event Listeners for Closing Modal
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const imageModal = document.getElementById('image-modal');

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

  // Shake Shack & Cake Modal Trigger Listeners
  if (shakeShackBtn && cakeModal) {
    shakeShackBtn.addEventListener("click", () => cakeModal.classList.remove("hidden"));
  }
  showPicturePopup('Images/photo7.jpeg'); // Adjust image path/filename as needed
    });
  }
  if (closeCake && cakeModal) {
    closeCake.addEventListener("click", () => cakeModal.classList.add("hidden"));
  }

  // Burger Bites Listener (Fixed using e.currentTarget and checking display status)
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

  // Fry Batches Listener
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

  // Sip Layers Listener
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
