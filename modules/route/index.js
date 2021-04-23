import {getColors, setGradient, setGradientFromSpeed} from "./color";

let MAX_SPEED = 30;

const setMaxSpeed = (SPEED) => {
    MAX_SPEED = SPEED;
}
const removeRoute = (map, name) => {
    map.removeLayer(`${name}`);
    map.removeSource(`${name}`);
}
const getStops = (distances, speeds) => {
    const stops = [];
    let routeLength = 0;
    let o = 0;
    const myColor = getColors(MAX_SPEED + 1);
    for (const LENGTH of distances.route) {
        const SPEED = speeds[o++];
        const ARR_NR = SPEED >= MAX_SPEED ? MAX_SPEED : SPEED;
        routeLength += LENGTH;
        const STOP = (routeLength / distances.totalLength);
        stops.push(STOP, myColor[ARR_NR]);
    }
    return stops;
}

const addToMap = (map, output) => {
    // sources.push(output.name);
    map.addSource(`${output.name}`, {
        type: 'geojson',
        data: output.geojson,
        lineMetrics: true
    });
    output.layer.id = output.name;
    map.addLayer(output.layer);
}

const colorRoute = (route = {}) => {
    const STOPS = getStops(route.distances, route.speeds);
    const output = {name: route.name};

    output.geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': route.coords
                }
            }
        ]
    };
    const GRADIENT = [
        'interpolate',
        ['linear'],
        ['line-progress'],
        ...STOPS];

    output.layer = {
        type: 'line',
        source: `${route.name}`,
        id: 'line',
        paint: {
            'line-color': 'red',
            'line-width': 6,
            'line-gradient': GRADIENT
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    }
    return output;
}

export {colorRoute, setMaxSpeed, setGradient, setGradientFromSpeed, addToMap, removeRoute};