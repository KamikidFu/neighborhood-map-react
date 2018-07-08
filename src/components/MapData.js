import React, {Component} from 'react';
import MapPresent from './MapPresent';
import PropTypes from 'prop-types';

{/*Insert this into page
<script async defer
        src=
            "https://maps.googleapis.com/maps/api/js?key=MYAPIKEY&v=3&callback=initMap">
</script>
*/
}

function asyncLoadMap(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;

    let target = document.getElementsByTagName('script');
    target[0].parentNode.insertBefore(script, target);
}

function fetchDataFromWiki(marker){
    let url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exintro&titles=' + marker.name + '&format=json&utf8'
    fetch(url,{
        method: 'POST',
        headers: new Headers({
            'Api-User-Agent': 'Example/1.0'
        })
    }).then((response)=>{
        if(response.ok){
            return response.json();
        }
        throw new Error('RESPONSE NOT OK: '+response.statusText);
    }).then((data)=>{
        return data.query.pages[Object.keys(pages)[0]];
    });
}

class MapData extends Component {
    static propTypes = {
        APIKey: PropTypes.string.isRequired,
        neighborhood: PropTypes.object.isRequired,
        attractions: PropTypes.array.isRequired
    };

    state = {
        APIKey: '',
        map: {},
        neighborhood: {},
        attractions: [],
        markers: []
    };

    componentDidMount() {
        window.setup = this.setup;
        asyncLoadMap('https://maps.googleapis.com/maps/api/js?key=' + this.props.APIKey + '&callback=setup')
    }

    setup = () => {
        let map = this.initMap(this.props.neighborhood);
        this.setState(
            {
                APIKey: this.props.APIKey,
                map: map,
                neighborhood: this.props.neighborhood,
                attractions: this.props.attractions
            }, () => {
                this.placeMarkers(map, this.state.attractions, infoWindow);
            }
        )
    };

    initMap = (neighborhood) => {
        return new windows.google.maps.Map(document.getElementById('map'), {
            center: neighborhood.location,
            zoom: 12
        });
    };

    placeMarkers = (map, attractions) =>{
        let markers = [];
        attractions.forEach((attract)=>{
            /*
             * https://developers.google.com/maps/documentation/javascript/markers#add
             */
            let marker = new google.maps.Marker({
                position:attract.location,
                map:map,
                title:attract.name
            });

            //https://developers.google.com/maps/documentation/javascript/infowindows
            let infoWindow = new google.maps.InfoWindow({
                content: fetchDataFromWiki(marker)
            });
            
            marker.addListener('click',function(){
                infoWindow.open(map,marker);
            });

            markers.push(marker);
        });
        this.setState({markers:markers});
    }
}

export default MapData