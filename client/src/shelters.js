import React, { useState, Component, useEffect } from 'react';
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

const SheltersPage = () => {
    let lookupOptions = {};
    for (let i=0; i<100; i++) {lookupOptions[i]=i};
    const columns = [
        { title: 'LocX', field: 'LocX', type: 'numeric', customFilterAndSearch: (term, rowData) => rowData.LocX.toString().indexOf(term) != -1 },
        { title: 'LocY', field: 'LocY', type: 'numeric', customFilterAndSearch: (term, rowData) => rowData.LocY.toString().indexOf(term) != -1 },
        { title: 'Description', field: 'Description'},
        { title: 'MaxPopulation', field: 'MaxPopulation', type: 'numeric', lookup: lookupOptions}
    ];
    const [shelters, setShelters] = React.useState([]);
    const [shouldRefetch, setShouldRefetch] = React.useState(true);

    useEffect(() => {
        if (shouldRefetch) {
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shelters/getAll`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                setShelters(data);
            });
            setShouldRefetch(false);
        }
    }, [shouldRefetch]);

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
                    setShouldRefetch(true);
                    resolve();
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
                    setShouldRefetch(true);
                    resolve();
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
                        setShouldRefetch(true);
                        resolve();
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
            columns={columns}
            data={shelters}
            editable={{
                onRowAdd: onRowAddCallback,
                onRowUpdate: onRowUpdateCallback,
                onRowDelete: onRowDeleteCallback
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
            options={{
                filtering: true
            }}
             />
        </div>
    );
};
 
export default SheltersPage;