document.getElementById('envelope-btn').addEventListener('click', function() {
  // 1. Play Background Song
  const audio = document.getElementById('bg-music');
  audio.play().catch(err => console.log("Playback error:", err));

  // 2. Hide envelope screen & show full website content
  document.getElementById('envelope-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  // 3. Initial celebration confetti
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });
});

// Trigger confetti when clicking on the cake link
document.getElementById('cake-link').addEventListener('click', function() {
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#ff9a9e', '#fecfef', '#ffffff']
    });
  }, 300);
});