import React, { useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from '../context/UserAuthContext';
import UserCollection from "../Add/Add.user"
import "./Signup.css"


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError ] = useState("")  
    const [message, setMessage] = useState("")
    const { signUp } = useUserAuth();
    const navigate = useNavigate()
    // const inputRef = useRef("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
         try { 
            await signUp(email, password )
            const newUser = {
              name,
              email,
              
            }
            console.log(newUser)
            try {
              await UserCollection.addUsers(newUser);
              setMessage({error: false, msg: "New User added successfully!"})
            } catch (err) {
              setMessage({error: true, msg : err.message})
            } 
            setName("");
            setEmail("")

            navigate('/')
         } catch (err) {
           setError(err.message)
         }
    }

    // useEffect(() => {
    //   inputRef.current.focus()
    // })
  return (
    <div className="mainbody"  >
    {/* {message.msg && (<Alert variant={ message?.error ? "danger":"success"} dismissible onClose={ () => setMessage("") }> { message?.msg }</Alert>)} */}
    <div className="p-4  box">
      <h2 className="mb-3">Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} >

      <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Control
          
            type="name"
            value={name}
            placeholder="User name"
            onChange={ (e) => setName(e.target.value)}
           
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            value={email}
            placeholder="Email address"
            onChange={ (e) => setEmail(e.target.value)}
           
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
           
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="Submit">
            Sign up
          </Button>
        </div>
      </Form>
      <div className="p-4 box mt-3 text-center">
      Already have an account? <Link to="/">Log In</Link>
    </div>
      
    </div>
    
  </div>
  )
}

export default Signup