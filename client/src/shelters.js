import React, { useState, Component } from 'react';
import MaterialTable from 'material-table';

const SheltersPage = () => {
    const [state, setState] = React.useState({
        columns: [
          { title: 'LocX', field: 'LocX' },
          { title: 'LocY', field: 'LocY' },
          { title: 'Description', field: 'Description'},
          { tite: 'MaxPopulation', field: 'MaxPopulation'}
        ],
        data: [
            
        ]
      });

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
        });
      
    
    return (
        <div>
            <MaterialTable
            columns={state.columns}
            data={state.data} />
        </div>
    );
};
 
export default SheltersPage;