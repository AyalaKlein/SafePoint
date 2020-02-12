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
      shelters: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/shelters/getall")
    .then(res => res.json())
    .then(result => {
      this.setState({
        shelters: result
      })
    })
  }

  displayMarkers = () => {
    return this.state.shelters.map((shelter, index) => {
      return <Marker key={index}
        lat={shelter.LocY}
        lng={shelter.LocX}
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
