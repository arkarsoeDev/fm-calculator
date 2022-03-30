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
let calcNo = 0;
//number
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    let data = e.currentTarget.getAttribute("data-value");
    if (data === ".") {
      let input = currentInput;
      input = currentInput.split(/[x,+,-,/]/);
      if (
        input[input.length - 1].includes(".") &&
        !(currentInput[currentInput.length - 1] === " ")
      ) {
        return;
      }
    }
    currentInput += data;
    input.value = numberWithCommas(currentInput);
  });
});

// calc
calcs.forEach((calc) => {
  calc.addEventListener("click", (e) => {
    if (
      currentInput.length > 0 &&
      !(currentInput[currentInput.length - 1] === " ")
    ) {
      let data = e.currentTarget.getAttribute("data-value");
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
  if (currentInput[currentInput.length - 1] === " ") {
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
  if (
    currentInput.length > 0 &&
    calcNo > 0 &&
    !(currentInput[currentInput.length - 1] === " ")
  ) {
    currentInput = xFinder(currentInput);
    currentInput = eval(currentInput);
    input.value = numberWithCommas(currentInput.toString());
    calcNo = 0;
    currentInput = currentInput.toString();
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
