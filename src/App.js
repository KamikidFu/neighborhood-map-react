import React, {Component} from 'react';
import Map from './components/Map';
import './App.css';

class App extends Component {
    render() {
        let neighborhood = {
            name: 'Wellington',
            location: {
                'lat': -41.2911023,
                'lng': 174.774506
            }
        };

        let attractions = [
            {
                name:'Wellington Cable Car',
                location:{
                    'lat':-41.2898654,
                    'lng':174.7759936
                }
            },
            {
                name:'Te Papa',
                location:{
                    'lat':-41.2898654,
                    'lng':174.7759936
                }
            },
            {
                name:'Caffe Astoria',
                location:{
                    'lat':-41.2889778,
                    'lng':174.7740472
                }
            },
            {
                name:'Zealandia',
                location:{
                    'lat':-41.2911023,
                    'lng':174.774506
                }
            },
            {
                name:'Mount Victoria Lookout',
                location:{
                    'lat':-41.2911023,
                    'lng':174.774506
                }
            },
            {
                name:'Beehive',
                location:{
                    'lat':-41.2911023,
                    'lng':174.774506
                }
            }
        ];

        return (
            <div role='application'>
                <Map
                    APIKey={}
                    neighborhood={neighborhood}
                    attractions={attractions}
                />
            </div>
        );
    }
}

export default App;
