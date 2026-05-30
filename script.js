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

    const userPos = userMarker.getLatLng();

    // Запрос к OSRM для автомобильного маршрута
    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${userPos.lng},${userPos.lat};${destLon},${destLat}?overview=full&geometries=geojson`;

    const routeRes = await fetch(routeUrl);
    const routeData = await routeRes.json();

    if (!routeData.routes || !routeData.routes.length) {
        alert("Маршрут не найден");
        return;
    }

    const routeCoords = routeData.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);

    // Удаляем старый маршрут
    if (routeLine) map.removeLayer(routeLine);

    // Рисуем автомобильный маршрут
    routeLine = L.polyline(routeCoords, { color: 'yellow', weight: 5 }).addTo(map);

    map.fitBounds(routeLine.getBounds());
});
