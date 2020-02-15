import React from 'react';
import MaterialTable from 'material-table';

const UsersPage = () => {
    const columns = [
        { title: 'Username', field: 'Username' },
        { title: 'Fitness', field: 'Fitness' },
        { title: 'Age', field: 'Age'},
    ];

    const [users, setUsers] = React.useState([]);

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

    const onRowAddCallback = (newData) => (
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setUsers(prevState => {
                    // const data = [...prevState.data];
                    // data.push(newData);
                    // return { ...prevState, data };
                });
            }, 600);
        })
    );

    const onRowUpdateCallback = (newData, oldData) => (
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    // setUsers(prevState => {
                    //     const data = [...prevState.data];
                    //     data[data.indexOf(oldData)] = newData;
                    //     return { ...prevState, data };
                    // });
                }
            }, 600);
        })
    );

    const onRowDeleteCallback = (oldData) => (
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                // setUsers(prevState => {
                //     const data = [...prevState.data];
                //     data.splice(data.indexOf(oldData), 1);
                //     return { ...prevState, data };
                // });
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
            />
        </div>
    );
};
 
export default UsersPage;
