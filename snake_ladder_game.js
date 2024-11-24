function repeat(string, nTimes) {
  let repeatedString = "";
  for (let index = 0; index < nTimes; index++) {
    repeatedString += string;
  }
  return repeatedString;
}

function decorateMessage(string) {
  const line = repeat("─", string.length);
  return line + "\n" + string + "\n" + line;
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

function player1(p1Position) {
  const p1CurrentPosition = decorateMessage("Current Position : " + p1Position);
  console.log("\n\n" + "🧑🏻‍💼 Player1\n" + p1CurrentPosition);
  prompt("Hit return to roll the dice 🎲");
  const p1RolledNum = rollDice();
  console.log("Rolled number :", p1RolledNum);
  p1Position += p1RolledNum;

  p1Position = nextPosition(p1Position, p1RolledNum);

  console.log(decorateMessage("New Position     : " + p1Position));
  return p1Position;
}

function player2(p2Position) {
  const p2CurrentPosition = decorateMessage("Current Position : " + p2Position);
  console.log("\n\n" + "👩🏻‍💼 Player2\n" + p2CurrentPosition);
  prompt("Hit return to roll the dice 🎲");
  const p2RolledNum = rollDice();
  console.log("Rolled number :", p2RolledNum);
  p2Position += p2RolledNum;

  p2Position = nextPosition(p2Position, p2RolledNum);

  console.log(decorateMessage("New Position     : " + p2Position));
  return p2Position;
}

function getWinningMessage() {
  return "\n🏆Congratulations! Player1 won the Game. 🏆\n";
}

function playGame(p1, p2) {
  let p1Position = p1;
  let p2Position = p2;

  while (p1Position !== 100 && p2Position !== 100) {
    // Player1
    p1Position = player1(p1Position);

    if (p1Position === 100) {
      console.log(getWinningMessage());
      return;
    }

    // Player2
    p2Position = player2(p2Position);

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

function startGame() {
  showWelcomeMessage();
  prompt("\nHit return to start the Game 👇");
  playGame(0, 0);

  if (userWantsToPlayAgain()) {
    return playGame(0, 0);
  }

  showGoodByeMessage();
}

startGame();
