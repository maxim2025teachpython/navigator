let map = L.map('map').setView([52.2297, 21.0122], 13); // Варшава по умолчанию

// OSM слой
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let userMarker;
let routeLine;

// Определяем геолокацию
navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    userMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup("Вы здесь")
        .openPopup();

    map.setView([lat, lon], 15);
});

// Кнопка построения маршрута
document.getElementById("routeBtn").addEventListener("click", async () => {
    const dest = document.getElementById("destination").value.trim();
    if (!dest) return alert("Введите место назначения");

    // Геокодинг (поиск координат)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(dest)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.length) {
        alert("Место не найдено");
        return;
    }

    const destLat = data[0].lat;
    const destLon = data[0].lon;

    // Удаляем старый маршрут
    if (routeLine) map.removeLayer(routeLine);

    // Строим линию маршрута
    const userPos = userMarker.getLatLng();
    routeLine = L.polyline([
        [userPos.lat, userPos.lng],
        [destLat, destLon]
    ], { color: 'yellow' }).addTo(map);

    map.fitBounds(routeLine.getBounds());
});
