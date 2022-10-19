import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import styles from "./Header.module.css";
import {MainPageURLs} from "../inventory/mainPageURLs";
import {LinkContainer} from "react-router-bootstrap";

const Header = (props) => {

  const links = props.links.map(link => (
    <LinkContainer key={link.title} to={link.url}><Nav.Link>{link.title}</Nav.Link></LinkContainer>));

  return (
    <header className={styles.linkColor}>
      <Navbar expand={"md"} className={styles.navbar}>
        <LinkContainer to={MainPageURLs.mainPage}>
          <Navbar.Brand className={styles.navBrand}>Foris.dev</Navbar.Brand>
        </LinkContainer>
        <NavbarToggle aria-controls={"basic-navbar-nav"}/>
        <Navbar.Collapse id={"basic-navbar-nav"}>
          <Nav className={styles.nav}>
            {links}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;