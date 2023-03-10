import "./index.css";

const buttons = document.getElementsByClassName("btn");
const result = document.querySelector(".result");
let expressions: string[] = [];

const handleResetClick = () => {
  result.textContent = "0";
  expressions = [];

  console.log(result.textContent);
  console.log(expressions);
};

const handleCalculationClick = () => {
  if (!expressions.length) return;
};

const handleOperatorClick = (button: Element) => {};

const isNum = (str: string) => {
  if (isNaN(Number(str))) return false;
  else return true;
};

for (let i = 0; i < buttons.length; i++) {
  if (buttons[i].textContent === "C") {
    buttons[i].addEventListener("click", handleResetClick);
  } else if (buttons[i].textContent === "+/-") {
  } else if (buttons[i].textContent === "%") {
  } else if (buttons[i].textContent === "=") {
    buttons[i].addEventListener("click", handleCalculationClick);
  } else {
    buttons[i].addEventListener("click", () => handleOperatorClick(buttons[i]));
  }
}
