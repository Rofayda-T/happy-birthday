// Step 1: Open Envelope
document.getElementById('open-envelope-btn').addEventListener('click', function() {
  const audio = document.getElementById('bg-music');
  audio.play().catch(err => console.log("Audio play blocked by browser:", err));

  document.getElementById('envelope-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
});

// Step 2: Interactive Cake Eating Modal
const cakeModal = document.getElementById('cake-modal');
let slicesLeft = 4;

document.getElementById('cake-modal-trigger').addEventListener('click', () => {
  cakeModal.classList.remove('hidden');
});

document.getElementById('close-cake').addEventListener('click', () => {
  cakeModal.classList.add('hidden');
});

document.querySelectorAll('.cake-slice').forEach(slice => {
  slice.addEventListener('click', function() {
    if (this.style.visibility !== 'hidden') {
      this.style.visibility = 'hidden';
      slicesLeft--;
      
      const text = document.getElementById('cake-status-text');
      if (slicesLeft > 0) {
        text.textContent = `${slicesLeft} slice${slicesLeft > 1 ? 's' : ''} remaining... Yummy! 😋`;
      } else {
        text.textContent = "All gone! Hope your birthday is as sweet as this cake! 🎉";
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    }
  });
});

// Step 3: Interactive Flowers & Flipping Polaroid Modal
const flowersModal = document.getElementById('flowers-modal');
const polaroidWrapper = document.getElementById('polaroid-wrapper');
const polaroidCard = document.getElementById('polaroid-card');

document.getElementById('flowers-modal-trigger').addEventListener('click', () => {
  flowersModal.classList.remove('hidden');
});

document.getElementById('close-flowers').addEventListener('click', () => {
  flowersModal.classList.add('hidden');
  polaroidWrapper.classList.add('hidden');
  polaroidCard.classList.remove('flipped');
});

document.querySelectorAll('.interactive-flower').forEach(flower => {
  flower.addEventListener('click', function() {
    const photo = this.getAttribute('data-photo');
    const date = this.getAttribute('data-date');
    const msg = this.getAttribute('data-msg');

    document.getElementById('polaroid-img').src = photo;
    document.getElementById('polaroid-date').textContent = date;
    document.getElementById('polaroid-msg').textContent = msg;

    polaroidCard.classList.remove('flipped');
    polaroidWrapper.classList.remove('hidden');

    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  });
});

// Flip Polaroid Card on Click
polaroidCard.addEventListener('click', function() {
  this.classList.toggle('flipped');
});
