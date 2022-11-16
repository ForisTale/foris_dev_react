import classes from "./Footer.module.css";
import {Link} from "react-router-dom";
import {MainPageURLs} from "../../inventory/mainPageURLs";


const Footer = () => {
  return (
    <>
      <div className={classes.footerSeparator}/>
      <footer className={`${classes.footer} fixed-bottom`}>
        <h6>Foris.dev all rights reserved.</h6>
        <Link className={classes.link} to={MainPageURLs.cookiesPolicy}>Cookies Policy</Link>
        <Link className={classes.link} to={MainPageURLs.privacyPolicy}>Privacy Policy</Link>
      </footer>
    </>
  );
};

export default Footer;