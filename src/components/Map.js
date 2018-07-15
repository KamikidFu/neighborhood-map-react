import React, {Component} from 'react';
import List from './List';
import PropTypes from 'prop-types';

/*Insert this into page
<script async defer
        src=
            "https://maps.googleapis.com/maps/api/js?key=MYAPIKEY&v=3&callback=initMap">
</script>
*/
function asyncLoadMap(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;

    let insert = document.getElementsByTagName('script')[0];
    insert.parentNode.insertBefore(script, insert);
}

/**
 * Fetch data from wiki and assign to infowindow
 * @param marker marker on map
 * @param info infowindow to show data
 */
function assignWikiData(marker, info) {
    let url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exintro&titles=' + marker.title + '&format=json&utf8'
    let content = 'SORRY, NOT FOUND IN WIKI';
    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Api-User-Agent': 'Example/1.0'
        })
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('RESPONSE NOT OK: ' + response.statusText);
    }).then((data) => {
        let pages = data.query.pages;
        let extract = pages[Object.keys(pages)[0]].extract;
        content = extract.slice(extract.indexOf('<p>'), extract.lastIndexOf('</p>'));
        info.setContent('<div>' + content + '</div>');
    });
}

/**
 * class of Map
 */
class Map extends Component {
    /**
     * Test if the right props passed from parent component to here
     * @type {{APIKey: *, neighborhood: *, attractions: *}}
     */
    static propTypes = {
        APIKey: PropTypes.string.isRequired,
        neighborhood: PropTypes.object.isRequired,
        attractions: PropTypes.array.isRequired
    };
    /**
     * state of this class
     * @type {{APIKey: string, map: {}, neighborhood: {}, attractions: Array, markers: Array, infowindow: {}}}
     */
    state = {
        APIKey: '',
        map: {},
        neighborhood: {},
        attractions: [],
        markers: [],
        infowindow: {}
    };

    /**
     * async load map
     */
    componentDidMount() {
        window.setup = this.setup;
        asyncLoadMap('https://maps.googleapis.com/maps/api/js?key=' + this.props.APIKey + '&callback=setup')
    }

    /**
     * setup method to make state, map and infowindow ready
     */
    setup = () => {
        let map = this.initMap(this.props.neighborhood);
        let infowindow = new window.google.maps.InfoWindow(
            {
                content: 'Retrieving data from Wiki...',
                maxWidth: 360
            });
        this.setState(
            {
                APIKey: this.props.APIKey,
                map: map,
                neighborhood: this.props.neighborhood,
                attractions: this.props.attractions,
                infowindow: infowindow
            }, () => {
                //Async call place markers method to make markers on map
                this.placeMarkers(map, this.state.attractions);
            }
        )
    };
    /**
     * return a new map at the neighborhood
     * @param neighborhood
     * @returns {window.google.maps.Map}
     */
    initMap = (neighborhood) => {
        return new window.google.maps.Map(document.getElementById('map'), {
            center: neighborhood.location,
            zoom: 14
        });
    };
    /**
     * place markers on map
     * @param map
     * @param attractions
     */
    placeMarkers = (map, attractions) => {
        this.hideMarkers();
        let markers = [];
        let {infowindow} = this.state;
        attractions.forEach((attract) => {

            //https://developers.google.com/maps/documentation/javascript/markers#add            
            let marker = new window.google.maps.Marker({
                position: attract.location,
                map: map,
                title: attract.name
            });

            marker.addListener('click', function () {
                assignWikiData(marker, infowindow);
                infowindow.open(map, marker);
            });

            markers.push(marker);
        });
        this.setState({markers: markers});
    };
    /**
     * Hide markers on map
     */
    hideMarkers = () => {
        this.state.markers.forEach((marker) => {
            marker.setMap(null);
        });
    };

    render() {
        const {map, markers, attractions, infowindow} = this.state;
        return (
            <div className="main">
                <List
                    map={map}
                    markers={markers}
                    attractions={attractions}
                    placeMarkers={this.placeMarkers}
                    infowindow={infowindow}
                />
                <div id='map' className='map'>
                </div>
            </div>
        );
    }
}

export default Map;