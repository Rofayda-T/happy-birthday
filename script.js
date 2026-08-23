document.getElementById('open-envelope-btn').addEventListener('click', function() {
  // 1. Play background song
  const audio = document.getElementById('bg-music');
  audio.play().catch(err => console.log("Audio play blocked by browser:", err));

  // 2. Hide envelope screen and reveal main website content
  document.getElementById('envelope-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  // 3. Launch confetti celebration blast
  confetti({
    particleCount: 130,
    spread: 85,
    origin: { y: 0.6 }
  });
});

// Trigger extra confetti blast when clicking on the Cake gift button
document.getElementById('cake-gift-btn').addEventListener('click', function() {
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.8 },
      colors: ['#e8a2a8', '#f7f3ec', '#ffffff']
    });
  }, 300);
});
