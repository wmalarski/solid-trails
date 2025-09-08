export const randomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const darker = randomColor
    .split("")
    .map((entry) => Number.parseInt(entry, 16) % 7)
    .join("");

  return `#${darker}`.padEnd(7, "0");
};
