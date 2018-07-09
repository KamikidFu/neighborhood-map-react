import React, {Component} from 'react';
import Map from './components/Map';
import './App.css';

class App extends Component {
    render() {
        let neighborhood = {
            name: 'Wellington',
            location: {
                'lat': -41.2881279,
                'lng': 174.7729331
            }
        };

        let attractions = [
            {
                name: 'Wellington Cable Car',
                location: {
                    'lat': -41.2889937,
                    'lng': 174.775704
                }
            },
            {
                name: 'Te Papa',
                location: {
                    'lat': -41.2904563,
                    'lng': 174.7799007
                }
            },
            {
                name: 'Caffe Astoria',
                location: {
                    'lat': -41.282442,
                    'lng': 174.7742523
                }
            },
            {
                name: 'Zealandia',
                location: {
                    'lat': -41.2901575,
                    'lng': 174.7513049
                }
            },
            {
                name: 'Mount Victoria Lookout',
                location: {
                    'lat': -41.2960571,
                    'lng': 174.7921217
                }
            },
            {
                name: 'Beehive',
                location: {
                    'lat': -41.2784228,
                    'lng': 174.7745033
                }
            }
        ];

        return (
            <div role='application'>
                <Map
                    APIKey={'AIzaSyASvs13OzRrqsVTuy6jeNuzoU2CaB0-K4g'}
                    neighborhood={neighborhood}
                    attractions={attractions}
                />
            </div>
        );
    }
}

export default App;
