import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.linkColor}>
      <Container>
        <Navbar expand={"md"} className={styles.navbar}>
          <Navbar.Brand className={styles.navBrand} href={"/"}>Foris.dev</Navbar.Brand>
          <NavbarToggle aria-controls={"basic-navbar-nav"}/>
          <Navbar.Collapse id={"basic-navbar-nav"}>
            <Nav className={styles.nav}>
              <Nav.Link href={"/"}>The Elder Commands</Nav.Link>
              <Nav.Link href={"/"}>Contact</Nav.Link>
              <Nav.Link href={"/"}>About Me</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;