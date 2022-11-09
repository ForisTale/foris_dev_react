import {Outlet} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Header";
import Footer from "./Footer";

const TecPageLayout = () => {
  return (
    <Container>
      <Header links={[]}/>
      <Outlet/>
      <Footer/>
    </Container>
  );
};

export default TecPageLayout;