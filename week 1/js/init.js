// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // Your style URL
    center: [-118.45, 34.05], // Starting position [lng, lat]
    zoom: 12 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-118.439629, 34.072151])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Royce Hall where the 1st Palestine solidarity encampment was at UCLA'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([-118.44803, 34.06306])
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML('In N Out Drive Thru Entrance where I used to drive by everyday'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([-118.432823, 34.026199])
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML('Brothers Cousins Taco Stand I went to with my organizer friends'))
    .addTo(map);
