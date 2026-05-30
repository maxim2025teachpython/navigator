const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");

// Пример данных — можешь заменить на свои
const data = [
    "Навигация по проекту",
    "Компоненты интерфейса",
    "Работа с API",
    "Система модулей",
    "Настройки приложения",
    "Справочник функций"
];

function renderResults(items) {
    resultsList.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        resultsList.appendChild(li);
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        renderResults([]);
        return;
    }

    const filtered = data.filter(item =>
        item.toLowerCase().includes(query)
    );

    renderResults(filtered);
});
