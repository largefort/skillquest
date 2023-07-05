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

function exportSave() {
  var saveData = {
    skills: skills,
    currency: currency
  };

  var saveDataString = JSON.stringify(saveData);

  if (navigator.share) {
    navigator.share({
      title: 'Skill Quest Save',
      text: 'Check out my Skill Quest game progress!',
      url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(saveDataString)
    })
      .then(() => {
        console.log('Save data shared successfully!');
      })
      .catch((error) => {
        console.error('Error sharing save data:', error);
      });
  } else {
    // Create a download link for the save data
    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(saveDataString);
    downloadLink.download = 'skillQuestSave.json';
    downloadLink.click();
  }
}

function importSave() {
  var fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.onchange = function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function() {
      var importedDataString = reader.result;
      var importedData = JSON.parse(importedDataString);

      skills = importedData.skills;
      currency = importedData.currency;
      updateAllSkills();
      document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
      unlockSkills();

      alert('Save data imported successfully!');
    };

    reader.readAsText(file);
  };

  fileInput.click();
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

window.onload = function() {
  var savedDataString = localStorage.getItem('skillQuestSaveData');

  if (savedDataString) {
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
