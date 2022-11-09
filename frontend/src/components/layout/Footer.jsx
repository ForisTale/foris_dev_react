import classes from "./Footer.module.css";
import {Link} from "react-router-dom";
import {MainPageURLs} from "../../inventory/mainPageURLs";


const Footer = () => {
  return (
    <div className={`${classes.footer} fixed-bottom`}>
      <p>Foris.dev all rights reserved.</p>
      <Link className={classes.link} to={MainPageURLs.cookiesPolicy}>Cookies Policy</Link>
      <Link className={classes.link} to={MainPageURLs.privacyPolicy}>Privacy Policy</Link>
    </div>
  );
};

export default Footer;