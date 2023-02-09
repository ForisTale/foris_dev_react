import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import classes from "./Header.module.css";
import {MainPageURLs} from "../../inventory/mainPageURLs";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";

type LinksType = {title: string, url: string}[];

const Header: React.FC<{links: LinksType}> = (props) => {

  const links = props.links.map(link => (
    <LinkContainer key={link.title} to={link.url}><Nav.Link>{link.title}</Nav.Link></LinkContainer>));

  return (
    <header className={classes.linkColor}>
      <Navbar collapseOnSelect expand={"md"} className={classes.navbar}>
        <LinkContainer to={MainPageURLs.mainPage}>
          <Navbar.Brand className={classes.navBrand}>Foris.dev</Navbar.Brand>
        </LinkContainer>
        <NavbarToggle aria-controls={"basic-navbar-nav"}/>
        <Navbar.Collapse id={"basic-navbar-nav"}>
          <Nav className={classes.nav}>
            {links}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;