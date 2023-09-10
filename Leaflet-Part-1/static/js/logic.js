//initialise map
let myMap = L.map("map", {
    center: [0,0],
    zoom: 2
});
  
// Adding a tile layer (the background map image) to our map:
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//get data
d3.json(url).then(function(response) {

    let data = response.features;
    
      // Define arrays to hold the created city and state markers.
      let earthquakes = [];
      
      // Loop through locations, and create the city and state markers.
      for (let i = 0; i < data.length; i++) {
      
        // Set up markers
        earthquakes.push(
          L.circle([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], {
            stroke: true,
            weight: 1,
            fillOpacity: 1,
            color: "black",
            fillColor: markerColour(data[i].geometry.coordinates[2]),
            radius: markerSize(data[i].properties.mag)
          }).bindPopup(`<p>Location: ${data[i].properties.place}</p>
            <p>Magnitude: ${data[i].properties.mag}</p>
            <p>Depth: ${data[i].geometry.coordinates[2]}km`)
        );
      };
      
      //create layer group for the markers
      let markers = L.layerGroup(earthquakes);
      
      // Create an overlay object.
      let overlayMaps = {
        "Earthquakes": markers
      };
      //add to the map
      markers.addTo(myMap);
      

  //create legend
  //adapted from https://codepen.io/haakseth/pen/KQbjdO
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let labels = ["-10 - 10", "10 - 30", "30 - 50", "50 - 70", "70 - 90", "90+"];
      
    let legendInfo = ``
    for (i = 0; i < colours.length; i++ ) {
      legendInfo += `<i style="background:${colours[i]}"></i><span>${labels[i]}</span><br>`
    }
    div.innerHTML = legendInfo;
    return div;
  };
      
  // Adding the legend to the map
  legend.addTo(myMap);
});

//caculates the size of the marker based on the magnitude
function markerSize(magnitude) {
    return (magnitude*50000)
};

//list of the colours 
let colours = ["#ffb56b", "#e16b5d", "#ca485c", "#ac255e", "#5b1060", "#1f005c"]

//calculates the colour of each marker based on depth
function markerColour(depth) {
    if(depth < 10) {
      return colours[0]
    }
    else if( depth < 30) {
      return colours[1]
    }
    else if (depth < 50) {
      return colours[2]
    }
    else if (depth < 70) {
      return colours[3]
    }
    else if (depth < 90) {
      return colours[4]
    }
    else {
      return colours[5]
    }
}