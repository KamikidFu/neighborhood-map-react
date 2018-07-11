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
        const {map, markers,attractions, placeMarkers} = this.props;
        const {query} = this.state;

        const filteredAttractions = attractions.filter(a => a.name.toUpperCase().includes(query.toUpperCase()));
        const filteredMarkers = markers.filter(m=>m.title.toUpperCase().includes(query.toUpperCase()));
        console.log(filteredAttractions);
        console.log(filteredMarkers);
        return (
            <div className='location-list'>
                <form className='search-form'
                      onSubmit={
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
                        filteredMarkers.map(m => (
                            <li key={m.title} tabIndex='0'>
                                {m.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default List;