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

class Map extends Component {
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
        markers: [],
        infowindow: {}
    };

    componentDidMount() {
        window.setup = this.setup;
        asyncLoadMap('https://maps.googleapis.com/maps/api/js?key=' + this.props.APIKey + '&callback=setup')
    }

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
                this.placeMarkers(map, this.state.attractions);
            }
        )
    };

    initMap = (neighborhood) => {
        return new window.google.maps.Map(document.getElementById('map'), {
            center: neighborhood.location,
            zoom: 14
        });
    };

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
        console.log(markers);
        this.setState({markers: markers});
    };

    hideMarkers = () => {
        this.state.markers.forEach((marker) => {
            marker.setMap(null);
        });
    };


    render() {
        const {map, markers, attractions,infowindow} = this.state;
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