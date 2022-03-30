// for toggle
const themes = document.querySelectorAll(".theme-toggle");
const themeControl = document.querySelector(".theme");
const themeTitle = document.querySelector(".theme-title");

let currentTheme = "theme1";
themes.forEach((theme) => {
  theme.addEventListener("click", (e) => {
    currentTheme = e.currentTarget.value;
    attachTheme(currentTheme);
  });
});

function attachTheme(theme) {
  themeControl.classList = `theme ${theme}`;
}

themeTitle.addEventListener("click", () => {
  let currentNo = +currentTheme[currentTheme.length - 1];
  currentNo++;
  if (currentNo < 0) {
    currentNo = 3;
  }
  if (currentNo > 3) {
    currentNo = 1;
  }
  currentTheme = "theme" + currentNo;
  let currentToggle = document.querySelector(`#${currentTheme}`);
  currentToggle.click();
});
//////////
// for calculate
const keys = document.querySelectorAll(".number");
const calcs = document.querySelectorAll(".calc");
const del = document.querySelector(".key-button__del");
const reset = document.querySelector(".key-button__reset");
const equal = document.querySelector(".key-button__equal");
const input = document.querySelector(".screen");

let currentInput = "";
let currentNum;
let numArr;
let calcNo = 0;
let lastKey;
//number
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    findLastKey();
    let data = e.currentTarget.getAttribute("data-value");
    findCurrentNum();
    if (data === ".") {
      if (currentNum.includes(".") || !lastKey === " ") {
        return;
      }
    }
    if (currentNum.length == 1) {
      if (
        data === "0" &&
        !currentNum.includes(".") &&
        currentNum.includes("0")
      ) {
        return;
      }
      if (currentNum[0] === "0") {
        if (data !== ".")
          currentInput = currentInput.slice(0, currentInput.length - 1);
      }
    }
    currentInput += data;
    input.value = numberWithCommas(currentInput);
  });
});

// calc
calcs.forEach((calc) => {
  calc.addEventListener("click", (e) => {
    findLastKey();
    let data = e.currentTarget.getAttribute("data-value");
    if (data === "-" && !(lastKey === "-")) {
      if (lastKey === ".") {
        return;
      }
      if (lastKey === " " || currentInput.length == 0) {
        currentInput += "-";
        input.value = currentInput;
        return;
      }
    }
    if (
      currentInput.length > 0 &&
      !(lastKey === " ") &&
      !(lastKey === "-") &&
      !(lastKey === ".")
    ) {
      if (data === "*") {
        currentInput += " x ";
      } else {
        currentInput += ` ${data} `;
      }
      input.value = numberWithCommas(currentInput);
      calcNo++;
    }
  });
});

//delete
del.addEventListener("click", () => {
  findLastKey();
  if (lastKey === " ") {
    currentInput = currentInput.slice(0, currentInput.length - 3);
    calcNo--;
  } else if (currentInput.length) {
    currentInput = currentInput.slice(0, currentInput.length - 1);
  }
  input.value = numberWithCommas(currentInput);
});

//reset
reset.addEventListener("click", (e) => {
  currentInput = "";
  input.value = currentInput;
});

//equal
equal.addEventListener("click", () => {
  findLastKey();
  if (currentInput.length > 0 && calcNo > 0 && !(lastKey === " ")) {
    currentInput = xFinder(currentInput);
    currentInput = removeZero(currentInput);
    currentInput = eval(currentInput);
    currentInput = currentInput.toString().includes(".")
      ? +currentInput.toFixed(2)
      : +currentInput;
    input.value = numberWithCommas(currentInput.toString());
    calcNo = 0;
    if (isNaN(currentInput) || !isFinite(currentInput)) {
      currentInput = "";
    } else {
      currentInput = currentInput.toString();
    }
  }
});

//xfinder
function xFinder(str) {
  if (str.indexOf("x")) {
    return str.replace("x", "*");
  }
}

// comma adder
function numberWithCommas(x) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//remove zero
function removeZero(str) {
  let strArr = [];
  let newStr = str.split(/[\s]/);
  newStr.map((s) => {
    if (!isNaN(s)) {
      s = +s.toString();
    }
    strArr.push(s);
  });
  newStr = strArr.join(" ");
  return newStr;
}

// find currentNum
function findCurrentNum() {
  let regex = /x+-\//g;
  if (regex.test(currentInput)) {
    numArr = currentInput.split(regex);
  } else {
    numArr = currentInput.split(" ");
  }
  currentNum = numArr[numArr.length - 1];
}

// find last key
function findLastKey() {
  lastKey = currentInput[currentInput.length - 1];
}
