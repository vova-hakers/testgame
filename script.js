// Изначальные ресурсы и параметры игрока
let resources = {
  wood: 0,
  stone: 0,
  iron: 0
};

let playerHealth = 100;  // Здоровье игрока
let monsterHealth = 30;  // Здоровье монстра
let inventory = [];      // Инвентарь игрока

// Функция для сбора ресурсов
function gatherResource(resource) {
  if (resource === 'wood') {
    resources.wood += 1;
    updateResourceDisplay();
    showMessage("Вы срубили дерево!");
  } else if (resource === 'stone') {
    resources.stone += 1;
    updateResourceDisplay();
    showMessage("Вы собрали камень!");
  } else if (resource === 'iron') {
    resources.iron += 1;
    updateResourceDisplay();
    showMessage("Вы собрали железо!");
  }
}

// Обновление отображения ресурсов и здоровья
function updateResourceDisplay() {
  document.getElementById('wood').textContent = resources.wood;
  document.getElementById('stone').textContent = resources.stone;
  document.getElementById('iron').textContent = resources.iron;
  document.getElementById('health').textContent = playerHealth;
}

// Функция для показа сообщения внизу экрана
function showMessage(message) {
  var messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';

  // Скрыть сообщение через 3 секунды
  setTimeout(function() {
    messageElement.style.display = 'none';
  }, 3000);
}

// Функция для показа модального окна
function showModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Закрыть модальное окно
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Функция для создания кирки
function craftTool() {
  if (resources.wood >= 3 && resources.stone >= 2) {
    resources.wood -= 3;
    resources.stone -= 2;
    updateResourceDisplay();
    showMessage("Вы создали кирку!");
  } else {
    showMessage("Недостаточно ресурсов для создания кирки.");
  }
}

// Функция для создания меча
function craftSword() {
  if (resources.iron >= 3 && resources.wood >= 2) {
    resources.iron -= 3;
    resources.wood -= 2;
    inventory.push("Меч");
    updateResourceDisplay();
    showMessage("Вы создали меч!");
  } else {
    showMessage("Недостаточно ресурсов для создания меча.");
  }
}

// Функция для создания брони
function craftArmor() {
  if (resources.iron >= 5 && resources.wood >= 3) {
    resources.iron -= 5;
    resources.wood -= 3;
    inventory.push("Броня");
    updateResourceDisplay();
    showMessage("Вы создали броню!");
  } else {
    showMessage("Недостаточно ресурсов для создания брони.");
  }
}

// Функция для показа инвентаря
function showInventory() {
  var inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = '';
  
  // Добавляем элементы в инвентарь
  inventory.forEach(item => {
    var li = document.createElement('li');
    li.textContent = item;
    inventoryList.appendChild(li);
  });
}

// Функция для сражения с монстром
function fightMonster() {
  let damageToMonster = Math.floor(Math.random() * 15) + 5; // Урон монстру от игрока
  let damageToPlayer = Math.floor(Math.random() * 10) + 3;  // Урон игроку от монстра

  // Монстр получает урон
  monsterHealth -= damageToMonster;

  // Игрок получает урон
  playerHealth -= damageToPlayer;

  // Анимация атаки
  document.body.classList.add('attack-animation');
  setTimeout(() => document.body.classList.remove('attack-animation'), 1000);

  // Обновление отображения здоровья
  updateResourceDisplay();

  // Проверка, кто победил
  if (monsterHealth <= 0) {
    showMessage("Вы победили монстра!");
    monsterHealth = 30;  // Восстановить здоровье монстра для следующего сражения
  } else if (playerHealth <= 0) {
    showMessage("Вы погибли!");
    playerHealth = 100;  // Восстановить здоровье игрока после поражения
  }
}

// Функция для выхода из игры
function exitGame() {
  if (confirm("Вы действительно хотите выйти?")) {
    window.close();
  }
}