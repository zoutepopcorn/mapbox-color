import dayjs from 'dayjs'
import * as turf from '@turf/turf'

let TIME_FORMAT;

const getFeature = (lngLat, lngLat2, time) => {
    // const bearing = turf.bearing(turf.point(lngLat), turf.point(lngLat2));

    const angleDeg = Math.atan2(lngLat2[0] - lngLat[0], lngLat2[1] - lngLat[1]) * 180 / Math.PI;
    // console.log(bearing, angleDeg);

    const feature = {
        'type': 'Feature',
        'geometry': {'type': 'Point', 'coordinates': lngLat2},
        'properties': {
            'text': '>',
            'size': 20,
            'rotation': angleDeg + 90
        }
    }
    return feature;
}
const getFeatureTime = (lngLat, time) => {
    const feature = {
        'type': 'Feature',
        'geometry': {'type': 'Point', 'coordinates': lngLat},
        'properties': {
            'text': dayjs(time).format(TIME_FORMAT),
            'size': 12,
            'rotation': 0
        }
    }
    return feature;
}



const plotArrows = (map, route, timeFormat = "HH:mm.ss") => {
    TIME_FORMAT = timeFormat;

    let FEATS = [];
    let i = 0;
    let tmpCoord = [0, 0];
    console.log(route.coords);
    for (const COORD of route.coords) {
        const NOT_SAME_POINT = !(tmpCoord[0] === COORD[0] && tmpCoord[1] === COORD[1]);
        if (tmpCoord && NOT_SAME_POINT) {
            i++;
            if( i % 6 === 0) {
                FEATS.push(getFeatureTime(COORD, route.times[i]));
            } else {
                FEATS.push(getFeature(COORD, tmpCoord, route.times[i]));
            }
        }
        tmpCoord = [...COORD];
    }

    map.addSource(`${route.name}-points-arrows`, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': FEATS
        }
    });

    map.addLayer({
        'id': 'points-arrows',
        'type': 'symbol',
        'source': `${route.name}-points-arrows`,
        'layout': {
            'text-field': ['get','text'],
            'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
            ],
            "text-padding": 0,
            "text-size": ['get', 'size'],
            'text-offset': [0, 0],
            'text-anchor': 'left',
            'text-rotate': ['get', 'rotation'],
            'text-keep-upright': false,
            'icon-allow-overlap': true
        },
        'paint': {
            "text-color": "#fff",
            "text-halo-color": "#000",
            "text-halo-width": 2
        }
    });


    // map.addLayer({
    //     'id': 'points-time',
    //     'type': 'symbol',
    //     'source': `${route.name}-points-arrows`,
    //     'layout': {
    //         'text-field': ['get', 'time'],
    //         'text-font': [
    //             'Open Sans Semibold',
    //             'Arial Unicode MS Bold'
    //         ],
    //         "text-padding": 10,
    //         "text-size": 17,
    //         'text-offset': [0, 0],
    //         'text-anchor': 'left',
    //         'text-keep-upright': false,
    //         'icon-allow-overlap': true
    //     },
    //     'paint': {
    //         "text-color": "#fff",
    //         "text-halo-color": "#000",
    //         "text-halo-width": 2
    //     }
    // });


}

export {plotArrows}