import "./index.css";

const buttons = document.getElementsByClassName("button");
const result = document.querySelector(".result");
let expressions: string[] = [];
let last = expressions.at(-1) || "0";

const handleResetClick = () => {
  if (!expressions.length) return;

  replaceElement("", "array");
};

const handleCalculationClick = () => {
  if (!expressions.length) return;

  replaceElement(String(calculation()), "array");

  if (expressions[0].includes("Infinity")) {
    replaceElement("", "array");
    alert("입력하신 내용은 계산할 수 없습니다.");
  }
};

const handlePercentClick = () => {
  if (!expressions.length) return;
  if (!isNumber(last)) onPop();

  replaceElement(String(Number(last) / 100));
};

const handleInvertClick = () => {
  if (!expressions.length) return;
  if (!isNumber(last)) onPop();

  replaceElement(String(Number(last) * -1));
};

const handleOperatorClick = (element: string) => {
  if (isNumber(element)) {
    if (!isOperator(last) && last !== "0") {
      replaceElement(last.trim() + element);
    } else {
      if (last === " - ") replaceElement(last.trim() + element);
      else addElement(element);
    }
  } else {
    if (element === ".") {
      if (isNumber(last) && !last.includes(".")) {
        replaceElement(last + element.trim());
      }
    } else {
      if (isNumber(last)) addElement(` ${element} `);
      else replaceElement(` ${element} `);
    }
  }
};

const calculation = (): number => {
  if (!isNumber(last)) onPop();

  let deleteZero = expressions
    .join("")
    .split(" ")
    .map((item) => (isNumber(item) ? Number(item) : item));

  return eval(deleteZero.join(""));
};

const replaceElement = (element: string, target: string = "element") => {
  if (!isOperator(element)) result.textContent = addComma(element);

  if (target === "element") {
    onPop();
    onPush(element);
  } else if (target === "array") onReplace(element);
};

const addElement = (element: string) => {
  if (!isOperator(element)) result.textContent = addComma(element);

  onPush(element);
};

const onReplace = (element: string) => {
  expressions = element.length ? [element] : [];
  last = expressions.at(-1) || "0";
};

const onPush = (element: string) => {
  expressions.push(element);
  last = expressions.at(-1) || "0";
};

const onPop = () => {
  expressions.pop();
  last = expressions.at(-1) || "0";
};

const addComma = (result: string) => {
  return Number(result).toLocaleString(undefined, {
    minimumFractionDigits: result.split(".")[1]?.length,
  });
};

const isOperator = (element: string) => {
  return !isNumber(element) && element !== " . ";
};

const isNumber = (element: string) => {
  if (isNaN(Number(element))) return false;
  else return true;
};

for (let i = 0; i < buttons.length; i++) {
  if (buttons[i].textContent === "C") {
    buttons[i].addEventListener("click", handleResetClick);
  } else if (buttons[i].textContent === "+/-") {
    buttons[i].addEventListener("click", handleInvertClick);
  } else if (buttons[i].textContent === "%") {
    buttons[i].addEventListener("click", handlePercentClick);
  } else if (buttons[i].textContent === "=") {
    buttons[i].addEventListener("click", handleCalculationClick);
  } else {
    buttons[i].addEventListener("click", () =>
      handleOperatorClick(buttons[i].textContent)
    );
  }
}
