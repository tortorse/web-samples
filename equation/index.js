const left = algebra.parse("x / 3 - 3");
const right = algebra.parse("x / 5 + 1");

const eq = new algebra.Equation(left, right);

const answer = eq.solveFor("x");

// console.log(answer.toString());
katex.render(algebra.toTex(eq), equation);

function f1(x) {
  return x / 3 - 3;
}

function f2(x) {
  return x / 5 + 1;
}

let i = 0;
let a = f1(i);
let b = f2(i);

while (true) {
  if (a === b) {
    break;
  }
  i++;
  a = f1(i);
  b = f2(i);
}

console.log(i);