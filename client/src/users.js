import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

const UsersPage = () => {
    const columns = [
        { title: 'Username', field: 'Username' },
        { title: 'Fitness', field: 'Fitness' },
        { title: 'Age', field: 'Age'},
    ];

    /*
    const columns = [
        { title: 'Username', field: 'Username' },
        { title: 'Fitness', field: 'Fitness', type: 'numeric' },
        { title: 'Age', field: 'Age', type: 'numeric' },
        { title: 'Cities', field: 'Cities', render: (rowData) => (
            rowData.Cities.map((city) => (
                `${city.name}, `
            ))
        )}
    ];
    

    // <InputLabel id='demo-mutiple-name-label'>Name</InputLabel>
    //         <Select
    //           labelId='demo-mutiple-name-label'
    //           multiple
    //           value={['asd']}
    //           // onChange={handleChange}
    //           // input={<Input />}
    //           // MenuProps={MenuProps}
    //         >
    //           {[{id: 1, name: 'asd'}, {id: 2, name: 'dsa'}].map(city => (
    //             <MenuItem key={city.id} value={city.name}>
    //               {city.name}
    //             </MenuItem>
    //           ))}
    //         </Select>
    */

    const [users, setUsers] = React.useState([]);

    useEffect(() => {
      fetchAllUsers();
    }, []);

    const fetchAllUsers = () => (
      fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/getAll`)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Something went wrong ...');
          }
      })
      .then(data => {
          setUsers(data);
      })
    );

    const onRowAddCallback = (newUser) => (
        new Promise(resolve => {
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }).then(response => {
                if (response.ok) {
                    fetchAllUsers();
                    resolve();
                } else {
                    throw new Error('Something went wrong ...');
                }
            });
        })
    );

    const onRowUpdateCallback = (newUserData) => (
        new Promise(resolve => {
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            }).then(response => {
                if (response.ok) {
                    fetchAllUsers();
                    resolve();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
        })
    );

    const onRowDeleteCallback = (userToDelete) => (
        new Promise(resolve => {
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/delete/${userToDelete._id}`)
              .then(response => {
                  if (response.ok) {
                      fetchAllUsers();
                      resolve();
                  } else {
                      throw new Error('Something went wrong ...');
                  }
              })
        })
    );
    
    return (
        <div>
            <MaterialTable
                title='Editable Example'
                columns={columns}
                data={users}
                editable={{
                    onRowAdd: onRowAddCallback,
                    onRowUpdate: onRowUpdateCallback,
                    onRowDelete: onRowDeleteCallback,
                }}
                icons= {{
                  Add: () => <AddBox/>,
                  Check: () => <Check/>,
                  Clear: () => <Clear/>,
                  Delete: () => <DeleteOutline/>,
                  DetailPanel: () => <ChevronRight/>,
                  Edit: () => <Edit/>,
                  Export: () => <SaveAlt/>,
                  Filter: () => <FilterList/>,
                  FirstPage: () => <FirstPage/>,
                  LastPage: () => <LastPage/>,
                  NextPage: () => <ChevronRight/>,
                  PreviousPage: () => <ChevronLeft/>,
                  ResetSearch: () => <Clear/>,
                  Search: () => <Search/>,
                  SortArrow: () => <ArrowDownward/>,
                  ThirdStateCheck: () => <Remove/>,
                  ViewColumn: () => <ViewColumn/>,
                }}
            />
        </div>
    );
};
 
export default UsersPage;
