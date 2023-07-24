let xp = 0;
let clickingLevel = 1;
let runningLevel = 1;
let swimmingLevel = 1;
let craftingLevel = 1;
let strengthLevel = 1;
let agilityLevel = 1;
let intelligenceLevel = 1;
let archeryLevel = 1;
let swordsmanshipLevel = 1;
let magicLevel = 1;
let fishingLevel = 1;
let alchemyLevel = 1;
let cookingLevel = 1;
let woodcuttingLevel = 1;
let miningLevel = 1;
let smithingLevel = 1;

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
  } else if (skill === 'archery') {
    skillLevel = archeryLevel;
    progressBarId = 'archeryProgress';
  } else if (skill === 'swordsmanship') {
    skillLevel = swordsmanshipLevel;
    progressBarId = 'swordsmanshipProgress';
  } else if (skill === 'magic') {
    skillLevel = magicLevel;
    progressBarId = 'magicProgress';
  } else if (skill === 'fishing') {
    skillLevel = fishingLevel;
    progressBarId = 'fishingProgress';
  } else if (skill === 'alchemy') {
    skillLevel = alchemyLevel;
    progressBarId = 'alchemyProgress';
  } else if (skill === 'cooking') {
    skillLevel = cookingLevel;
    progressBarId = 'cookingProgress';
  } else if (skill === 'woodcutting') {
    skillLevel = woodcuttingLevel;
    progressBarId = 'woodcuttingProgress';
  } else if (skill === 'mining') {
    skillLevel = miningLevel;
    progressBarId = 'miningProgress';
  } else if (skill === 'smithing') {
    skillLevel = smithingLevel;
    progressBarId = 'smithingProgress';
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
  archeryLevel = 1;
  swordsmanshipLevel = 1;
  magicLevel = 1;
  fishingLevel = 1;
  alchemyLevel = 1;
  cookingLevel = 1;
  woodcuttingLevel = 1;
  miningLevel = 1;
  smithingLevel = 1;
  clickingSpeedUpgrade = 1;

  document.getElementById('clickingLevel').innerText = `Level: 1`;
  document.getElementById('runningLevel').innerText = `Level: 1`;
  document.getElementById('swimmingLevel').innerText = `Level: 1`;
  document.getElementById('craftingLevel').innerText = `Level: 1`;
  document.getElementById('strengthLevel').innerText = `Level: 1`;
  document.getElementById('agilityLevel').innerText = `Level: 1`;
  document.getElementById('intelligenceLevel').innerText = `Level: 1`;
  document.getElementById('archeryLevel').innerText = `Level: 1`;
  document.getElementById('swordsmanshipLevel').innerText = `Level: 1`;
  document.getElementById('magicLevel').innerText = `Level: 1`;
  document.getElementById('fishingLevel').innerText = `Level: 1`;
  document.getElementById('alchemyLevel').innerText = `Level: 1`;
  document.getElementById('cookingLevel').innerText = `Level: 1`;
  document.getElementById('woodcuttingLevel').innerText = `Level: 1`;
  document.getElementById('miningLevel').innerText = `Level: 1`;
  document.getElementById('smithingLevel').innerText = `Level: 1`;
  document.getElementById('xp').innerText = `0`;

  // Reset progress bars
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(progressBar => progressBar.style.width = '0%');
}
