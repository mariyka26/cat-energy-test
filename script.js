// СЛАЙДЕР

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

// КАРТА

ymaps.ready(init);
function init() {
  var map = new ymaps.Map("map", {
    center: [59.938635, 30.323118], // координаты ул. Большая Конюшенная, 19/8
    zoom: 17,
    controls: ["zoomControl"],
  });

  var placemark = new ymaps.Placemark(
    [59.938635, 30.323118],
    {
      hintContent: "Cat Energy",
      balloonContent: "ул. Большая Конюшенная, д. 19/8, Санкт-Петербург",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "./assets/img/map-pin.png",
      iconImageSize: [50, 50],
      iconImageOffset: [-25, -50],
    }
  );

  map.geoObjects.add(placemark);

  // Функция для настройки карты в зависимости от размера экрана
  function adjustMapForScreenSize() {
    setTimeout(() => {
      if (window.innerWidth > 1199) {
        const pixelCenter = map.getGlobalPixelCenter();
        map.setGlobalPixelCenter([pixelCenter[0] - 250, pixelCenter[1] + 0]);
      } else {
        // Возвращаем карту к центру на планшете/мобильном
        map.setCenter([59.938635, 30.323118]);
      }
    }, 100);
  }

  adjustMapForScreenSize();

  // По умолчанию отключаем скролл
  map.behaviors.disable("scrollZoom");

  // Когда курсор заходит в карту — включаем зум колесиком
  map.events.add("mouseenter", () => {
    map.behaviors.enable("scrollZoom");
  });

  // Когда курсор уходит — снова выключаем
  map.events.add("mouseleave", () => {
    map.behaviors.disable("scrollZoom");
  });

  // Также можно добавить управление мышью (drag)
  map.events.add("click", () => {
    map.behaviors.enable("drag");
  });

  map.events.add("mouseleave", () => {
    map.behaviors.disable("drag");
  });
  map.behaviors.disable("scrollZoom"); // отключаем скролл для удобства
}

// Ленивая загрузка — карта появится, когда элемент виден
document.addEventListener("DOMContentLoaded", () => {
  const mapBlock = document.getElementById("map");
  if (!mapBlock) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadYandexMapScript(() => ymaps.ready(initYandexMap));
      observer.disconnect();
    }
  });

  observer.observe(mapBlock);
});

// БУРГЕР-МЕНЮ
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (burger && nav) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
      body.classList.toggle("menu-open");
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
      });
    });
  }
});
