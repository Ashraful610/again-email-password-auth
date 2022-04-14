import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import app from './firebase.init';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword} from 'firebase/auth'
import { Button} from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app)
function App() {
  const [validated, setValidated] = useState(false);
   
  const [error,setError] = useState()
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [register,setRegister] = useState(false)
  const [name, setName] = useState('')

  const handleEmail = event => {
    setEmail(event.target.value)
  }

  const handlePassword = event => {
      setPassword(event.target.value)
  }

  const handleRegisterChange = event => {  
        setRegister(event.target.checked)
  }

  const handleName = event => {
    setName(event.target.value)
  }
  
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if(!/(?=.*[A-Z])/.test(password)){
      setError('Should one uppercase caracter')
      return;
    }
    
    setValidated(true);
    setError('')

   
    if(register){
      signInWithEmailAndPassword(auth,email,password)
      .then(result => {
        const user = result.user
        console.log(user)
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
      })
    }
    else{
      createUserWithEmailAndPassword(auth,email,password)
      .then(result => {
        const user = result.user
        console.log(user)
        setEmail('')
        setPassword('')
        verifyEmail()
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
      })
    }
    event.preventDefault()
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('send vefifycation email ')
    })
  }
  return (
    <div className="w-50 mx-auto mt-5 ">
       <h2 className='text-primary'> Please { register ? 'Log In' :' Register'}
         </h2>
          <Form  noValidate validated={validated} onSubmit={handleSubmit} >
        { !register && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Your Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Enter Your Name" required />
              <Form.Control.Feedback type="invalid">
               Please provide a valid name .
               </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
              <Form.Control.Feedback type="invalid">
               Please provide a valid email.
               </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
          </Form.Group>
            <p className='text-danger'>{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange = {handleRegisterChange} type="checkbox" label="Already register ?" />
          </Form.Group>
           <Button variant='link'>Forget password ?</Button> 
           <br/>
          <Button onClick={handleSubmit} variant="primary" type="submit">
          { register ? 'Log In' :' Register'}
          </Button>
        </Form>
    </div>
  );
}

export default App;
