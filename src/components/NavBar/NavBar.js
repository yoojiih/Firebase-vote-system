import React from 'react'
import { Navbar,Container,Nav,NavDropdown,Form,Button,FormControl,Card} from 'react-bootstrap'; 
import { Link, Route, Switch } from 'react-router-dom';
import '../../index.css';
function NavBar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="NavAll">
                <Container className="NavContainer">
                    <Navbar.Brand href="/" className="NavTitle">S h o p</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link><Link style={{ color: 'white', textDecoration: 'none', margin: '0px 10px 0px 100px', justifycontent:'center'}} to="/upload">Upload</Link></Nav.Link>
                        <Nav.Link href="#pricing" style={{ color: 'white', textDecoration: 'none', margin: '0px 10px'}}>Voting status</Nav.Link>
                        <NavDropdown title="Voting" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Nav>
                        <Nav.Link><Link style={{ color: 'white', textDecoration: 'none', margin: '0px 10px'}} to="/login">Sign In</Link></Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <Link style={{ color: 'white', textDecoration: 'none', margin: '0px 10px'}} to="/register">
                                Sign Up
                            </Link>
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default NavBar
