let resources = { wood: 0, stone: 0, iron: 0 };
let inventory = [];

function gatherResource(resource) {
  let amount = Math.floor(Math.random() * 3) + 1; // Собираем от 1 до 3 единиц
  resources[resource] += amount;
  document.getElementById(resource).textContent = resources[resource];
  alert(`Ты собрал ${amount} единиц ${resource}.`);
}

function craftTool() {
  if (resources.wood >= 2 && resources.stone >= 1) {
    resources.wood -= 2;
    resources.stone -= 1;
    inventory.push('Деревянная кирка');
    document.getElementById('wood').textContent = resources.wood;
    document.getElementById('stone').textContent = resources.stone;
    alert('Ты создал деревянную кирку!');
  } else {
    alert('Недостаточно ресурсов для создания кирки.');
  }
}

function showInventory() {
  let inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = '';
  if (inventory.length === 0) {
    inventoryList.innerHTML = '<li>Инвентарь пуст.</li>';
  } else {
    inventory.forEach(item => {
      let li = document.createElement('li');
      li.textContent = item;
      inventoryList.appendChild(li);
    });
  }
}

function exitGame() {
  if (confirm('Ты уверен, что хочешь выйти из игры?')) {
    window.location.href = 'https://github.com';
  }
}