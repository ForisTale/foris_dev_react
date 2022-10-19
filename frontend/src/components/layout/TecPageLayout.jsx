import {Outlet} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../Header";

const TecPageLayout = () => {
  return (
    <Container>
      <Header links={[]}/>
      <Outlet/>
    </Container>
  );
};

export default TecPageLayout;