import MainPageLayout from "./components/layout/MainPageLayout";
import TecPageLayout from "./components/layout/TecPageLayout";
import {MainPageURLs} from "./inventory/mainPageURLs";
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";

function App() {
  return (
    <Routes>
      <Route element={<MainPageLayout/>}>
        <Route path={MainPageURLs.mainPage} element={<MainPage/>}/>
        <Route path={MainPageURLs.contact} element={<Contact/>}/>
        <Route path={MainPageURLs.aboutMe} element={<AboutMe/>}/>
        <Route path={MainPageURLs.privacyPolicy} element={<PrivacyPolicy/>}/>
        <Route path={MainPageURLs.cookiesPolicy} element={<CookiesPolicy/>}/>
      </Route>
      <Route element={<TecPageLayout/>}>
        <Route path={MainPageURLs.tec} element={<p>Tec</p>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
