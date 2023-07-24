let xp = 0;
let skills = {
  clicking: { level: 1 },
  running: { level: 1 },
  swimming: { level: 1 },
  crafting: { level: 1 },
  strength: { level: 1 },
  agility: { level: 1 },
  intelligence: { level: 1 },
  archery: { level: 1 },
  swordsmanship: { level: 1 },
  magic: { level: 1 },
  fishing: { level: 1 },
  alchemy: { level: 1 },
  cooking: { level: 1 },
  woodcutting: { level: 1 },
  mining: { level: 1 },
  smithing: { level: 1 },
};

// Upgrades
let clickingSpeedUpgrade = 1;

function trainSkill(skill) {
  const skillLevel = skills[skill].level;
  const progressBarId = `${skill}Progress`;

  xp += skillLevel * 10;
  skills[skill].level += clickingSpeedUpgrade;

  const progressBar = document.getElementById(progressBarId);
  progressBar.style.width = (skills[skill].level / (skills[skill].level * clickingSpeedUpgrade)) * 100 + '%';
  progressBar.classList.add('animate');

  progressBar.addEventListener('transitionend', () => {
    progressBar.classList.remove('animate');
  });

  document.getElementById('xp').innerText = xp;
  document.getElementById(`${skill}Level`).innerText = `Level: ${skills[skill].level}`;
}

function buyUpgrade(upgrade) {
  if (upgrade === 'clicking') {
    const upgradeCost = 100;
    if (xp >= upgradeCost) {
      clickingSpeedUpgrade += 1;
      xp -= upgradeCost;
      document.getElementById('clickingLevel').innerText = `Level: ${skills.clicking.level * clickingSpeedUpgrade}`;
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
  clickingSpeedUpgrade = 1;

  // Reset skill levels
  for (const skill in skills) {
    skills[skill].level = 1;
    document.getElementById(`${skill}Level`).innerText = `Level: 1`;

    const progressBarId = `${skill}Progress`;
    const progressBar = document.getElementById(progressBarId);
    progressBar.style.width = '0%';
  }

  document.getElementById('xp').innerText = '0';
}
