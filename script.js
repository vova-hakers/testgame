// Изначальные ресурсы
let resources = {
  wood: 0,
  stone: 0,
  iron: 0
};

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

// Обновление отображения ресурсов
function updateResourceDisplay() {
  document.getElementById('wood').textContent = resources.wood;
  document.getElementById('stone').textContent = resources.stone;
  document.getElementById('iron').textContent = resources.iron;
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
  // Пример: создаем кирку, если есть достаточно ресурсов
  if (resources.wood >= 3 && resources.stone >= 2) {
    resources.wood -= 3;
    resources.stone -= 2;
    updateResourceDisplay();
    showMessage("Вы создали кирку!");
  } else {
    showMessage("Недостаточно ресурсов для создания кирки.");
  }
}

// Функция для показа инвентаря
function showInventory() {
  var inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = '';
  
  // Добавляем элементы в инвентарь
  if (resources.wood > 0) {
    var li = document.createElement('li');
    li.textContent = `Дерево: ${resources.wood}`;
    inventoryList.appendChild(li);
  }
  if (resources.stone > 0) {
    var li = document.createElement('li');
    li.textContent = `Камень: ${resources.stone}`;
    inventoryList.appendChild(li);
  }
  if (resources.iron > 0) {
    var li = document.createElement('li');
    li.textContent = `Железо: ${resources.iron}`;
    inventoryList.appendChild(li);
  }
}

// Функция для выхода из игры
function exitGame() {
  if (confirm("Вы действительно хотите выйти?")) {
    window.close();
  }
}