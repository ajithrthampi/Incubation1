import React, { useReducer, useState, forwardRef } from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap"

import { useEffect } from 'react';
import Company1Collection from "../../Add/Add.company1"
import CompanyCollection from "../../Add/Add.service"
import DeclinedCollection from "../../Add/Declined"

// import Button from '@mui/material/Button';
// import React, { forwardRef} from 'react';
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



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PendingApplication() {

  const [companies, setCompany] = useState([])
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState([])



  useEffect(() => {
    getCompany();

  }, [reducerValue])

  const getCompany = async () => {
    const data = await CompanyCollection.getAllCompany();
    console.log(data.docs);

    setCompany(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const approveHandler = async (id) => {
    console.log(id)
    const auser = await CompanyCollection.getcompany(id)
    const owner = auser._document.data.value.mapValue.fields
    console.log(owner)

    await Company1Collection.addCompany1(owner)
    await CompanyCollection.deleteCompany(id)
    forceUpdate()

  }
  const declineHandler = async (id) => {
    console.log(id)
    const auser = await CompanyCollection.getcompany(id)
    const newDeclined = auser._document.data.value.mapValue.fields
    console.log(newDeclined);

    await DeclinedCollection.addDeclined(newDeclined)
    await CompanyCollection.deleteCompany(id)
    forceUpdate()
  }
  useEffect(() => {

  }, [companies])

  const viewHandler = async (id) => {
    const auser = await CompanyCollection.getcompany(id)
    const owner = auser._document.data.value.mapValue.fields
    setView(owner)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  }
  

  return (

    <>
      <Sidebar>
        <h1>Pending Applicatiion List</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Company Name</th>
              <th>Company Details</th>
              <th>View Details</th>
              <th> Approved </th>
              <th> Declined </th>
            </tr>
          </thead>
          <tbody>

            {companies.map((doc, index) => {
              return (

                <tr key={doc.id} >
                  <td> {index + 1} </td>
                  <td> {doc.name} </td>
                  <td> {doc.email} </td>
                  <td>

                    <Button
                      variant="danger"
                      className=""
                      // style={{ color: "red" }}
                      onClick={(e) => viewHandler(doc.id)}
                    >
                      View
                    </Button>
                  </td>
                  <td>

                    <Button
                      variant="dark"
                      className="delete"
                      onClick={(e) => approveHandler(doc.id)}
                    >
                      Approve
                    </Button>
                  </td>

                  <td>

                    <Button
                      variant="secondary"
                      className="delete"
                      onClick={(e) => declineHandler(doc.id)}
                    >
                      Decline
                    </Button>

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
                close
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
  )
}

export default PendingApplication