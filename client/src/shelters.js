import React, { useState, Component } from 'react';
import MaterialTable from 'material-table';

const SheltersPage = () => {
    const [state, setState] = React.useState({
        columns: [
          { title: 'LocX', field: 'LocX', type: 'numeric' },
          { title: 'LocY', field: 'LocY', type: 'numeric' },
          { title: 'Description', field: 'Description'},
          { title: 'MaxPopulation', field: 'MaxPopulation', type: 'numeric'}
        ],
        data: [
            
        ]
      });

    const loadShelters = () => {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/getAll`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                state.data = data;
                resolve();
            })
            .catch(reject);
        });
    }

    loadShelters();
    
    const onRowAddCallback = (newData) => {
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
                    loadShelters().then(resolve);
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
        });
    };

    const onRowUpdateCallback = (newData, oldData) => {
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
                    loadShelters().then(resolve);
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
        });
    };

    const onRowDeleteCallback = (oldData) => {
        return new Promise(resolve => {
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/delete/${oldData._id}`)
                .then(response => {
                    if (response.ok) {
                        loadShelters().then(resolve);
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
          });
    };

    return (
        <div>
            <MaterialTable
            title="Shelters"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: onRowAddCallback,
                onRowUpdate: onRowUpdateCallback,
                onRowDelete: onRowDeleteCallback
              }}
             />
        </div>
    );
};
 
export default SheltersPage;