import {getColors, setGradient, setGradientFromSpeed} from "./color";

let MAX_SPEED = 30;

const setMaxSpeed = (SPEED) => {
    MAX_SPEED = SPEED;
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

const colorRoute = (route = {}) => {
    console.log(route);
    const STOPS = getStops(route.distances, route.speeds);
    const geojson = {
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

    map.addSource('color-route', {
        type: 'geojson',
        data: geojson,
        lineMetrics: true
    });
    //

    const GRADIENT = [
        'interpolate',
        ['linear'],
        ['line-progress'],
        ...STOPS];

    map.addLayer({
        type: 'line',
        source: 'color-route',
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
    });

    map.addLayer({
        'id': 'symbols',
        'type': 'symbol',
        'source': 'color-route',
        'layout': {
            "symbol-placement": 'line',
            "icon-allow-overlap": true,
            "symbol-spacing": 2,
            "text-field": '>',
            "text-size": 17
        },
        "paint": {
            "text-color": '#fff',
            "text-halo-blur": 4,

        }
    });


}

export {colorRoute, setMaxSpeed, setGradient, setGradientFromSpeed};