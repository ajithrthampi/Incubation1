import React from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap"
import { useEffect, useState } from 'react';
import Company1Collection from "../../Add/Add.company1"
// import { SettingsPowerRounded } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {
  //  AppBar,
   Divider, 
  // IconButton, 
  List,
   ListItem, 
   ListItemText,
    // Slide, Toolbar, 
    // Typography 
  } from '@mui/material';


function ApprovedList() {

  const [approved, setApproved] = useState([])
  const [open, setOpen] = useState(false)
  const [viewUser, setViewUser] = useState(false)

  useEffect(() => {
    getAll();
  }, [])

  const getAll = async () => {
    const data = await Company1Collection.getAllCompany1();
    console.log(data.docs);

    setApproved(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const viewHandler = async (id) => {
    const auser = await Company1Collection.getcompany1(id);
    const viewData = auser._document.data.value.mapValue.fields
    setOpen(true);
    setViewUser(viewData)
    
    console.log(viewData);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <>
      <Sidebar>
        <h1> Approved List </h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Company Name</th>
              <th>Company Details</th>
              <th> View</th>
              <th></th>

              {/* <th>Username</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>

            {approved.map((doc, index) => {
              return (
                <tr key={doc.id} >
                  <td> {index + 1}</td>
                  <td>  {(doc.name.stringValue)} </td>
                  <td> {(doc.companyname.stringValue)} </td>
                  <td>
                    <Button
                      variant="danger"
                      className=""
                      style={{ color: "white" }}
                      // style={{ textDecoration: "none" }}
                      onClick={(e) => viewHandler(doc.id)}
                    >
                      View

                    </Button>
                  </td>

                  <td>
                    &nbsp;
                    &nbsp;

                    <label
                      style={{ color: "green" }}
                      variant="success"
                      className="delete"
                  
                    >
                      Approved
                    </label>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </Table>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Company Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           
           
          <List>
          <ListItem button>
            <ListItemText  > 
            Name: {JSON.stringify(viewUser.name)}
              </ListItemText>
             
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText>
            CompanyName  :   { JSON.stringify(viewUser.companyname)} 
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText>
            Address  :   { JSON.stringify(viewUser.address)} 
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText>
            Email  :   { JSON.stringify(viewUser.email)} 
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText>
            Phone  :   { JSON.stringify(viewUser.phone)} 
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText>
            State  :   { JSON.stringify(viewUser.state)} 
            </ListItemText>
          </ListItem>
        </List>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleSave} autoFocus>
            Save Changes
          </Button> */}
        </DialogActions>
      </Dialog>

      </Sidebar>
    </>
  )
}


export default ApprovedList