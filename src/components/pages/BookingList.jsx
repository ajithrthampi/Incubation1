
// import Sidebar from '../Sidebar'
// // import Table from 'react-bootstrap/Table';

// import Card from 'react-bootstrap/Card';
// import "./Booking.css"
// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// // import { getMultiFactorResolver } from 'firebase/auth';
// import Company1Collection from "../../Add/Add.company1"
// import { doc } from 'firebase/firestore';
// import { DockOutlined } from '@mui/icons-material';
// // import Declined from '../../Add/Declined';




// const BookingList = () => {

//   const [show, setShow] = useState(false);
//   const [user, setUser] = useState([])
//   const [state, setState] = useState([]);
//   const [bookedUser, setBookedUser] = useState([])
//   const [temp, setTemp] = useState(null)

//   useEffect(() => { console.log(state) }, [state])

//   const text = "Booked"

//   const handleClick = (item) => {
//     console.log(item)
//     setTemp(item)
//     if (state.includes(item)) { return }
//     setShow(true)

//     // setState(() => [...state, index]);

//   }

//   useEffect(() => {
//     getAll();
//   }, [])

//   const getAll = async () => {
//     const dataa = await Company1Collection.getAllCompany1();
//     console.log(dataa.docs);

//     setUser(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


//   }

//   const handleClose = () => {
//     setShow(false)
//     setTemp(null)
//   }
//   // const handleShow = () => setShow(true);

//   const [result, ddlValue] = useState(Company1Collection.name);

//   const handleSave = (e) => {
//     setState(myArray => [...myArray, temp])
//     console.log(e)
//     setShow(false);
//     setTemp(null)

//   }

//   const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57];

//   const renderCard = (card, index) => {
//     return (
//       <Card className='box' style={{ width: "4rem", height: "4rem", backgroundColor: (state.includes(index + 1) ? "orange" : "red") }}
//         key={index} onClick={() => handleClick(card)} value={card}  >

//         {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
//         <Card.Body style={{}}>

//           {card}

//         </Card.Body>
//         <hr />
//       </Card>
//     )
//   }
//   return (
//     <>
//       <Sidebar>
//         <h1>Booking List</h1>
//         <hr />
//         <div className="grid" >

//           {cards.map(renderCard)}

//         </div>
//       </Sidebar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Choose Any company</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <select
//           // value={doc.name}

//           >

//             {user.map((doc) => (
//               <option key={doc.id} value={doc.name} >
//                 {/* {console.log(doc.name.stringValue,typeof(doc))} */}
//                 {(doc.name.stringValue)}
//               </option>

//             ))}

//           </select>
//         </Modal.Body>


//         <Modal.Footer>

//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}
//           //  {state ? "close" : "open"}
//           >
//             {result}
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>


//     </>
//   )

// }

// export default BookingList



import { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Sidebar from '../Sidebar';
// import { doc } from 'firebase/firestore';
import Company1Collection from "../../Add/Add.company1"

export default function BookingList() {

  const [activeCol, setActiveCol] = useState([])
  // const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loader, setLoader] = useState(false)
  const [onClick, setOnClick] = useState(false)
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([])
  const [temp, setTemp] = useState(null)



  useEffect(() => {
    setLoader(true)
    // const token = localStorage.getItem('adminConfig')
    // const header = { headers: { "Authorization": `Bearer ${token}` } }
    // axios.get('http://127.0.0.1:8888/api/user/forms', header).then(res => setData(res.data))
    // setFilterData(data?.filter((item) => (item.reject || item.approved)))
    setLoader(false)
  }, [onClick])

  useEffect(() => {
        getAll();
      }, [])

      const getAll = async () => {
            const dataa = await Company1Collection.getAllCompany1();
            console.log(dataa.docs);
        
            setUser(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        
          }

  console.log(filterData)
  const onHandleClick = (id) => {
    handleClickOpen()
    setActiveCol(() => [...activeCol, id])
  }

  const handleClose = () => {
    setOpen(false);
    // setActiveCol(() => [...activeCol, id])
  };

  const handleClickOpen = () => {
    setOpen(true);
    
  };


  const style = {
    topBox: {
      display: 'flex',
      'justifyContent': 'center',
      alignItems: 'center',
    },
    insideTopBox: {

      width: '10rem',
      height: '5.5rem',
      margin: "8px 10px",
      backgroundColor: 'blue'
    },
    insideBottomBox: {
      width: '5.3rem',
      height: '5.5rem',
      margin: "12px 10px",
      backgroundColor: 'blue'
    },
    insideActiveBox: {
      width: '5.3rem',
      height: '5.5rem',
      margin: "12px 10px",
      backgroundColor: "yellow"
    },
    hr: {
      width: '100%',
      margin: '1rem auto',
      height: '2px',
      backgroundColor: 'black',
    },
    vHr: {
      position: 'absolute',
      width: '2px',
      margin: '1rem auto',
      height: '50vh',
      backgroundColor: 'black',
    }
    ,
    bottomBox: {
      display: 'flex',
      'justifyContent': 'center',
      alignItems: 'center',
      marginTop: '1rem'
    },
    activeBox: {
      width: '10rem',
      height: '6.3rem',
      margin: "8px 10px",
      backgroundColor: "yellow"
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto  auto auto  auto auto auto auto auto',
    }

  }

  /* <>
                      {(i === 9) ?
                          <>
                              <div key={`${i + "topBox"}`} style={(activeCol.includes(i + 1)) ? style.activeBox : style.insideTopBox} onClick={() => { onHandleClick(i + 1) }} className={"topbox"}>
                                  <div style={style.topBox}>{i + 1}</div>
                              </div>
                              <div style={style.hr} />
                              <div style={style.hr} />

                          </>
                          :
                          <div key={`${i + "topBox"}`} style={(activeCol.includes(i + 1)) ? style.activeBox : style.insideTopBox} onClick={() => { onHandleClick(i + 1) }} className={"topbox"}>
                              <div style={style.topBox}>{i + 1}</div>
                          </div>

                      }


                  </> */


  return (
    <>
      <Sidebar>
        {/* Top boxes */}

        <div className="topRow" style={style.topBox}>
          {Array(10).fill(null).map((item, i) => (
            <div key={`${i + 11 + "topBox"}`} style={(activeCol.includes(i + 11)) ? style.activeBox : style.insideTopBox} onClick={() => { onHandleClick(i + 11) }} className={"topbox"}>
              <div style={style.topBox}>{i + 1}</div>
            </div>
          ))}
        </div>
        <div style={style.hr} />
        <div style={style.hr} />


        {/* Bottom box */}

        <div className="topRow" style={style.gridContainer}>
          {Array(30).fill(null).map((item, i) => (
            <>
              <div key={`${i + 12 + "topBox"}`} style={(activeCol.includes(i + 21)) ? style.insideActiveBox : style.insideBottomBox} onClick={() => { onHandleClick(i + 21) }} className={"topbox"}>
                <div style={style.topBox}>{i + 21}</div>
              </div>

            </>

          ))}
        </div>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"select solt for users"}</DialogTitle>
          <DialogContent>
            {/* <Autocomplete
                        // disablePortal
                        id="combo-box-demo"
                        options={filterData}
                        getOptionLabel={(option) => option}
                        sx={{ width: 300 }}
                    // renderInput={(params) => <TextField {...params} label="user" />} */}
            {/* /> */}
            {/* <select>
              {filterData?.map(item => (
                <option>{item.name}</option>
              ))}

            </select> */}

<select
          // value={doc.name}

          >

            {user.map((doc) => (
              <option key={doc.id} value={doc.name} >
                {/* {console.log(doc.name.stringValue,typeof(doc))} */}
                {(doc.name.stringValue)}
              </option>

            ))}

          </select>

            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Assign</Button>
          </DialogActions>
        </Dialog>
      </Sidebar>
    </>
  )
}