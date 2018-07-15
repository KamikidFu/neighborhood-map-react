import React, {Component} from 'react';
import Map from './components/Map';
import './App.css';

/**
 * Main App Class
 */
class App extends Component {
    /**
     * To render components
     * @returns {*}
     */
    render() {
        /**
         * neighborhood is where the map will show
         * @type {{name: string, location: {lat: number, lng: number}}}
         */
        let neighborhood = {
            name: 'Wellington',
            location: {
                'lat': -41.2881279,
                'lng': 174.7729331
            }
        };

        /**
         * attractions is an array of attraction object with its name and latlng
         * @type {*[]}
         */
        let attractions = [
            {
                name: 'Wellington Cable Car',
                location: {
                    'lat': -41.2889937,
                    'lng': 174.775704
                }
            },
            {
                name: 'Museum of New Zealand Te Papa Tongarewa',
                location: {
                    'lat': -41.2904563,
                    'lng': 174.7799007
                }
            },
            {
                name: 'Victoria University of Wellington\n',
                location: {
                    'lat': -41.2872599,
                    'lng': 174.7562615
                }
            },
            {
                name: 'Zealandia (wildlife sanctuary)',
                location: {
                    'lat': -41.2901575,
                    'lng': 174.7513049
                }
            },
            {
                name: 'Mount Victoria',
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

        /**
         * return what to render
         */
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
