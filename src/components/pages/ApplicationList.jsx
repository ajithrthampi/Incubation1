import React, { forwardRef, useReducer, useState } from 'react';
// import Sidebar from '../Sidebar';
import Table from 'react-bootstrap/Table';
// import { Button } from "react-bootstrap"
import { useEffect } from 'react';
import CompanyCollection from "../../Add/Add.service"
import { Link } from '@mui/material';
import Sidebar from '../Sidebar';
import { storage } from "../../firebase"
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Home from "../Home"



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const ApplicationList = () => {
    const [company, setCompany] = useState([])
    const [view, setView] = useState([])
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState();


    useEffect(() => {
        getCompany();
    }, [reducerValue])

    const getCompany = async () => {
        const data = await CompanyCollection.getAllCompany();
        console.log(data.docs);

        setCompany(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const viewHandler = async (id) => {
        const auser = await CompanyCollection.getcompany(id)
        const owner = auser._document.data.value.mapValue.fields
        setView(owner)
        setOpen(true)
        console.log("hiii");
    }
    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            const reference = ref(storage, "/wallp.jpg")
            await getDownloadURL(reference).then((x) => {
                setUrl(x);
            })
        }
    })

    return (

        <>
            <Sidebar>
                <h1>Application List</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Company Name</th>
                            <th>Company Details</th>
                            <th>Open</th>
                            <th> Pending</th>
                        </tr>
                    </thead>
                    <tbody>

                        {company.map((doc, index) => {
                            return (

                                <tr key={doc.id}>
                                    <td> {index + 1} </td>
                                    <td> {doc.name} </td>
                                    <td> {doc.email} </td>
                                    <td>

                                        &nbsp;
                                        &nbsp;
                                        {/* <Link to={"/view/ $ {id}"} > */}
                                        <Button
                                            variant="danger"
                                            className=""
                                            style={{ color: "red" }}
                                            // style={{ textDecoration: "none" }}
                                            onClick={(e) => viewHandler(doc.id)}
                                        >
                                            View

                                        </Button>
                                        {/* </Link> */}
                                    </td>
                                    <td>
                                        &nbsp;
                                        &nbsp;

                                        <label
                                            style={{ color: "orange" }}
                                            variant="dark"
                                            className="delete"
                                        >
                                            Pending
                                        </label>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <Dialog
                    // fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Close
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText>

                                Name: {JSON.stringify(view.name)}

                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText
                            // primary="Default notification ringtone"
                            // secondary="Tethys"
                            // tertiory= "hello"
                            >
                                Company Name: {JSON.stringify(view.companyname)}
                            </ListItemText>
                        </ListItem>
                    </List>
                    <ListItem button>
                        <ListItemText>
                            Email: {JSON.stringify(view.email)}
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            Address: {JSON.stringify(view.address)}
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            State: {JSON.stringify(view.state)}
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            City: {JSON.stringify(view.city)}
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            Phone: {JSON.stringify(view.phone)}
                        </ListItemText>
                    </ListItem>
                </Dialog>

            </Sidebar>

        </>
    );
}




export default ApplicationList