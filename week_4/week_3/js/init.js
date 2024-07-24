// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=8Qy8thGnPY3lCd2wdgJj', // Your style URL
    center: [-117.377022, 33.980530], // Starting position [lng, lat]
    zoom: 12 // Starting zoom level
});

// adding markers
function addMarker(feature){
    let longitude = feature.lng;
    let latitude = feature.lat;
    let title = feature['Name of Thift']
    let popup_message;
    if (feature['Do you live in the Inland Empire?'] == "Yes"){
        popup_message = `<h2>IE Resident</h2> <h3>Location: ${feature['Name of Thrift']}</h3> <p>Residence Location: ${feature['What part of the IE do you reside in?']}</p>`
        createButtons(latitude,longitude,feature['Name of Thrift'])
    }
   else{
    popup_message = `<h2>Non-IE Resident</h2> <h3>Location: ${feature['Name of Thrift']}</h3>`
    createButtons(latitude,longitude,feature['Name of Thrift'])
    }
    new maplibregl.Marker()
        .setLngLat([longitude,latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
};

function createButtons(lat,lng,title){
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

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTcCWVHCRdOC4slzpOL1tdT26K9jQXKm4HXKOuyozGQl6uCNxMElPkfxxrG1UASsnX1uuD2OOEu_nao/pub?output=csv"

map.on('load', function() {
    Papa.parse(dataUrl, {
        download: true,
        header: true,
        complete: (results) => {
            console.log(results.data)
            processData(results.data);
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        console.log(feature)
        addMarker(feature);
    });
};

