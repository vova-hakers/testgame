// Изначальные ресурсы и параметры игрока
let resources = {
  wood: 0,
  stone: 0,
  iron: 0
};

let playerHealth = 100;  // Здоровье игрока
let monsterHealth = 30;  // Здоровье монстра
let inventory = [];      // Инвентарь игрока

// Флаги для наличия оружия и брони
let hasSword = false;
let hasArmor = false;

// Функция для сбора ресурсов
function gatherResource(resource) {
  const resourceNames = {
    wood: "дерево",
    stone: "камень",
    iron: "железо"
  };

  if (resources[resource] !== undefined) {
    resources[resource] += 1;
    updateResourceDisplay();
    showMessage(`Вы собрали ${resourceNames[resource]}!`);
  } else {
    showMessage("Неверный ресурс.");
  }
}

// Обновление отображения ресурсов и здоровья
function updateResourceDisplay() {
  const resourceIds = ['wood', 'stone', 'iron'];
  resourceIds.forEach(resource => {
    document.getElementById(resource).textContent = resources[resource];
  });
  document.getElementById('health').textContent = playerHealth;
  document.getElementById('sword').textContent = hasSword ? "Меч: Есть" : "Меч: Нет";
  document.getElementById('armor').textContent = hasArmor ? "Броня: Есть" : "Броня: Нет";
}

// Функция для показа сообщения внизу экрана
function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';

  // Скрыть сообщение через 3 секунды
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 3000);
}

// Функция для создания предметов (кирка, меч, броня)
function craftItem(item) {
  const craftRequirements = {
    pickaxe: { wood: 3, stone: 2 },
    sword: { wood: 2, iron: 3, property: 'hasSword' },
    armor: { wood: 3, iron: 5, property: 'hasArmor' }
  };

  const requirements = craftRequirements[item];
  if (requirements && Object.keys(requirements).every(resource => resources[resource] >= requirements[resource])) {
    Object.keys(requirements).forEach(resource => resources[resource] -= requirements[resource]);
    if (requirements.property) {
      window[requirements.property] = true;
      inventory.push(item.charAt(0).toUpperCase() + item.slice(1));
    }
    updateResourceDisplay();
    showMessage(`Вы создали ${item}!`);
  } else {
    showMessage("Недостаточно ресурсов для создания предмета.");
  }
}

// Функция для показа инвентаря
function showInventory() {
  const inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = '';

  // Добавляем элементы в инвентарь
  inventory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    inventoryList.appendChild(li);
  });
}

// Функция для сражения с монстром
function fightMonster() {
  let damageToMonster = Math.floor(Math.random() * 15) + 5; // Урон монстру от игрока
  let damageToPlayer = Math.floor(Math.random() * 10) + 3;  // Урон игроку от монстра

  // Если у игрока есть меч, увеличиваем урон по монстру
  if (hasSword) {
    damageToMonster += 5;  // Меч дает бонусный урон
  }

  // Если у игрока есть броня, уменьшаем получаемый урон
  if (hasArmor) {
    damageToPlayer = Math.max(damageToPlayer - 3, 0);  // Броня уменьшает урон, но не дает уйти в минус
  }

  // Монстр получает урон
  monsterHealth -= damageToMonster;

  // Игрок получает урон
  playerHealth -= damageToPlayer;

  // Анимация атаки
  document.body.classList.add('attack-animation');
  setTimeout(() => document.body.classList.remove('attack-animation'), 1000);

  // Проверка на смерть игрока
  if (playerHealth <= 0) {
    playerHealth = 0;  // Убедимся, что здоровье не уходит в минус
    showDeathModal();
    return; // Прерываем бой, если игрок погиб
  }

  // Проверка на смерть монстра
  if (monsterHealth <= 0) {
    monsterHealth = 30;  // Восстанавливаем здоровье монстра
    showMessage("Вы победили монстра!");
  }

  // Обновление отображения здоровья
  updateResourceDisplay();
}

// Функция для показа модального окна при смерти игрока
function showDeathModal() {
  const modal = document.getElementById('deathModal');
  const restartButton = document.getElementById('restartButton');
  const exitButton = document.getElementById('exitButton');

  modal.style.display = 'block';

  restartButton.onclick = () => {
    // Возвращаем игрока в исходное состояние
    playerHealth = 100;
    resources = { wood: 0, stone: 0, iron: 0 };
    inventory = [];
    updateResourceDisplay();
    modal.style.display = 'none';
  };

  exitButton.onclick = exitGame;
}

// Функция для выхода из игры
function exitGame() {
  if (confirm("Вы действительно хотите выйти?")) {
    window.close();
  }
}