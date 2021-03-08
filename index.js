import {convertGpx} from "./modules/convert";                               // or @mapbox-color/convert
import {setMaxSpeed, colorRoute, setColorGradient} from "./modules/route";  // or @mapbox-color/route

mapboxgl.accessToken = 'pk.eyJ1Ijoiem91dGVwb3Bjb3JuIiwiYSI6ImNqaDRxem9sNDE1Zmwyd2xuZG1iYTl0OXcifQ.r4qZMpEbr2FoCN4sd97kDw';

const CENTER = [-121.353637, 40.584978];
const CENTER = [13.88, 46.37];

const map = (window.map = new mapboxgl.Map({
    container: 'map',
    center: [13.88, 46.37],
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 12
}));

const plotRoute = async () => {
    const hike = await convertGpx("routes/hike.gpx");
    console.log("hike ", hike);

    // You can set your colors
    setColorGradient([
        {color: 'purple', pos: 0},
        {color: 'blue', pos: 0.2},
        {color: 'green', pos: 0.25},
        {color: 'yellow', pos: 0.3},
        {color: 'orange', pos: 0.4},
        {color: 'red', pos: 1},
    ]);

    setMaxSpeed(70);
    colorRoute(hike);
}

map.on('load', async () => {

    map.addSource('national-park', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-121.353637, 40.584978],
                                [-121.284551, 40.584758],
                                [-121.275349, 40.541646],
                                [-121.246768, 40.541017],
                                [-121.251343, 40.423383],
                                [-121.32687, 40.423768],
                                [-121.360619, 40.43479],
                                [-121.363694, 40.409124],
                                [-121.439713, 40.409197],
                                [-121.439711, 40.423791],
                                [-121.572133, 40.423548],
                                [-121.577415, 40.550766],
                                [-121.539486, 40.558107],
                                [-121.520284, 40.572459],
                                [-121.487219, 40.550822],
                                [-121.446951, 40.56319],
                                [-121.370644, 40.563267],
                                [-121.353637, 40.584978]
                            ]
                        ]
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.415061, 40.506229]
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.505184, 40.488084]
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.354465, 40.488737]
                    }
                }
            ]
        }});


    // await plotRoute();
});