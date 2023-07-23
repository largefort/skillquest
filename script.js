var skillNames = [
  "Shadow Strike",
  "Dragon Fury",
  "Storm Bolt",
  "Arcane Surge",
  "Venomous Bite",
  "Holy Smite",
  "Inferno Blaze",
  "Frost Nova",
  "Earthquake",
  "Divine Shield",
  "Thunderstorm",
  "Rapid Shot",
  "Crippling Blow",
  "Soul Drain",
  "Whirlwind Slash"
];

var skills = [];
var currency = 100;
var unlockedSkills = [];

function initSkills() {
  for (var i = 0; i < skillNames.length; i++) {
    skills.push({
      name: skillNames[i],
      description: "", // Feature 1: Skill Description Display
      level: (i === 0) ? 0 : -1,
      exp: 0
    });
  }
}

function trainSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  skill.exp += 10;

  if (skill.exp >= 100) {
    skill.exp = 0;
    skill.level++;
    currency += 10;
    document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
    unlockSkills();
    syncSkillLevels();
  }

  updateSkill(skillIndex);
  updateSkillProgressBar(skillIndex, (skill.exp / 100) * 100);
}

function unlockSkills() {
  for (var i = 1; i < skillNames.length; i++) {
    if (skills[0].level >= 100) {
      unlockedSkills.push(i + 1);
    }
  }
}

function syncSkillLevels() {
  var mainSkillLevel = skills[0].level;

  for (var i = 1; i < skills.length; i++) {
    skills[i].level = mainSkillLevel;
  }
}

function updateSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  var skillLevelElement = document.getElementById('skill' + skillIndex + '-level');
  var skillExpElement = document.getElementById('skill' + skillIndex + '-exp');

  skillLevelElement.textContent = skill.level === 0 ? "N/A" : skill.level;
  skillExpElement.textContent = skill.exp;
}

function updateSkillProgressBar(skillIndex, progress) {
  var progressBar = document.getElementById('skill' + skillIndex + '-progress');
  progressBar.style.width = `${progress}%`;
}

function updateSkillDescription(skillIndex, description) {
  var descriptionElement = document.querySelector(`#skill${skillIndex} .description`);
  descriptionElement.textContent = description;
}

function upgradeSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  if (currency >= (skill.level + 1) * 100) {
    currency -= (skill.level + 1) * 100;
    skill.level++;
    document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
    updateSkill(skillIndex);
  } else {
    alert('Not enough coins to upgrade this skill!');
  }
}

var skillPoints = 0;

function allocateSkillPoint(skillIndex) {
  if (skillPoints > 0) {
    var skill = skills[skillIndex - 1];
    skill.level++;
    skillPoints--;
    updateSkill(skillIndex);
    document.getElementById('skill-points').textContent = skillPoints;
  }
}

var leaderboardData = [];

function updateLeaderboard() {
  var leaderboardElement = document.getElementById('leaderboard');
  leaderboardElement.innerHTML = '';

  leaderboardData.sort((a, b) => b.level - a.level);

  for (var i = 0; i < leaderboardData.length; i++) {
    var entry = leaderboardData[i];
    var li = document.createElement('li');
    li.textContent = `Player ${entry.player}: Level ${entry.level}`;
    leaderboardElement.appendChild(li);
  }
}

function addToLeaderboard(playerName, playerLevel) {
  leaderboardData.push({ player: playerName, level: playerLevel });
  updateLeaderboard();
}

function prestige() {
  var totalSkillLevels = skills.reduce((total, skill) => total + skill.level, 0);
  var prestigeBonuses = totalSkillLevels * 10;

  currency += prestigeBonuses;
  skillPoints += totalSkillLevels;

  skills.forEach((skill) => {
    skill.level = 0;
    skill.exp = 0;
  });

  updateAllSkills();
  document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
  document.getElementById('skill-points').textContent = skillPoints;
}

function playSoundEffect(soundUrl) {
  var audio = new Audio(soundUrl);
  audio.play();
}

function initGame() {
  initSkills();
  syncSkillLevels();
  updateAllSkills();
  document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
  unlockSkills();
  updateSkillDescription(1, "A quick and powerful strike that deals shadow damage."); // Feature 1: Skill Description Display
  updateSkillDescription(2, "Master the power of the earth and bend it to your will.");
}

function enterGame() {
  document.getElementById('changelog-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  initGame();
}

window.onload = function() {
  var savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    var confirmLoad = confirm('Saved game data found! Do you want to load the saved game?');
    if (confirmLoad) {
      loadGame();
      enterGame();
    } else {
      localStorage.removeItem('skillQuestSaveData');
      enterGame();
    }
  } else {
    enterGame();
  }
};
