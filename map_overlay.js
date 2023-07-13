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

    async function loadGeoJSON() {
        var municipalLayer;
        var johannesburgLayer;
        try {
            const response = await fetch('https://raw.githubusercontent.com/StoneAgeSunday/Municipal-Rancour/main/Maps/geoBoundaries-ZAF-ADM2-all/geoBoundaries-ZAF-ADM2.geojson');
            const jsonData = await response.json();

            // Create a geoJSON layer and add it to the map
            municipalLayer = L.geoJSON(jsonData, {
                filter: function(feature) {
                    return feature.properties.shapeName !== "City of Johannesburg";
                },
                style: {
                    color: 'rgb(255, 255, 255)',
                    weight: 2,
                    opacity: 1,
                    fillColor: 'rgb(255, 0, 0)',
                    fillOpacity: 0.2
                }
            }).addTo(map);

            // Create the Johannesburg layer
            johannesburgLayer = L.geoJSON(jsonData, {
                filter: function(feature) {
                    return feature.properties.shapeName === "City of Johannesburg";
                },
                style: {
                    color: 'rgb(255, 255, 255)',
                    weight: 2,
                    opacity: 1,
                    fillColor: 'rgb(255, 255, 255)',
                    fillOpacity: 0.5
                }
            }).addTo(map);

            var startTime = null;
            var duration = 10000; // 10 seconds
            var initialColor = 'rgb(255, 255, 255)';
            var targetColor = 'rgb(0, 255, 0)';
            var frameNum = 0;
            var progress = 0;
            var elapsed = 0;

            async function animateColor(timestamp, initialColor, targetColor) {
                try{
                    if (!startTime) {
                        startTime = timestamp;
                        progress = 0;
                    }

                    elapsed = timestamp - startTime;
                    progress = elapsed / duration;

                    if (progress > 1) {
                        progress = 1; // Ensure progress doesn't exceed 1
                    }

                    if (progress < 1) {
                        var currentColor = getColorTransition(initialColor, targetColor, progress);

                        var johannesburgStyle = {
                            color: 'rgb(255, 255, 255)',
                            weight: 2,
                            opacity: 1,
                            fillColor: currentColor,
                            fillOpacity: 0.5
                        };

                        johannesburgLayer = L.geoJSON(jsonData, {
                            filter: function(feature) {
                                return feature.properties.shapeName === 'City of Johannesburg';
                            },
                            style: johannesburgStyle
                        });
                        map.addLayer(johannesburgLayer);
                        //johannesburgLayer.addTo(map);
                        frameNum += 1;
                        console.log(frameNum.toString() + "th frame about to be drawn");
                        setTimeout(() => requestAnimationFrame((timestamp) => animateColor(timestamp, initialColor, targetColor)), 1000);
                    }
                } catch(error){
                    console.error('Animation error', error);
                }
            }

            function startAnimation() {
                frameNum += 1;
                console.log(frameNum.toString() + "th frame about to be drawn");
                setTimeout(() => requestAnimationFrame((timestamp) => animateColor(timestamp, initialColor, targetColor)), 1000);
            }

            function reset() {
                startTime = null;
                //map.clearLayers();
                // Remove the existing Johannesburg layer from the map
                /*
                if (johannesburgLayer) {
                    map.removeLayer(johannesburgLayer);
                }
                */
                /*
                map.eachLayer(function(layer){
                    map.removeLayer(layer);
                })
                */
                map.removeLayer(municipalLayer);
                municipalLayer = L.geoJSON(jsonData, {
                    filter: function(feature) {
                        return feature.properties.shapeName !== "City of Johannesburg";
                    },
                    style: {
                        color: 'rgb(255, 255, 255)',
                        weight: 2,
                        opacity: 1,
                        fillColor: 'rgb(255, 0, 0)',
                        fillOpacity: 0.2
                    }
                }).addTo(map);


                // Create the Johannesburg layer
                johannesburgLayer = L.geoJSON(jsonData, {
                    filter: function(feature) {
                        return feature.properties.shapeName === "City of Johannesburg";
                    },
                    style: {
                        color: 'rgb(255, 255, 255)',
                        weight: 2,
                        opacity: 1,
                        fillColor: 'rgb(255, 255, 255)',
                        fillOpacity: 0.5
                    }
                }).addTo(map);
            }

            function showLayers(){
                // Iterate over the layers and log their information
                map.eachLayer(function(layer) {
                    //console.log(layer); // Output the layer object to the console

                    // You can access specific properties of the layer if needed
                    //console.log(layer.options); // Output the options/settings of the layer
                    //console.log(layer.getAttribution()); // Output the attribution of the layer
                    console.log(layer.style);
                });
            }

            // Start the animation when a button is clicked, for example
            document.getElementById('start-animation-button').addEventListener('click', startAnimation);

            document.getElementById('reset-button').addEventListener('click', reset);

            document.getElementById('show-layers-button').addEventListener('click', showLayers);

        } catch (error) {
            console.error('Main error:', error);
        }
    }

    loadGeoJSON();

    function getColorTransition(initialColor, endColor, progress) {
        var initArr = parseRGB(initialColor);
        var endArr = parseRGB(endColor);

        var r = Math.round(initArr[0] + ((endArr[0] - initArr[0]) * progress));
        var g = Math.round(initArr[1] + ((endArr[1] - initArr[1]) * progress));
        var b = Math.round(initArr[2] + ((endArr[2] - initArr[2]) * progress));

        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    function parseRGB(colorString) {
        const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
        const matches = colorString.match(regex);

        if (matches) {
            const [, red, green, blue] = matches;
            return [parseInt(red), parseInt(green), parseInt(blue)];
        }

        return null; // Return null if the colorString does not match the expected format
    }

});
