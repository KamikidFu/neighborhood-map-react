import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
        const {map, markers, placeMarkers, hideMarkers} = this.props;
        const {query} = this.state;

        const filteredMarkers = markers.filter(marker => marker.title.toUpperCase().includes(query.toUpperCase()));
        console.log(filteredMarkers);
        return (
            <div className='location-list'>
                <form className='search'
                      onSubmit={
                          (event) => {
                              hideMarkers(markers);
                              placeMarkers(map, filteredMarkers);
                              event.preventDefault();
                          }
                      }
                >
                    <input className='search-input' aria-label='search'
                           type='text' value={query} placeholder='Attraction Name' onChange={this.updateQuery}
                           onSubmit={
                               (event) => {
                                   hideMarkers(markers);
                                   placeMarkers(map, filteredMarkers);
                                   event.preventDefault();
                               }
                           }/>
                    <button className='filter-button' type='submit' value='filter' onClick={this.updateQuery}>
                        Filter
                    </button>
                </form>
                <ul>
                    {
                        filteredMarkers.map(marker => (
                            <li key={marker.title} tabIndex='0'>
                                {marker.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default List;