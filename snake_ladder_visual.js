function repeat(string, nTimes) {
  if (nTimes <= 0) {
    return "";
  }

  return string + repeat(string, nTimes - 1);
}

function getBox(string) {
  const line = repeat("―", string.length);
  return line + "\n" + string + "\n" + line;
}

function createLine(limit) {
  return repeat("―", limit);
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
      char += "🔴 " + "\t│";
    } else if (boxNumber === p2Position) {
      char += "🟡" + "\t│";
    } else if (boxNumber === 100) {
      char += "🏆" + "\t│";
    } else if (isSnake(boxNumber)) {
      char += "🐍" + "\t│";
    } else if (isLadder(boxNumber)) {
      char += "🪜" + "\t│";
    } else {
      char += boxNumber + "\t│";
    }
  }

  return char;
}

function createBoard(p1Position, p2Position) {
  for (let rowNumber = 0; rowNumber < 10; rowNumber++) {
    console.log(createLine(8 * 10));
    console.log(createRow(rowNumber, p1Position, p2Position));
  }
  console.log(createLine(8 * 10));
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function snakeFound(position) {
  console.log("🐍 Ops! Snake has bit you.🐍")
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
  console.log("🪜 Hey! You got a Ladder.🪜")
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

function player1(p1Position, p2Position) {
  createBoard(p1Position, p2Position);

  const p1CurrentPosition = getBox("Current Position : " + p1Position);
  console.log("\n\n" + "🧑🏻‍💼 Player1\n" + p1CurrentPosition);

  prompt("Hit return to roll the dice 🎲");
  const p1RolledNum = rollDice();
  p1Position += p1RolledNum;

  p1Position = nextPosition(p1Position, p1RolledNum);

  console.clear();
  console.log(getBox("Player1 Rolled number :" + p1RolledNum));

  return p1Position;
}

function player2(p2Position, p1Position) {
  createBoard(p1Position, p2Position);

  const p2CurrentPosition = getBox("Current Position : " + p2Position);
  console.log("\n\n" + "👩🏻‍💼 Player2\n" + p2CurrentPosition);

  prompt("Hit return to roll the dice 🎲");
  const p2RolledNum = rollDice();
  p2Position += p2RolledNum;

  p2Position = nextPosition(p2Position, p2RolledNum);

  console.clear();
  console.log(getBox("Player2 Rolled number :" + p2RolledNum));

  return p2Position;
}

function startPlaying() {
  let p1Position = 0;
  let p2Position = 0;

  while (p1Position !== 100 && p2Position !== 100) {
    // Player1
    p1Position = player1(p1Position, p2Position);
    console.log("🧑🏻‍💼Player1 :" + p1Position + "\t👩🏻‍💼 Player2 :" + p2Position);

    if (p1Position === 100) {
      console.log("\n🏆Congratulations! Player1 won the Game. 🏆\n");
      break;
    }

    // Player2
    p2Position = player2(p2Position, p1Position);
    console.log("🧑🏻‍💼Player1 :" + p1Position + "\t👩🏻‍💼 Player2 :" + p2Position);

    if (p2Position === 100) {
      console.log("\n🏆Congratulations! Player2 won the Game. 🏆\n");
    }
  }

  if (confirm("\nDo you want to play new game?")) {
    startPlaying();
  } else {
    console.log("\nGoodBye!\n");
  }
}

console.log(getBox("🐍🪜 WELCOME TO SNAKE AND LADDER GAME 🪜🐍"));
const start = confirm("Do you want to start the game?");

if (start) {
  startPlaying();
} else {
  console.log(getBox("\nGoodBye!\n"));
}
