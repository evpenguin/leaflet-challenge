//initialise map
let myMap = L.map("map", {
    center: [0,0],
    zoom: 2
});
  
// Adding a tile layer (the background map image) to our map:
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

//get data
d3.json(url).then(function(response) {

    let data = response.features;
    
      // Define arrays to hold the created city and state markers.
      let earthquakes = [];
      
      // Loop through locations, and create the city and state markers.
      for (let i = 0; i < data.length; i++) {
      
        // Set the marker radius for the city by passing the population to the markerSize() function.
        earthquakes.push(
          L.circle([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.75,
            //color: , //chloropleth function,//
            //fillColor: , //chloropleth function,
            radius: data[i].geometry.coordinates[2]*1000
          })
        );
      };
      
      // Create the base layers.
      let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      
      let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });
      
      // Create two separate layer groups: one for the city markers and another for the state markers.
      let markers = L.layerGroup(earthquakes);
      
      // Create an overlay object.
      let overlayMaps = {
        "Earthquakes": markers
      };
      
      // Pass our map layers to our layer control.
      // Add the layer control to the map.
      markers.addTo(myMap);
      
  
});

function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 150;
};

function markerColour(depth) {
    
}