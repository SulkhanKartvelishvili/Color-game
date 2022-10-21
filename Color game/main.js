

const startBtn = document.querySelector("#start");
var allBoxes = document.querySelectorAll(".box");

const winnerColorBtn = document.querySelector("#winnerColor");
const resultBtn = document.querySelector("#result");
const levelBtn = document.querySelector(".btn-light");
var luckyColor = undefined;
var colorsCollection = [];
var gameLogic = false;
var k = 1;
function generateRand(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

function generateColor() {
  return `rgb(${generateRand(0, 255)},${generateRand(0, 255)},${generateRand(
    0,
    255
  )})`;
}
function resetGame() {
  resultBtn.classList.remove("btn-danger");
  resultBtn.classList.remove("btn-success");
  resultBtn.classList.add("btn-warning");
  resultBtn.textContent = "............";
}
var n =1;
levelBtn.addEventListener("click", function () {
  if (levelBtn.textContent == "Easy") {
    levelBtn.textContent = "Hard";
    k = 0;

    for (var i = 0; i < 3; i++) {
      document.getElementById("second").innerHTML +=
        '<div class="box " ></div>';
    }
  } else if (levelBtn.textContent == "Hard") {
    levelBtn.textContent = "Easy";
    k = 1;

    document.getElementById("second").innerHTML = "";
  }
  winnerColorBtn.textContent = "....................";
  allBoxes.forEach(item => {
    item.style.backgroundColor = "steelblue";
  });
  resetGame();
  allBoxes = document.querySelectorAll(".box");
  allBoxes.forEach(boxItem => {
    boxItem.addEventListener("click", function () {
      if (gameLogic) {
        if (luckyColor == this.style.backgroundColor.replaceAll(" ", "")) {
          resultBtn.textContent = "SUCCESS";
          resultBtn.classList.remove("btn-warning");
          resultBtn.classList.add("btn-success");
          gameLogic = false;
        } else {
          resultBtn.textContent = "FAILED";
          resultBtn.classList.remove("btn-warning");
          resultBtn.classList.add("btn-danger");
        }
        if (n > 0) {
          n--;
        } else {
          gameLogic = false;
        }
      }
    });
  });
});

function getRandomColorsList() {
  var tmpColors = [];
  if (k == 1) {
    while (tmpColors.length < 3) {
      tmpColors.push(generateColor());
    }
  } else if (k == 0) {
    while (tmpColors.length < 6) {
      tmpColors.push(generateColor());
    }
  }
  return tmpColors;
}

function setColorsToBoxes(colorsList) {
  allBoxes.forEach(item => {
    item.style.backgroundColor = colorsList.pop();
  });
}

function getLuckyColor(colorsList) {
  return colorsList[generateRand(0, colorsList.length - 1)];
}

startBtn.addEventListener("click", function () {
  colorsCollection = getRandomColorsList();
  luckyColor = getLuckyColor(colorsCollection);
  setColorsToBoxes(colorsCollection);
  winnerColorBtn.textContent = luckyColor;
  gameLogic = true;
  resetGame();

  allBoxes.forEach(boxItem => {
    boxItem.addEventListener("click", function () {
      if (gameLogic) {
        if (luckyColor == this.style.backgroundColor.replaceAll(" ", "")) {
          resultBtn.textContent = "SUCCESS";
          resultBtn.classList.remove("btn-warning");
          resultBtn.classList.add("btn-success");
        } else {
          resultBtn.textContent = "FAILED";
          resultBtn.classList.remove("btn-warning");
          resultBtn.classList.add("btn-danger");
        }
        gameLogic = false;
      }
    });
  });
});
