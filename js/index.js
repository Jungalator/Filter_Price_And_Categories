"use strict";
import { products } from "./templates/templates.js";

let sum = "";

const container = document.createElement("div");
container.className = "container";

const sumPriceContainer = document.createElement("div");
sumPriceContainer.className = "sum-price-container";
sumPriceContainer.textContent = sum;

const messageContainer = document.createElement("div");
messageContainer.className = "message-container";

const paramsContainer = document.createElement("div");
paramsContainer.className = "params-container";

const itemContainer = document.createElement("div");
itemContainer.className = "item-container";

const itemList = document.createElement("ul");
itemList.className = "itemList";

const labelElectronic = document.createElement("label");
labelElectronic.textContent = "Электроника";
labelElectronic.style.marginRight = "20px";

const electronicCategory = document.createElement("input");
electronicCategory.type = "checkbox";

const labelDress = document.createElement("label");
labelDress.textContent = "Одежда";

const dressCategory = document.createElement("input");
dressCategory.type = "checkbox";

const filterPriceForm = document.createElement("form");
filterPriceForm.className = "filter-price-form";
const minPrice = document.createElement("input");
minPrice.type = "number";
minPrice.id = "minPrice";
minPrice.placeholder = "min price";
minPrice.className = "price-input";

const maxPrice = document.createElement("input");
maxPrice.type = "number";
maxPrice.id = "maxPrice";
maxPrice.placeholder = "max price";
maxPrice.className = "price-input";

const filterPriceBtn = document.createElement("button");
filterPriceBtn.type = "submit";
filterPriceBtn.className = "filter-price-btn";
filterPriceBtn.textContent = "Фильтровать";

const updateProducts = products.map((item) => ({
  ...item,
  price: (item.price += " 💰"),
  category:
    item.category === "Электроника"
      ? (item.category += " 💻")
      : (item.category += " 👔"),
}));

function filterProducts(event) {
  event.preventDefault();

  // Преобразуем значения цены в число
  const minPriceValue = minPrice.value ? Number(minPrice.value) : 0;
  const maxPriceValue = maxPrice.value ? Number(maxPrice.value) : Infinity;
  //Проверяем, какие чекбоксы включены
  itemList.textContent = "";

  const isElectronicsChacked = electronicCategory.checked;
  const isDressChacked = dressCategory.checked;

  const filteredItems = updateProducts.filter((item) => {
    const price = parseInt(item.price);

    const matchesPrice = price >= minPriceValue && price <= maxPriceValue;
    const matchesCategory =
      (isElectronicsChacked && item.category.includes("Электроника")) ||
      (isDressChacked && item.category.includes("Одежда")) ||
      (!isElectronicsChacked && !isDressChacked);
    return matchesPrice && matchesCategory;
  });

  filteredItems.forEach((item) => {
    itemList.insertAdjacentHTML(
      "afterbegin",
      `
  <li>${item.name} ${item.price} ${item.category}</li>

        `
    );
  });

  const someProducts = filteredItems.some(
    (item) => parseInt(item.price) <= 1000
  );
  const allExpensive = filteredItems.every(
    (item) => parseInt(item.price) > 3500
  );

  if (someProducts) {
    messageContainer.textContent = "🎉 Есть выгодные предложения!";
  } else if (allExpensive) {
    messageContainer.textContent = "💎 Только премиум-товары!";
  } else {
    messageContainer.textContent = "📌 Есть товары в среднем ценовом сегменте!";
  }

  const sumPrice = filteredItems.reduce((acc, item) => {
    return acc + parseInt(item.price);
  }, 0);
  sum = 0;
  sumPriceContainer.textContent = `Сумма: ${(sum += sumPrice)} 💰`;
}

filterPriceBtn.addEventListener("click", filterProducts);
electronicCategory.addEventListener("change", filterProducts);
dressCategory.addEventListener("change", filterProducts);

function renderItems() {
  updateProducts.forEach((item) => {
    if (Number(minPrice.value) === 0 && Number(maxPrice.value) === 0) {
      itemList.insertAdjacentHTML(
        "afterbegin",
        `
    <li>${item.name} ${item.price}   ${item.category}</li>

    `
      );
    }
  });
}

renderItems();

document.body.appendChild(container);
container.append(
  paramsContainer,
  itemContainer,
  sumPriceContainer,
  messageContainer
);
itemContainer.append(itemList);
labelElectronic.append(electronicCategory);
labelDress.append(dressCategory);
paramsContainer.append(filterPriceForm, labelElectronic, labelDress);
filterPriceForm.append(minPrice, maxPrice, filterPriceBtn);
