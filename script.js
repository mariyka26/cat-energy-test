const range = document.querySelector(".example__range");
const before = document.querySelector(".example__image--before");
const after = document.querySelector(".example__image--after");

range.addEventListener("input", () => {
  const value = parseFloat(range.value);

  // Левая картинка (БЫЛО) — показываем левую часть
  before.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

  // Правая картинка (СТАЛО) — показываем правую часть
  after.style.clipPath = `inset(0 0 0 ${value}%)`;
});
