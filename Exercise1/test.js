//Problem 1: Three ways to sum to n

const text = document.getElementById("test");

//1. Use a loop to loop from 1 to n
const sumUseLoop = (n) => {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
};

//2: Use Recursion
const sumUseRecursion = (n) => {
  if (n === 1) return 1;
  return n + sumUseRecursion(n - 1);
};

//3: Use Formula for Sum
const sumUseFormula = (n) => {
  return (n * (n + 1)) / 2;
};

// text.innerText = sumUseLoop(5);
// text.innerText = sumUseRecursion(6);
text.innerText = sumUseFormula(7);
