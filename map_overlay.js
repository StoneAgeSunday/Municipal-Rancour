$(document).ready(function() {
    var map = L.map('map').setView([-30.5595, 22.9375], 5);

    // Create a custom tile layer with Stamen's toner style
    var customTileLayer = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        noWrap: true, // Optional: Prevents the map from wrapping horizontally
    }).addTo(map);

    // Set the custom tile layer as the base layer
    map.addLayer(customTileLayer);

    fetch('https://raw.githubusercontent.com/StoneAgeSunday/Municipal-Rancour/main/Maps/geoBoundaries-ZAF-ADM2-all/geoBoundaries-ZAF-ADM2.geojson')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Create a GeoJSON layer and add it to the map
            L.geoJSON(data, {
                style: function(feature) {
                    if (feature.properties.shapeName === "City of Johannesburg") {
                        return {
                            color: 'rgb(0, 255, 0)',  // Set the color to RGB value (0, 255, 0) for Johannesburg Metropolitan
                            weight: 2,
                            opacity: 1
                        };
                    } else {
                        return {
                            color: 'rgb(255, 0, 0)',  // Set the color to RGB value (255, 0, 0) for all other municipalities
                            weight: 2,
                            opacity: 1
                        };
                    }
                }
            }).addTo(map)
        });
    });
        /*
        .then(function(data) {
            // Create a GeoJSON layer and add it to the map
            L.geoJSON(data, {
                style: {
                    color: 'red',  // Customize the boundary line color
                    weight: 2,     // Customize the boundary line weight
                    opacity: 1     // Customize the boundary line opacity
                }
            }).addTo(map);
        });
        */
    /*
    $.getJSON("//https://github.com/StoneAgeSunday/Municipal-Rancour/blob/main/Maps/geoBoundaries-ZAF-ADM2-all/geoBoundaries-ZAF-ADM2.geojson", function(data) {
        L.geoJSON(data).addTo(map);
    });
    */
    /*
    // Example GeoJSON data
    var geojsonData = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "Example Feature"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [25, -29]
                }
            }
        ]
    };
    */

    // Create a GeoJSON layer and add it to the map
    //L.geoJSON(geojsonData).addTo(map);
//https://github.com/StoneAgeSunday/Municipal-Rancour/blob/main/Maps/geoBoundaries-ZAF-ADM2-all/geoBoundaries-ZAF-ADM2.geojson
//'"C:\Web API Projects\Municipal Rancour\Project\maps\geoBoundaries-ZAF-ADM2-all\geoBoundaries-ZAF-ADM2.geojson"'
