const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function numberToWords(n: number): string {
  if (n <= 0) return "zero";
  if (n < 20) return ones[n];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return one ? `${tens[ten]}-${ones[one]}` : tens[ten];
}

const FOUNDED_YEAR = 1998;

export function getYearsOpen(): number {
  return new Date().getFullYear() - FOUNDED_YEAR;
}

export function getYearsOpenWords(): string {
  return numberToWords(getYearsOpen());
}
