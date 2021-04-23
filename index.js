import {convertFromInput, convertGpx} from "./modules/convert";                               // or @mapbox-color/convert
import {setMaxSpeed, colorRoute, setGradient, setGradientFromSpeed, addToMap} from "./modules/route";  // or @mapbox-color/route
import {plotPoints} from "./modules/points"
import {plotArrows} from "./modules/arrows"

mapboxgl.accessToken = 'pk.eyJ1Ijoiem91dGVwb3Bjb3JuIiwiYSI6ImNqaDRxem9sNDE1Zmwyd2xuZG1iYTl0OXcifQ.r4qZMpEbr2FoCN4sd97kDw';

// const CENTER = [-121.353637, 40.584978];
const CENTER = [13.88, 46.37];

const map = (window.map = new mapboxgl.Map({
    container: 'map',
    center: CENTER,
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 12
}));

const handleFiles = async (files) => {
    console.log("files ", files);
    const file = document.getElementById('addGpx').files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
            const hike = convertFromInput(evt.target.result);
            console.log("hike ", hike);
            // You can set your colors
            setGradient([
                {color: 'purple', pos: 0},
                {color: 'blue', pos: 0.2},
                {color: 'green', pos: 0.25},
                {color: 'yellow', pos: 0.3},
                {color: 'orange', pos: 0.4},
                {color: 'red', pos: 1},
            ]);
            setMaxSpeed(70);
            const output = colorRoute(hike);
            addToMap(map, output);
            plotPoints(map, hike);
            zoomTo(output.geojson);
            console.log(hike);

        }
        reader.onerror = function (evt) {
            document.getElementById("fileContents").innerHTML = "error reading file";
        }
    }
    console.log("GPX ", file);
}

const inputElement = document.getElementById("addGpx");
inputElement.addEventListener("change", handleFiles, false);


const plotRoute = async () => {
    const hike = await convertGpx("routes/hike.gpx");
    // Option is to set your colors
    // setGradient([
    //     {color: 'purple', pos: 0},
    //     {color: 'blue', pos: 0.2},
    //     {color: 'green', pos: 0.25},
    //     {color: 'yellow', pos: 0.3},
    //     {color: 'orange', pos: 0.4},
    //     {color: 'red', pos: 1},
    // ]);
    // or from speed
    setGradientFromSpeed([
        {color: 'purple', pos: 0},
        {color: 'blue', pos: 10},
        {color: 'green', pos: 15},
        {color: 'yellow', pos: 25},
        {color: 'orange', pos: 30},
        {color: 'red', pos: 70}
    ]);

    setMaxSpeed(70);
    hike.name = "my-route";
    const output = colorRoute(hike);
    addToMap(map, output);
    plotArrows(map, hike);
    // plotPoints(map, hike);

    // console.log(output.geojson)
    zoomTo(output.geojson);
}

const zoomTo = (geojson) => {
    console.log(geojson);
    const coordinates = geojson.features[0].geometry.coordinates;
    const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(bounds, {
        padding: 20
    });
}

const makeColorGuide = () => {
    const grads = document.getElementById("gradients");

    const COLORS = [
        {color: 'purple', pos: 0},
        {color: 'blue', pos: 10},
        {color: 'green', pos: 15},
        {color: 'yellow', pos: 25},
        {color: 'orange', pos: 30},
        {color: 'red', pos: 70}
    ]


    for (let i = 1; i < COLORS.length; i++) {
        grads.innerHTML += `
        <div id="id4" class="tableDiv"
        style="background-image: linear-gradient(to right, ${COLORS[i-1].color}, ${COLORS[i].color});">
            <div>${COLORS[i].pos}</div>
        </div>`
    }
}


map.on('load', async () => {
    await plotRoute();
});


makeColorGuide();