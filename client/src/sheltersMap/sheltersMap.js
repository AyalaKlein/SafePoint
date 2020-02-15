import './sheltersMap.css'
import React, { useState, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { InfoWindow } from 'google-map-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const sideViewSize = 120;
const topViewSize = 56;

const Marker = () => <Icon iconName="HomeSolid" className="map-marker"></Icon>

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.shelterClicked = this.shelterClicked.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.state = {
      shelters: [],
      clickedShelter: null
    }
  }

  componentDidMount() {
    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/getall`)
    .then(res => res.json())
    .then(result => {
      this.setState({
        shelters: result
      })
    })
  }

  shelterClicked(index, elem) {
    this.setState({
      clickedShelter: elem
    });
  }

  mapClicked(a,b) {
    this.setState({
      clickedShelter: null
    })
  }

  displayMarkers = () => {
    return this.state.shelters.map((shelter, index) => {
      return (
          <Marker key={shelter._id}
                lat={parseFloat(shelter.LocY)}
                lng={parseFloat(shelter.LocX)}
                onClick={this.shelterClicked}>
          </Marker>
      )
    })
  }

  render() {
    const { isExpanded } = this.state
    console.log(isExpanded)
    let defaultProps = {
      center: { lat: 47.444, lng: -122.176 },
      zoom: 11
    };

    return (
      <div className="position-relative h-100 w-100 d-flex flex-row">
        <div className="position-relative" style={{width:isExpanded? `${sideViewSize}px`:'0px'}}>
          <IconButton className="side-button ms-depth-16" styles={{ icon: { fontSize: '10px' } }} onClick={() => this.setState({ isExpanded: !isExpanded })} iconProps={{ iconName: isExpanded ? 'FlickRight' : 'FlickLeft' }} title="Toggle side panel" ariaLabel="Add" />
        </div>
        <div style={{ height: `calc(100vh - ${topViewSize}px)`, width: isExpanded ? `calc(100vw - ${sideViewSize}px)` : '100vw' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA9JeZYGM9vsytm45dXISaRlRnW5HYSDic' }}
            defaultZoom={defaultProps.zoom}
            defaultCenter={defaultProps.center}
            onChildClick={this.shelterClicked}
            onClick={this.mapClicked}>
            {this.displayMarkers()}
            {/* {this.state.clickedShelter && 
					 <InfoWindow position={{lat: this.state.clickedShelter.lat, lng: this.state.clickedShelter.lng}}>
					     <h1>{this.state.clickedShelter.description}</h1>
					 </InfoWindow>
				 } */}
          </GoogleMapReact>
        </div>
      </div>

    )
  }
}
export default MapContainer
