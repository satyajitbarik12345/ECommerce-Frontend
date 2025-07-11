import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import SearchBarForProducts from "./SearchBarForProducts";
import "../App.css";

function NavBar() {
  let history = useHistory();
  const dispatch = useDispatch();

  // login reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // logout
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
    window.location.reload();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Brand Name with Scrolling Text */}
          <Navbar.Brand className="scrolling-brand">
            <span className="scrolling-text">SATYAMEGAMART</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* All Products */}
              <LinkContainer to="/">
                <Nav.Link>All Products</Nav.Link>
              </LinkContainer>

              {/* New Product (Admins Only) */}
              {userInfo && userInfo.admin && (
                <LinkContainer to="/new-product/">
                  <Nav.Link>Add Product</Nav.Link>
                </LinkContainer>
              )}

              {/* Search Bar */}
              <span className="">
                <SearchBarForProducts />
              </span>
            </Nav>

            {/* Login / Logout Section */}
            {userInfo ? (
              <NavDropdown
                className="navbar-nav text-capitalize"
                title={userInfo.username}
                id="username"
              >
                <LinkContainer to="/account">
                  <NavDropdown.Item>Account Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/all-addresses/">
                  <NavDropdown.Item>Address Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/stripe-card-details/">
                  <NavDropdown.Item>Card Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/all-orders/">
                  <NavDropdown.Item>All Orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
