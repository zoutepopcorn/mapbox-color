import {convertFromInput, convertGpx} from "./modules/convert";                               // or @mapbox-color/convert
import {setMaxSpeed, colorRoute, setGradient} from "./modules/route";  // or @mapbox-color/route

import {plotPoints} from "./modules/points"

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
        var reader = new FileReader();
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
            colorRoute(hike);
            plotPoints(hike);


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
    colorRoute(hike);
    plotPoints(hike);

}

map.on('load', async () => {
    await plotRoute();
});