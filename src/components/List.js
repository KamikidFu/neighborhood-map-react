import React, {Component} from 'react';
import PropTypes from 'prop-types';

class List extends Component{
    static propTypes={
        
    }
    
    state={
        query:''
    }

    updateQuery=(event)=>{
        this.setState({
            query:event.taeget.value
        });
    };
    
    render(){
        const {map, markers,placeMarkers, hideMarkers } = this.props;
        const {query}=this.state;
        
        const filteredMarkers = markers.filter(marker => marker.title.toUpperCase().includes(query.toUpperCase()));
        
        return(
         <div className='location-list'>
            <form className='search'
                onSubmit={
                    (event)=>{
                        hideMarkers(markers);
                        placeMarkers(map,filteredMarkers);
                        event.preventDefault();
                    }
                }
            >
                <input className='search-input' aria-label='search'
                type='text' value={query} placeholder='Attraction Name' onChange={this.updateQuery}/>
                    <button className='filter-button' type='submit' value='filter'/>
            </form>
            <ul>
                  {
                        filteredMarkers.map(marker=>(
                            <li key={marker.name} tabIndex='0' >
                                {marker.name}
                            </li>
                        ))
                }
            </ul>
         </div>
        )
    }
    
}

export default List;