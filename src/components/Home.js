import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel } from 'react-bootstrap';
import { Radio, RadioGroup, FormControl, Dialog, DialogContent, DialogActions, DialogContentText,ThemeProvider, createTheme, IconButton, Toolbar, AppBar } from '@mui/material';
import { useState } from "react"
import CompanyCollection from "../Add/Add.service"
import { storage } from "../firebase"
// import { RestaurantMenu } from '@mui/icons-material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { getDropdownMenuPlacement } from 'react-bootstrap/esm/DropdownMenu';
import { useNavigate } from 'react-router-dom';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

function Home() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  // const initialValues = { name: "", email: "" };
  const theme = createTheme();
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [companyname, setCompanyName] = useState("")
  const [image, setImage] = useState("")
  const [team, setTeam] = useState("")
  const [product, setProduct] = useState("")
  const [problem, setProblem] = useState("")
  const [unique, setUnique] = useState("")
  const [customer, setCustomer] = useState("")
  const [competitor, setCompetitor] = useState("")
  const [revenue, setRevenue] = useState("")
  const [market, setMarket] = useState("")
  const [service, setService] = useState("")
  const [proposal, setProposal] = useState("")
  // const [formValues, setFormValues] = useState()
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false)
  // const [erroremail, setErrorEmail] = useState("");
  // const [disabled, setDisabled] = useState(false)
  const [message, setMessages] = useState("")
  const [progress, setProgress] = useState(0);
  const [messag, setMessage] = useState("")
  const navigate = useNavigate("")

  const handleImageChange = (e) => {
      const file = e.target.files[0];
    uploadFiles(file);
    console.log(file);
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();

   


    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regEx.test(email)) {
      setMessages("Email is valid")
    }
    // console.log(name);
    if (name.length === 0 && email.length === 0 ) {
      setError("true")
    }
    else if (!regEx.test(email)) {
      setMessages("Email is not valid");
    }
    else {
      setMessages("")

    }

    const reg = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/

    if(reg.test(phone)){
      setMessage("phone is valid")
    }
    else if(!reg.text(phone)){
      setMessage("Phone is not valid")
    }
    // if(name && email){
    //   console.log("Name:" ,name,"\n Email:" ,email);
    // }

    // if (name.length === 0) {
    //   setError(true)
    //   alert("Invald data")
    // }
    // if (name) {
    //   console.log(name);
    // }


    // let formData = {
    //   name: e.target[0].value,
    //   email: e.target[4].value,
    // }
    // console.log(formData);
    //  const isValid = await userSchema.isValid(formData)
    //  console.log(isValid);



    const newCompany = {
      name,
      address,
      city,
      state,
      email,
      phone,
      companyname,
      image,
      team,
      product,
      problem,
      unique,
      customer,
      competitor,
      revenue,
      market,
      service,
      proposal,
    }

    setName("")
    setAddress("")
    setCity("")
    setState("")
    setEmail("")
    setPhone("")
    setCompanyName("")
    setImage("")
    setTeam("")
    setProduct("")
    setProblem("")
    setUnique("")
    setCustomer("")
    setCompetitor("")
    setRevenue("")
    setMarket("")
    setService("")
    setProposal("")


    try {

      if (name && email && address && city && state && phone && companyname && regEx.test(email) && reg.test(phone)) {
        await CompanyCollection.addCompany(newCompany)
        setOpen(true);
      }

      console.log(newCompany);
    } catch {

    }
  }
  const handleClose = () => {
    setOpen(false);

  }
  
  const uploadFiles = (file) => {
    if(!file) return;
    const storageRef = ref(storage,  `/files/${file.name} `)
    const uploadTask = uploadBytesResumable(storageRef, file);
     

    uploadTask.on("state_changed", (snapshot) => {
      const prog =Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) *100);
      setProgress(prog);

      
    },(err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref )
      .then(url => console.log(url));
    }
    );
  }
  const handLogout =() => {
    navigate('/')
  }


  return (

    
    <ThemeProvider theme={theme}>

<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              INCUBATION-MANAGEMENT
            </Typography>
            <Button color="inherit" onClick={handLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>


    <Container component="main" maxWidth="xs"   >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Application Form
        </Typography>
        <Box component="form" noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label=" Name"

                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              {error && name.length <= 0 ? 
               <label style={{ color: "red" }} >name cannot be empty </label> : ""}
              {/* {error && name.length <= 0 ?
                <label style={{ color: "red" }}>Enter correct name</label> : ""} */}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                autoComplete="family-name"
              />
              {error && address.length <= 0 ?
                <label style={{ color: "red" }} >address cannot be empty </label> : " "}
              {/* {error && address.length <= 0 ?
                <label style={{ color: "red" }}>Enter correct naddress</label> : ""} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="city"
                label="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="city"
                autoComplete="city"
              />
              {error && city.length <= 0 ?
                <label style={{ color: "red" }} >enter your city </label> : ""}
              {/* {error && city.length <= 0 ?
                <label style={{ color: "red" }}>Enter correct name</label> : ""} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="state"
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                name="state"
                autoComplete="state"
              />
              {error && state.length <= 0 ?
                <label style={{ color: "red" }} >enter your state</label> : ""}
              {/* {error && state.length <= 0 ?
                <label style={{ color: "red" }}>Enter correct name</label> : ""} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
              />

              {message ? <label style={{ color: "red" }}>{message}</label> : ""}
              {error && email.length <= 0 ?
                <label style={{ color: "red" }} >email cannot be empty </label> : ""}

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone no"
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="phone"
              />
              {messag ? <label style={{ color: "red" }} >{messag}</label> : ""}
              {error && phone.length <10 ?
                <label style={{ color: "red" }} >provide a correct phone number </label> : " "}
              {/* {error && phone.length <= 0 ?
                <label style={{ color: "red" }}>Enter correct phone number</label> : ""} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="company "
                label="Company name"
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
                name="company"
                autoComplete="company"
              />
              {error && companyname.length <= 0 ?
                <label style={{ color: "red" }} >please enter your company name </label> : ""}
              {/* {error && companyname.length <= 0 ?
                <label style={{ color: "red" }}>Enter correct company name</label> : ""} */}
            </Grid>


            <section className="section-preview">

              <form className="md-form my-3 m">
                <div className="file-field">
                  <div className="btn btn-primary btn-sm float-left waves-effect waves-light mx-4 ">
                    <span>Choose file</span>
                    <input type="file"
                      name="image"
                      // value={image}
                      onChange={handleImageChange}
                       />
                    <h3>{progress} %</h3>

                  </div>
                  <div class="file-path-wrapper">
                    {/* <input class="file-path validate" type="text" placeholder="Upload your file"/> */}
                  </div>
                </div>
              </form>

            </section>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="Describe Your Team and BackGround"
                name="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                autoComplete="team"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="Describe Your Company and Product"
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                autoComplete="product"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="Describe the problem you are trying to solve"
                name="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                autoComplete="problem"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="What is unique about your solution"
                name="state"
                value={unique}
                onChange={(e) => setUnique(e.target.value)}
                autoComplete="unique"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="What is your value proposition for the customer?"
                name="state"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                autoComplete="customer"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="Who are your competitor and what is your competative advantage?"
                name="state"
                value={competitor}
                onChange={(e) => setCompetitor(e.target.value)}
                autoComplete="competitor"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="Explain your revenue model"
                name="revenue"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                autoComplete="revenue"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="What is the potential market size of the product?"
                name="state"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                autoComplete="market"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="state"
                label="How do you market or plan to market your product and service?"
                name="state"
                value={service}
                onChange={(e) => setService(e.target.value)}
                autoComplete="service"
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Type of Incubation needed</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Physical Incubation" />
                  <FormControlLabel value="male" control={<Radio />} label="Virtual Incubation" />
                </RadioGroup>
              </FormControl>


            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>

            <TextField
              required
              fullWidth
              id="state"
              label="Upload a detaiiled business proposal"
              name="proposal"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              autoComplete="proposal"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          // disabled={ name === ""  ||address === "" || city === "" || state ==="" || phone ==="" || companyname ==="" ? true : false }
          >
            SignUp


            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Form Submitted Seccesfully
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  ok
                </Button>
              </DialogActions>
            </Dialog>


          </Button>
       
          {/* <p>  <Link to="/" >  Logout</Link> </p> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">

              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
    </ThemeProvider>
  


  );

}
export default Home