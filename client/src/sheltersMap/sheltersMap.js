import './sheltersMap.css'
import React, { useState, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const sideViewSize = 500;
const topViewSize = 56;

const Marker = () => <Icon iconName="HomeSolid" className="map-marker"></Icon>

class MapContainer extends Component {


  _commands = [
    {
      key: 'add',
      text: 'Add',
      iconProps: { iconName: 'Add' },
      onClick: () => {
        const { shelters, creationMode } = this.state;
        if (creationMode) return;
        this.setState({
          shelters: [...shelters, { id: -1, locX: null, loxY: null, description: '', maxPopulation: 0 }],
          creationMode: true,
          editable: { id: -1 },
          editableIndex: shelters.length
        })
      },
    },
  ]

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

    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/shelters/`)
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
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/shelters`, {
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
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/shelters/${oldData.id}`, {
        method: 'PUT',
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
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/shelters/delete/${oldData.Id}`, {
        method: 'DELETE'
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

  shelterClicked(index, elem) {
    console.log(elem)
    this.setState({
      clickedShelter: elem
    });
  }

  mapClicked({lat, lng}) {
    const { creationMode, editableIndex, shelters } = this.state;
    let newShelters = [...shelters];
    if (creationMode && shelters[editableIndex].loxY === null) {
      let newShelter = null;
      newShelter = {...shelters[editableIndex]};
      newShelter.locY = lat;
      newShelter.locX = lng;
      newShelters[editableIndex] = newShelter
      this.setState({
        shelters: newShelters
      })
    }
  }

  displayMarkers = () => {
    return this.state.shelters.map((shelter, index) => {
      return (
        <Marker key={shelter.Id}
          lat={parseFloat(shelter.locY)}
          lng={parseFloat(shelter.locX)}
          onClick={this.shelterClicked}>
        </Marker>
      )
    })
  }

  makeEditable = (item, index) => {
    this.setState({
      editable: { id: item.id },
      editableIndex: index
    })
  }

  saveChanges = () => {
    const { editable, creationMode, shelters, editableIndex } = this.state;
    if (!editable) return;
    let newItem = shelters[editableIndex];
    if (creationMode) {
      this.onRowAddCallback(newItem);
    }
    else {
      this.onRowUpdateCallback(newItem)
    }
    this.setState({
      editable: false,
      creationMode: false,
      shelters: shelters.splice(editableIndex, 1, [newItem]),
      editableIndex: null
    })
  }

  deleteChanges = (item) => {
    const { editable, creationMode, shelters, editableIndex } = this.state;
    if (!editable) return;
    var newShelters = [...shelters];
    if (creationMode) {
      newShelters.splice(editableIndex);
    } else {
      newShelters[editableIndex]= editable;
    }
    this.setState({
      editable: false,
      creationMode: false,
      shelters: newShelters,
      editableIndex: null
    })
  }

  _renderColumn = (item, index, column) => {
    const { shelters, editableIndex } = this.state;
    if (column.key === 'action') {
      return editableIndex !== index ? <IconButton styles={{ icon: { fontSize: '10px' } }}
        onClick={() => this.makeEditable(item)} iconProps={{ iconName: 'Edit' }} />
        : <span>
          <IconButton styles={{ icon: { fontSize: '10px' } }}
            onClick={() => this.saveChanges()} iconProps={{ iconName: 'CheckMark' }} />
          <IconButton styles={{ icon: { fontSize: '10px' } }}
            onClick={() => this.deleteChanges()} iconProps={{ iconName: 'Cancel' }} />
        </span>

    }
    return this.state.editableIndex === index && column.key !== '3' ?
      <TextField underlined defaultValue={item[column.fieldName]} onChange={(event) => {
        shelters[this.state.editableIndex][column.fieldName] = event.target.value
        this.setState({
          shelters: shelters
        })
      }} />
      : <span>{item[column.fieldName]}</span>
  }


  render() {
    const { isExpanded } = this.state

    let lookupOptions = {};
    const columns = [
      { name: 'Description', key: '1', fieldName: 'description', minWidth: 100 },
      { name: 'Max Population', key: '2', fieldName: 'maxPopulation', minWidth: 100 },
      { name: 'Action', key: 'action', minWidth: 100 }
    ];

    const { shelters, shelterChangesByMonth, sheltersCountByPopulation } = this.state
    console.log(isExpanded)
    let defaultProps = {
      center: { lat: 47.444, lng: -122.176 },
      zoom: 11
    };


    this._selection = new Selection({
      onSelectionChanged: () => {
        // this.setState({
        //   selectionDetails: this._getSelectionDetails(),
        // });
      },
    });

    return (
      <Fabric>
        <div className="position-relative d-flex flex-row">
          <div className="position-relative" style={{ width: isExpanded ? `${sideViewSize}px` : '0px' }}>
            <CommandBar items={this._commands} />
            <DetailsList
              items={shelters}
              compact={false}
              columns={columns}
              selectionMode={SelectionMode.single}
              getKey={item => item.Id}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              enterModalSelectionOnTouch={true}
              onRenderItemColumn={this._renderColumn}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
            <IconButton className="side-button ms-depth-16" styles={{ icon: { fontSize: '10px' } }} onClick={() => this.setState({ isExpanded: !isExpanded })} iconProps={{ iconName: isExpanded ? 'FlickRight' : 'FlickLeft' }} title="Toggle side panel" ariaLabel="Expand" />
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

      </Fabric>
    )
  }
}
export default MapContainer
