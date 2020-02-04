import './sheltersMap.css'
import React, { useState, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

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

    this.state = {
      //TODO: need shelters from db
      stores: [{ latitude: 47.49855629475769, longitude: -122.14184416996333 },
      { latitude: 47.359423, longitude: -122.021071 },
      { latitude: 47.2052192687988, longitude: -121.988426208496 },
      { latitude: 47.6307081, longitude: -122.1434325 },
      { latitude: 47.3084488, longitude: -122.2140121 },
      { latitude: 47.5524695, longitude: -122.0425407 }]
    }

  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index}
        lat={store.latitude}
        lng={store.longitude}
        //TODO: show shelter details
        onClick={() => console.log("You clicked me!")} />
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
            defaultCenter={defaultProps.center}>
            {this.displayMarkers()}
          </GoogleMapReact>
        </div>
      </div>

    )
  }
}
export default MapContainer
