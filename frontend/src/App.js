import MainPageLayout from "./components/layout/MainPageLayout";
import TecPageLayout from "./components/layout/TecPageLayout";
import {MainPageURLs} from "./inventory/mainPageURLs";
import {tecPagesURLs} from "./inventory/tecPagesURLs";
import {Routes, Route} from "react-router-dom";
import {MainPage, AboutMe, Contact} from "./pages/mainPages";
import {Home, Plugins, Other, Spells, Commands, Items, Skills} from "./pages/tecPages";
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
        <Route path={tecPagesURLs.home} element={<Home/>}></Route>
        <Route path={tecPagesURLs.skills} element={<Skills/>}></Route>
        <Route path={tecPagesURLs.items} element={<Items/>}></Route>
        <Route path={tecPagesURLs.spells} element={<Spells/>}></Route>
        <Route path={tecPagesURLs.other} element={<Other/>}></Route>
        <Route path={tecPagesURLs.plugins} element={<Plugins/>}></Route>
        <Route path={tecPagesURLs.commands} element={<Commands/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
