import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';
// import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';




function MyNavbar() {

  const firebase = useFirebase()
  // useEffect()
  const signOut=()=>{
      firebase.signMeOut()
    
  }
  

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Bookify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/books/list">Add listing</Nav.Link>
            <Nav.Link href="/books/orders">Orders</Nav.Link>


            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Button
              </Button>
            </InputGroup>



            <Nav.Link onClick={signOut} href="/login" >
            {/* <button onClick={signOut} >SignOut</button> */}
            {firebase.isLoggedIn ? "SignOut" : "SignIn"}        
            </Nav.Link>
            {/* <Nav.Link onClick={()=>alert("clicked")}>Click</Nav.Link> */}
        
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;