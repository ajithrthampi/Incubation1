import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Table from "react-bootstrap/Table"
import UserCollection from "../../Add/Add.user"

function AdminList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const data = await UserCollection.getAllUsers();
        console.log(data.docs)

        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
     
    const deleteHandler = async(id) => {
      await UserCollection.deleteUser(id);
      getUsers();
    }

    return (

        <>
        <div></div>
            {/* <pre>{ JSON.stringify(users, undefined, 2)}</pre> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((doc, index) => {
                        return (

                            <tr key={doc.id} >
                                <td> {index + 1} </td>
                                <td> {doc.name} </td>
                                <td> {doc.email} </td>
                                <td>
                                    &nbsp;
                                    &nbsp;
                                    <Button
                                        variant="danger"
                                        className="delete"
                                        onClick={(e) => deleteHandler(doc.id)} >
                                        Delete
                                    </Button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default AdminList