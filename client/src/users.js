import React, { useEffect } from 'react';
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

const UsersPage = () => {
    const columns = [
        { title: 'Username', field: 'Username' },
        { title: 'Fitness', field: 'Fitness' },
        { title: 'Age', field: 'Age'},
    ];

    const [users, setUsers] = React.useState([]);

    useEffect(() => {
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
            });
    }, []);

    const onRowAddCallback = (newUser) => (
        new Promise(resolve => {
            setTimeout(() => {
                setUsers([...users, newUser]);
                resolve();
            }, 600);
        })
    );

    const onRowUpdateCallback = (newUserData, oldUserData) => (
        new Promise(resolve => {
            setTimeout(() => {
                if (oldUserData) {
                  let data = [...users];
                  data[data.indexOf(oldUserData)] = newUserData
                  setUsers(data);
                }
                resolve();
            }, 600);
        })
    );

    const onRowDeleteCallback = (userToDelete) => (
        new Promise(resolve => {
            setTimeout(() => {
                let data = [...users];
                data.splice(data.indexOf(userToDelete), 1);
                setUsers(data);
                resolve();
            }, 600);
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
