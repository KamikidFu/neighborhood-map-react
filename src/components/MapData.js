import React, {Component} from 'react';
import MapPresent from './MapPresent';
import PropTypes from 'prop-types';

{/*Insert this into page
<script async defer
        src=
            "https://maps.googleapis.com/maps/api/js?key=MYAPIKEY&v=3&callback=initMap">
</script>
*/}
function asyncLoadMap(url){
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async=true;
    script.src = url;

    let target = document.getElementsByTagName('script');
    target[0].parentNode.insertBefore(script,target);
}

class MapData extends Component {
    static propTypes = {
        APIKey: PropTypes.string.isRequired,
        neighborhood:PropTypes.object.isRequired,
        attractions:PropTypes.array.isRequired
    };

    state = {
        APIKey: '',
        map: {},
        info: {},
        attractions: [],
        markersOnMap: [],
        icon: {},
        highlight: {}
    };

    componentDidMount() {
        window.setup=this.setup;
        asyncLoadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyASvs13OzRrqsVTuy6jeNuzoU2CaB0-K4g&callback=setup')
    }

    setup = () => {

    };

    mapInit = (neighborhood) => {

    }
};

export default MapData