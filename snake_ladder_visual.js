function repeat(string, nTimes) {
  let repeatedString = "";
  for (let index = 0; index < nTimes; index++) {
    repeatedString += string;
  }
  return repeatedString;
}

function decorateMessage(string) {
  const line = repeat("𓍼", string.length);
  return line + "\n" + string + "\n" + line;
}

function createTopLine(length) {
  return "┏" + repeat("━━━━━━┳", length - 1) + "━━━━━━" + "┓";
}

function createBottomLine(length) {
  return "┗" + repeat("━━━━━━┻", length - 1) + "━━━━━━" + "┛";
}

function createLine(length) {
  return "┣" + repeat("━━━━━━╋", length - 1) + "━━━━━━" + "┫";
}

function getBoxNumber(rowNumber, index) {
  return rowNumber * 10 + index;
}

function isSnake(boxNumber) {
  const startSnakes = boxNumber === 28 || boxNumber === 37 || boxNumber === 48;
  const endSnakes = boxNumber === 75 || boxNumber === 94 || boxNumber === 96;
  return startSnakes || endSnakes;
}

function isLadder(boxNumber) {
  const startLadders = boxNumber === 4 || boxNumber === 12 || boxNumber === 14;
  const endLadders = boxNumber === 22 || boxNumber === 41 || boxNumber === 54;
  return startLadders || endLadders;
}

function createRow(rowNumber, p1Position, p2Position) {
  let char = "";
  for (let index = 1; index <= 10; index++) {
    const boxNumber = getBoxNumber(rowNumber, index);
    if (boxNumber === p1Position) {
      char += "┃  🔴  ";
    } else if (boxNumber === p2Position) {
      char += "┃  🟡  ";
    } else if (boxNumber === 100) {
      char += "┃  🏆  ";
    } else if (isSnake(boxNumber)) {
      char += "┃  🐍  ";
    } else if (isLadder(boxNumber)) {
      char += "┃  🪜  ";
    } else if (boxNumber < 10) {
      char += "┃   " + boxNumber + "  ";
    } else {
      char += "┃  " + boxNumber + "  ";
    }
  }

  return char + "┃";
}

function createEmptyRow(length) {
  let char = "";
  for (let index = 1; index <= length; index++) {
    char += "┃      ";
  }
  return char + "┃";
}


function createBoard(p1Position, p2Position) {
  console.log(createTopLine(10));
  for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
    console.log(createRow(rowNumber, p1Position, p2Position));
    console.log(createEmptyRow(10));
    console.log(createLine(10));
  }
  console.log(createRow(9, p1Position, p2Position));
  console.log(createEmptyRow(10));
  console.log(createBottomLine(10));
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function snakeFound(position) {
  console.log("🐍 Ops! Snake has bit you.🐍");
  switch (position) {
    case 28:
      return 10;
    case 37:
      return 3;
    case 48:
      return 16;
    case 75:
      return 32;
    case 94:
      return 71;
    case 96:
      return 42;
  }
}

function ladderFound(position) {
  console.log("🪜 Hey! You got a Ladder.🪜");
  switch (position) {
    case 4:
      return 56;
    case 12:
      return 50;
    case 14:
      return 55;
    case 22:
      return 58;
    case 41:
      return 79;
    case 54:
      return 88;
  }
}

function nextPosition(position, rolledNum) {
  if (position > 100) {
    position = position - rolledNum;
  }

  switch (position) {
    case 28:
    case 37:
    case 48:
    case 75:
    case 94:
    case 96: return snakeFound(position);
    case 4:
    case 12:
    case 14:
    case 22:
    case 41:
    case 54: return ladderFound(position);
    default: return position;
  }
}

function delay(time) {
  for (let i = 0; i <= time; i++) { }
}

function showDice(rolledNum) {
  console.clear();
  console.log(decorateMessage("dice rolled to : " + rolledNum));
  delay(1000000000);
}

function player1(p1Position, p2Position) {
  createBoard(p1Position, p2Position);

  console.log("\nplayer1 Turn🧑🏻‍💼");
  prompt("Hit return to roll the dice 🎲");
  const p1RolledNum = rollDice();
  showDice(p1RolledNum);
  p1Position += p1RolledNum;

  p1Position = nextPosition(p1Position, p1RolledNum);

  return p1Position;
}

function player2(p2Position, p1Position) {
  createBoard(p1Position, p2Position);

  console.log("\nplayer2 Turn👩🏻‍💼");
  prompt("Hit return to roll the dice 🎲");
  const p2RolledNum = rollDice();
  showDice(p2RolledNum);
  p2Position += p2RolledNum;

  p2Position = nextPosition(p2Position, p2RolledNum);

  return p2Position;
}

function getWinningMessage() {
  return "\n🏆Congratulations! Player1 won the Game🏆\n";
}

function showScoreBoard(p1Position, p2Position) {
  console.clear();
  console.log(decorateMessage("🏅🏅SCORE BOARD"));
  console.log("🧑🏻‍💼Player1 :" + p1Position + "\n👩🏻‍💼Player2 :" + p2Position);
}

function playGame(p1, p2) {
  let p1Position = p1;
  let p2Position = p2;

  while (p1Position !== 100 && p2Position !== 100) {
    // Player1
    p1Position = player1(p1Position, p2Position);
    showScoreBoard(p1Position, p2Position);

    if (p1Position === 100) {
      console.log(getWinningMessage());
      return;
    }

    // Player2
    p2Position = player2(p2Position, p1Position);
    showScoreBoard(p1Position, p2Position);

    if (p2Position === 100) {
      console.log(getWinningMessage());
      return;
    }
  }
}

function showWelcomeMessage() {
  console.log(decorateMessage("🐍🪜 WELCOME TO SNAKE AND LADDER GAME 🪜🐍"));
}

function showGoodByeMessage() {
  console.log(decorateMessage("🙋🏻‍♀️GoodBye!"));
}

function userWantsToPlayAgain() {
  return confirm("\nDo you want to play new game?");
}


function startGame(p1, p2) {
  showWelcomeMessage();
  prompt("\nHit return to start the Game 👇");
  playGame(p1, p2);

  if (userWantsToPlayAgain()) {
    return startGame();
  }

  showGoodByeMessage();
}

startGame(0, 0);
