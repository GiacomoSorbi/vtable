export const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export const mean = (arr) =>
  arr.reduce((total, amount, index, array) => {
    total += amount;
    if (index === array.length - 1) {
      return total / array.length;
    } else {
      return total;
    }
  });
