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
var currency = 0;
var unlockedSkills = [];

// IndexedDB initialization
var db;

function initIndexedDB() {
  var request = indexedDB.open('SkillQuestDB', 1);

  request.onerror = function (event) {
    console.error("IndexedDB error: " + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    loadGameFromIndexedDB();
  };

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('skillQuestStore', { keyPath: 'id' });
    objectStore.createIndex('skills', 'skills', { unique: false });
    objectStore.createIndex('currency', 'currency', { unique: false });
  };
}

function saveGameToIndexedDB() {
  var transaction = db.transaction(['skillQuestStore'], 'readwrite');
  var objectStore = transaction.objectStore('skillQuestStore');

  var saveData = {
    id: 1,
    skills: skills,
    currency: currency
  };

  var request = objectStore.put(saveData);

  request.onsuccess = function (event) {
    console.log("Game saved to IndexedDB.");
  };

  request.onerror = function (event) {
    console.error("Error saving game to IndexedDB: " + event.target.errorCode);
  };
}

function loadGameFromIndexedDB() {
  var transaction = db.transaction(['skillQuestStore']);
  var objectStore = transaction.objectStore('skillQuestStore');

  var request = objectStore.get(1);

  request.onsuccess = function (event) {
    var result = event.target.result;
    if (result) {
      skills = result.skills;
      currency = result.currency;
      updateAllSkills();
      document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
      unlockSkills();
      console.log("Game loaded from IndexedDB.");
    } else {
      console.warn("No saved game data found in IndexedDB.");
    }
  };

  request.onerror = function (event) {
    console.error("Error loading game from IndexedDB: " + event.target.errorCode);
  };
}

function initSkills() {
  for (var i = 0; i < skillNames.length; i++) {
    skills.push({
      name: skillNames[i],
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
  }

  updateSkill(skillIndex);
}

function unlockSkills() {
  for (var i = 1; i < skillNames.length; i++) {
    if (skills[0].level >= 100) {
      unlockedSkills.push(i + 1);
    }
  }
}

function updateSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  var skillLevelElement = document.getElementById('skill' + skillIndex + '-level');
  var skillExpElement = document.getElementById('skill' + skillIndex + '-exp');

  skillLevelElement.textContent = skill.level === 0 ? "N/A" : skill.level;
  skillExpElement.textContent = skill.exp;
}

function buyAutoTrain() {
  if (currency >= 100) {
    currency -= 100;
    document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
    enableAutoTrain();
    alert('Auto-Train feature purchased successfully!');
  } else {
    alert('Not enough coins to purchase Auto-Train feature!');
  }
}

var trainingInterval;

function enableAutoTrain() {
  trainingInterval = setInterval(function() {
    trainSkill(1);
    trainSkill(2);
  }, 100);
}

function disableAutoTrain() {
  clearInterval(trainingInterval);
}

function updateAllSkills() {
  for (var i = 1; i <= skills.length; i++) {
    updateSkill(i);
  }
}

function initGame() {
  initSkills();
  updateAllSkills();
  document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
  unlockSkills();
}

function enterGame() {
  document.getElementById('changelog-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  initGame();
}

function showStats() {
    const statsContainer = document.getElementById('stats-container');
    const unlockedCount = skills.filter(skill => skill.level > -1).length;
    const currencyEarned = currency;

    statsContainer.innerHTML = `
        <p>Total Skills Unlocked: ${unlockedCount}</p>
        <p>Total Currency Earned: ${currencyEarned.toLocaleString(undefined, { notation: 'compact' })}</p>
    `;

    document.getElementById('game-container').style.display = 'none';
    statsContainer.style.display = 'block';
}

function hideStats() {
    document.getElementById('stats-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
}

window.onload = function() {
  initIndexedDB(); // Initialize IndexedDB
  enterGame();
};
