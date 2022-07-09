const HIGHSCORE_TABLE = document.getElementById("highscores-table");
const CLEAR_HIGHSCORE_BTN = document.getElementById("clear-highscores");

CLEAR_HIGHSCORE_BTN.addEventListener('click', clearHighscores);

// loads highscore table
generateHighscoresTable();

function generateHighscoresTable() {
    const highscores = localStorage.getItem('scoreList');
    if (highscores) {
        addHighscoreTableRows(highscores);
    }
}

function addHighscoreTableRows(highscores) {
    const scoreList = JSON.parse(highscores);
    for (let i = 0; i < scoreList.length; i++) {
        const entry = scoreList[i];
        const rankCell = createRankCell(i + 1);
        const scoreCell = createScoreCell(entry.score);
        const initialsCell = createInitialsCell(entry.initials);
        const tableRow = createHighscoreTableRow(rankCell, scoreCell, initialsCell);
        HIGHSCORE_TABLE.appendChild(tableRow);
    }
}

// create rank cell function to show highschores 
function createRankCell(rank) {
    const rankCell = document.createElement("td");
    rankCell.textContent = `#${rank}`;
    return rankCell;
}

function createScoreCell(score) {
    const scoreCell = document.createElement("td");
    scoreCell.textContent = score;
    return scoreCell;
}

function createInitialsCell(initials) {
    const initialsCell = document.createElement("td");
    initialsCell.textContent = initials;
    return initialsCell;
}

function createHighscoreTableRow(rankCell, scoreCell, initialsCell) {
    const tableRow = document.createElement("tr");
    tableRow.appendChild(rankCell);
    tableRow.appendChild(scoreCell);
    tableRow.appendChild(initialsCell);
    return tableRow;
}


// clear highscore function
function clearHighscores() {
    localStorage.setItem('scoreList', []);
    while (HIGHSCORE_TABLE.children.length > 1) {
        HIGHSCORE_TABLE.removeChild(HIGHSCORE_TABLE.lastChild);
    }
}

// save highscore function
function saveHighscoreEntry(highscoreEntry) {
    const currentScores = getScoreList();
    placeEntryInHighscoreList(highscoreEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

// get score list function
function getScoreList() {
    const currentScores = localStorage.getItem('scoreList');
    if (currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}

// place entry in highscore list function
function placeEntryInHighscoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}

// get new score index function
function getNewScoreIndex(newEntry, scoreList) {
    let newScoreIndex = scoreList.length;
    for (let i = 0; i < scoreList.length; i++) {
        if (newEntry.score > scoreList[i].score) {
            newScoreIndex = i;
            break;
        }
    }
    return newScoreIndex;
}

// create highscore entry function
function createHighscoreEntry(initials, score) {
    const entry = {
        initials: initials,
        score: score,
    };
    return entry;
}

// check if input is valid and display error message if not valid  
function isInputValid(initials) { 
    let errorMessage = "";
    if (initials.length < 3) {
      errorMessage = "Initials must be at least 3 characters long!";
      displayFormError(errorMessage);
      return false;
    }
    return true;
  }

// display form error function
function displayFormError(errorMessage) {   

    ERROR_MESSAGE.textContent = errorMessage;
    if (!INITIALS_INPUT.classList.contains(error)) {

        INITIALS_INPUT.classList.add(error);
        } else {    
        INITIALS_INPUT.classList.remove(error);
    } 
}
      