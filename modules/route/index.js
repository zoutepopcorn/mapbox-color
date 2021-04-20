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
const addToMap = (map, output) => {
    map.addSource(`${output.name}`, {
        type: 'geojson',
        data: output.geojson,
        lineMetrics: true
    });
    map.addLayer(output.layer);

    // const URL = '/arrow_white.png';
    // map.loadImage(URL,  (err, image) => {
    //     if (err) {
    //         console.error('err image', err);
    //         return;
    //     }
    // map.addImage('arrow', image);
    // map.addLayer(output.arrowLayer);
    // });
    // map.addLayer({
    //     "id": "symbols",
    //     "type": "symbol",
    //     "source": `${output.name}`,
    //     "layout": {
    //         "symbol-placement": "line",
    //         "text-font": ["Open Sans Regular"],
    //         "text-field": '>',
    //         "text-size": 18
    //     }
    // });

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
    // output.arrowLayer = {
    //     'id': 'arrow-layer',
    //     'type': 'symbol',
    //     'source': `${route.name}`,
    //     'layout': {
    //         'symbol-placement': 'line',
    //         'symbol-spacing': 1,
    //         'icon-allow-overlap': true,
    //         'icon-image': 'arrow',
    //         'icon-size': 0.04,
    //         'visibility': 'visible'
    //     }
    // }
    output.arrowLayer = {
        'id': 'arrow2-layer',
        'type': 'symbol',
        'source': `${route.name}`,
        'layout': {
            'symbol-placement': 'line',
            'symbol-spacing': 1,
            'icon-allow-overlap': true,
            'icon-image': 'arrow',
            'icon-size': 0.04,
            'visibility': 'visible'
        }
    }
    return output;
    // map.addLayer({
    //     'id': 'symbols',
    //     'type': 'symbol',
    //     'source': 'color-route',
    //     'layout': {
    //         "symbol-placement": 'line',
    //         "icon-allow-overlap": true,
    //         "icon-anchor": "center",
    //         "symbol-spacing": 2,
    //         "text-field": '>',
    //         "text-size": 17
    //     },
    //     "paint": {
    //         "text-color": '#fff',
    //         "text-halo-blur": 4,
    //
    //     }
    // });
}

export {colorRoute, setMaxSpeed, setGradient, setGradientFromSpeed, addToMap};