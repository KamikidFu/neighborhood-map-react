import React, {Component} from 'react';
import PropTypes from 'prop-types';


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

class List extends Component {
    static propTypes = {};

    state = {
        query: ''
    };

    updateQuery = (event) => {
        this.setState({
            query: event.target.value
        });
    };

    render() {
        const {map, markers,attractions, placeMarkers, infowindow} = this.props;
        const {query} = this.state;
       // console.log(markers);
        const filteredAttractions = attractions.filter(a => a.name.toUpperCase().includes(query.toUpperCase()));
        //const filteredMarkers = markers.filter(m=>m.title.toUpperCase().includes(query.toUpperCase()));
        console.log(query);
        console.log(filteredAttractions);
       // console.log(filteredMarkers);
        return (
            <div className='location-list'>
                <form className='search-form'
onChange={
                          (event) => {
                              placeMarkers(map, filteredAttractions);
                              event.preventDefault();
                          }
    
}
                >
                    <input className='search-input' aria-label='search'
                           type='text' value={query} placeholder='Attraction Name' onChange={this.updateQuery}/>
                    <button className='search-button' type='submit' value='filter' onClick={this.updateQuery}>
                        Search
                    </button>
                </form>
                <ul>
                    {
                        filteredAttractions.map(a => (
                            <li key={a.name} tabIndex='0' onClick={(event)=>{
                                for(let i=0;i<markers.length;i++){
                                    if(markers[i].title.trim()===a.name.trim()){
                                                                   assignWikiData(markers[i],infowindow);
                                        infowindow.open(map,markers[i]);
}
                                }
}
                            }>
                                {a.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default List;