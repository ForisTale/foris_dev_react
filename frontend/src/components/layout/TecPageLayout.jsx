import {Outlet} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Header";
import Footer from "./Footer";
import {useEffect} from "react";
import {tecPagesURLs} from "../../inventory/tecPagesURLs";

const TecPageLayout = () => {
  const links = [
    {title: "Home", url: tecPagesURLs.home},
    {title: "Skills", url: tecPagesURLs.skills},
    {title: "Items", url: tecPagesURLs.items},
    {title: "Spells", url: tecPagesURLs.spells},
    {title: "Other", url: tecPagesURLs.other},
    {title: "Plugins", url: tecPagesURLs.plugins},
    {title: "Commands", url: tecPagesURLs.commands},
  ];

  useEffect(() => {
    document.title = "The Elder Commands"
  }, []);

  return (
    <Container fluid={"xxl"}>
      <Header links={links}/>
      <Outlet/>
      <Footer/>
    </Container>
  );
};

export default TecPageLayout;