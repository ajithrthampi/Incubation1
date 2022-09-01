import React, { useState,useRef, useEffect } from 'react'
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext"
import "./Login.css"

const Login = () => {

    const username = "rama@gmail.com"
    const pin = "111111"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError ] = useState("")  
    const { logIn } = useUserAuth();
    const navigate = useNavigate();
    const inputRef = useRef("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email === username && password === pin ){
             navigate("/application")
        } else{
            setError("");
         try {
            await logIn(email, password )
            navigate('/home')
         } catch (err) {
           setError(err.message)
         }
        }
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])
      
    return (

    <div className='mainbody'>
            <>
                <div className="p-4 box">
                    <h2 className="mb-3">Login</h2>
                     {error && <Alert variant="danger">{error}</Alert> } 
                    <Form onSubmit = {handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                            ref={inputRef}
                                type="email"
                                placeholder="Email address" 
                                onChange= {(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password" 
                                onChange= {(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="Submit">
                                Log In
                            </Button>
                        </div>
                    </Form>
                    <hr />
                    <div> 
                        <div className="p-4 box mt-3 text-center">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>

                    </div>
                </div>
               
            </>
        </div>
    )
}

export default Login