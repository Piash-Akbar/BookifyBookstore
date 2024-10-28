import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';
import { useEffect } from 'react';

function MyNavbar() {

  const firebase = useFirebase()
  // useEffect()
  const signOOut=()=>{
      firebase.signMeOut()
    
  }
  

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/books/list">Add listing</Nav.Link>
            <Nav.Link href="/books/orders">Orders</Nav.Link>
            <Nav.Link href="/login" >
            <button onClick={signOOut} >SignOut</button>
            
            </Nav.Link>
        
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;