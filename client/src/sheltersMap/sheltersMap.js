import './sheltersMap.css'
import React, { useState, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { InfoWindow } from 'google-map-react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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
    this.fetchData()
  }

  fetchData() {

    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/getAll`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState({ shelters: data });
      })
  }

  onRowAddCallback = (newData) => {
    return new Promise(resolve => {
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
        .then(response => {
          if (response.ok) {
            resolve();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
    });
  };

  onRowUpdateCallback = (newData, oldData) => {
    return new Promise(resolve => {
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
        .then(response => {
          if (response.ok) {
            this.fetchData();
            resolve();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
    });
  };

  onRowDeleteCallback = (oldData) => {
    return new Promise(resolve => {
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/delete/${oldData.Id}`)
        .then(response => {
          if (response.ok) {
            this.fetchData();
            resolve();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
    });
  };

  shelterClicked(index, elem) {
    console.log(elem)
    this.setState({
      clickedShelter: elem
    });
  }

  mapClicked(a, b) {
    this.setState({
      clickedShelter: null
    })
  }

  displayMarkers = () => {
    return this.state.shelters.map((shelter, index) => {
      return (
        <Marker key={shelter.Id}
          lat={parseFloat(shelter.LocY)}
          lng={parseFloat(shelter.LocX)}
          onClick={this.shelterClicked}>
        </Marker>
      )
    })
  }

  render() {
    const { isExpanded } = this.state

    let lookupOptions = {};
    const columns = [
      { title: 'Description', field: 'Description' },
      { title: 'MaxPopulation', field: 'MaxPopulation', type: 'numeric', lookup: lookupOptions }
    ];
    const { shelters, shelterChangesByMonth, sheltersCountByPopulation } = this.state
    console.log(isExpanded)
    let defaultProps = {
      center: { lat: 47.444, lng: -122.176 },
      zoom: 11
    };

    return (
      <div className="position-relative d-flex flex-row">
        <div className="position-relative" style={{ width: isExpanded ? `initial` : '0px' }}>

          <MaterialTable
            title={null}
            columns={columns}
            data={shelters}
            editable={{
              onRowAdd: this.onRowAddCallback,
              onRowUpdate: this.onRowUpdateCallback,
              onRowDelete: this.onRowDeleteCallback
            }}
            icons={{
              Add: () => <AddBox />,
              Check: () => <Check />,
              Clear: () => <Clear />,
              Delete: () => <DeleteOutline />,
              DetailPanel: () => <ChevronRight />,
              Edit: () => <Edit />,
              Export: () => <SaveAlt />,
              Filter: () => <FilterList />,
              FirstPage: () => <FirstPage />,
              LastPage: () => <LastPage />,
              NextPage: () => <ChevronRight />,
              PreviousPage: () => <ChevronLeft />,
              ResetSearch: () => <Clear />,
              Search: () => <Search />,
              SortArrow: () => <ArrowDownward />,
              ThirdStateCheck: () => <Remove />,
              ViewColumn: () => <ViewColumn />,
            }}
            options={{
              filtering: true
            }}
          />
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
