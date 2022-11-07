import Header from "../Header";
import Container from "react-bootstrap/Container";
import {Outlet} from "react-router-dom";
import {MainPageURLs} from "../../inventory/mainPageURLs";
import ShowImportantMessages from "../ShowImportantMessages";

const MainPageLayout = () => {
  const links = [
    {title: "The Elder Commands", url: MainPageURLs.tec},
    {title: "Contact", url: MainPageURLs.contact},
    {title: "About Me", url: MainPageURLs.aboutMe},
  ]
  return (
    <Container>
      <Header links={links}/>
      <ShowImportantMessages/>
      <Outlet/>
    </Container>
  );
};

export default MainPageLayout;