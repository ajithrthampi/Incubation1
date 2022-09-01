
import Sidebar from '../Sidebar'
// import Table from 'react-bootstrap/Table';

import Card from 'react-bootstrap/Card';
import "./Booking.css"
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { getMultiFactorResolver } from 'firebase/auth';
import Company1Collection from "../../Add/Add.company1"
import { doc } from 'firebase/firestore';
import { DockOutlined } from '@mui/icons-material';
// import Declined from '../../Add/Declined';






const BookingList2 = () => {

  const [show, setShow] = useState(false);
  const [user, setUser] = useState([])
  const [state, setState] = useState([]);
  const [bookedUser, setBookedUser] = useState([])
  const [temp, setTemp] = useState(null)

  useEffect(() => { console.log(state) }, [state])

  const text = "Booked"

  const handleClick = (item) => {
    console.log(item)
    setTemp(item)
    if (state.includes(item)) { return }
    setShow(true)

    // setState(() => [...state, index]);

  }
 

  useEffect(() => {
    getAll();
  }, [])

  const getAll = async () => {
    const dataa = await Company1Collection.getAllCompany1();
    console.log(dataa.docs);

    setUser(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


  }

  const handleClose = () => {
    setShow(false)
    setTemp(null)
  }
  // const handleShow = () => setShow(true);

  const [result, ddlValue] = useState(Company1Collection.name);

  const handleSave = (e) => {
    setState(myArray => [...myArray, temp])
    console.log(e)
    setShow(false);
    setTemp(null)

  }

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38];

  const renderCard = (card, index) => {
    return (
      <Card className='box' style={{ width: "4rem", height: "4rem", backgroundColor: (state.includes(index + 1) ? "orange" : "red") }}
        key={index} onClick={() => handleClick(card)} value={card}  >

        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body style={{}}>

          {card}

        </Card.Body>
    
      </Card>
    )
  }
  return (
    <>
   
        <hr />
        <div className="grid" >

          {cards.map(renderCard)}
        
        </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Any company</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <select
          // value={doc.name}

          >

            {user.map((doc) => (
              <option key={doc.id} value={doc.name} >
                {/* {console.log(doc.name.stringValue,typeof(doc))} */}
                {(doc.name)}
              </option>

            ))}

          </select>
        </Modal.Body>


        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}
          //  {state ? "close" : "open"}
          >
            {result}
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )

}

export default BookingList2