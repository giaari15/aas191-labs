// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=8Qy8thGnPY3lCd2wdgJj', // Your style URL
    center: [-118.45, 34.05], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// adding markers
function addMarker(lat,lng,title,message){
    new maplibregl.Marker()
        .setLngLat([lng,lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(`<h1 id="popupTitle">${title}</h1> <h3 id="popupBody">${message}</h3>`))
        .addTo(map)
    createButtons(lat,lng,title,message)
};

function createButtons(lat,lng,title,message){
        const newButton = document.createElement("button"); 
        newButton.id = "button"+title; 
        newButton.innerHTML = title; 
        newButton.setAttribute("lat",lat); 
        newButton.setAttribute("lng",lng); 
        newButton.addEventListener('click', function(){
            map.flyTo({
                center: [lng,lat], 
            })
    })
    document.getElementById("contents").appendChild(newButton);
}

addMarker(34.026199,-118.432823,"Brothers Cousins","Taco stand I went to with my organizer friends")
addMarker(34.06306,-118.44803,"In N Out","Drove by here nearly everyday")
addMarker(34.072151,-118.439629,"Royce Hall","Where the 1st Palestine solidarity encampment was at UCLA")
addMarker(34.058079,-117.75072,"2nd Sat","Night market in Pomona my friends would display art at")

function hiddenMarkers(lat,lng,message){
    new maplibregl.Marker()
        .setLngLat([lng,lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(`<h3 id="popupBody">${message}</h3>`))
        .addTo(map)
    hiddenButton(lat,lng)
};

function hiddenButton(lat,lng){
    const newButton = document.createElement("button");
    newButton.id = "button";
    newButton.innerHTML = "? ? ?"
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("otherContents").appendChild(newButton);
}

hiddenMarkers(34.11,-117.59,"this is where july is. save me. the heat will swallow us all.")

function processData(results){
    console.log(results)
    results.features.forEach(result => {
        let latitude = result.geometry.coordinates[1];
        let longitude = result.geometry.coordinates[0];
        let title = result.properties.title;
        let message = result.properties.message;
        addMarker(latitude,longitude,title,message)
    })
}

map.on("load", function(){
    fetch("map.geojson")
        .then(response => {
            return response.json()
    })
        .then(results => {
            processData(results);
    });
});


