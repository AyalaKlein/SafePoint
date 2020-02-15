import React, { useState, Component } from 'react';
import MaterialTable from 'material-table';
import ReactDOM from 'react-dom';
import axios from 'axios';

const UsersPage = () => {
    
    const [state, setState] = React.useState({
        columns: [
          { title: 'Username', field: 'Username' },
          { title: 'Fitness', field: 'Fitness' },
          { title: 'Age', field: 'Age'},
        ],
        data: [
            { Username: 'Mehmet', Fitness: 8, Age: 63 },
            {
                Username: 'Zerya Betül',
                Fitness: 4,
                Age: 34,
            },
        ],
        users: [],
      });

      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/getAll`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
          console.log(state.data);
          state.data = data;
          setState({ users: data });
          console.log(state.data);
        });
      
    
    return (
        <div>
      <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
        </div>
    );

};
 
export default UsersPage;
