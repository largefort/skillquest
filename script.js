let xp = 0;
let clickingLevel = 1;
let runningLevel = 1;
let swimmingLevel = 1;
let craftingLevel = 1;
let strengthLevel = 1;
let agilityLevel = 1;
let intelligenceLevel = 1;

// Upgrades
let clickingSpeedUpgrade = 1;

function trainSkill(skill) {
  let skillLevel;
  let progressBarId;

  if (skill === 'clicking') {
    skillLevel = clickingLevel;
    progressBarId = 'clickingProgress';
  } else if (skill === 'running') {
    skillLevel = runningLevel;
    progressBarId = 'runningProgress';
  } else if (skill === 'swimming') {
    skillLevel = swimmingLevel;
    progressBarId = 'swimmingProgress';
  } else if (skill === 'crafting') {
    skillLevel = craftingLevel;
    progressBarId = 'craftingProgress';
  } else if (skill === 'strength') {
    skillLevel = strengthLevel;
    progressBarId = 'strengthProgress';
  } else if (skill === 'agility') {
    skillLevel = agilityLevel;
    progressBarId = 'agilityProgress';
  } else if (skill === 'intelligence') {
    skillLevel = intelligenceLevel;
    progressBarId = 'intelligenceProgress';
  }

  xp += skillLevel * 10;
  skillLevel += clickingSpeedUpgrade;

  const progressBar = document.getElementById(progressBarId);
  progressBar.style.width = (skillLevel / (clickingLevel * clickingSpeedUpgrade)) * 100 + '%';
  progressBar.classList.add('animate');

  progressBar.addEventListener('transitionend', () => {
    progressBar.classList.remove('animate');
  });
}

function buyUpgrade(upgrade) {
  if (upgrade === 'clicking') {
    const upgradeCost = 100;
    if (xp >= upgradeCost) {
      clickingSpeedUpgrade += 1;
      xp -= upgradeCost;
      document.getElementById('clickingLevel').innerText = `Level: ${clickingLevel * clickingSpeedUpgrade}`;
      document.getElementById('xp').innerText = xp;

      // Create a particle effect when an upgrade is purchased
      const container = document.querySelector('.container');
      const particle = document.createElement('span');
      particle.className = 'particle';
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    } else {
      alert("Insufficient XP to buy this upgrade!");
    }
  }

  // Add more upgrade logic here
}

function resetGame() {
  xp = 0;
  clickingLevel = 1;
  runningLevel = 1;
  swimmingLevel = 1;
  craftingLevel = 1;
  strengthLevel = 1;
  agilityLevel = 1;
  intelligenceLevel = 1;
  clickingSpeedUpgrade = 1;

  document.getElementById('clickingLevel').innerText = `Level: 1`;
  document.getElementById('runningLevel').innerText = `Level: 1`;
  document.getElementById('swimmingLevel').innerText = `Level: 1`;
  document.getElementById('craftingLevel').innerText = `Level: 1`;
  document.getElementById('strengthLevel').innerText = `Level: 1`;
  document.getElementById('agilityLevel').innerText = `Level: 1`;
  document.getElementById('intelligenceLevel').innerText = `Level: 1`;
  document.getElementById('xp').innerText = `0`;

  // Reset progress bars
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(progressBar => progressBar.style.width = '0%');
}
