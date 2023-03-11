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

  result.textContent = String(expressionCalculation(expressions));
  expressions = [String(expressionCalculation(expressions))];

  console.log(expressions);
  console.log(result.textContent);
};

const handleOperatorClick = (button: Element) => {
  let last = expressions.at(-1) || "0";

  if (isNum(button.textContent)) {
    if ((isNum(last) || last.trim() === ".") && last !== "0") {
      replaceLastIndex(last.trim() + button.textContent);
    } else {
      if (last.trim() === "-") {
        replaceLastIndex(last.trim() + button.textContent);
      } else {
        pushOperator(button.textContent);
      }
    }
  } else {
    if (button.textContent === ".") {
      if (
        isNum(last) &&
        last.at(-1) !== "." &&
        Number.isInteger(Number(last))
      ) {
        replaceLastIndex(last + button.textContent.trim());
      }
    } else {
      if (isNum(last)) {
        pushOperator(` ${button.textContent} `);
      } else {
        replaceLastIndex(` ${button.textContent} `);
      }
    }
  }

  console.log(expressions);
  console.log(result.textContent);
};

const isNum = (str: string) => {
  if (isNaN(Number(str))) return false;
  else return true;
};

const expressionCalculation = (expressions: string[]) => {
  let last = expressions.at(-1) || "0";
  if (!isNum(last)) expressions.pop();

  let deleteZero = expressions
    .join("")
    .split(" ")
    .map((item) => (isNum(item) ? Number(item) : item));

  return eval(deleteZero.join(""));
};

const replaceLastIndex = (str: string) => {
  if (isNum(str) || str.trim() === ".") result.textContent = str;
  expressions.pop();
  expressions.push(str);
};

const pushOperator = (str: string) => {
  if (isNum(str) || str.trim() === ".") result.textContent = str;
  expressions.push(str);
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
