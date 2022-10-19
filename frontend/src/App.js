import MainPageLayout from "./components/layout/MainPageLayout";
import TecPageLayout from "./components/layout/TecPageLayout";
import {MainPageURLs} from "./inventory/mainPageURLs";
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route element={<MainPageLayout/>}>
        <Route path={MainPageURLs.mainPage} element={<MainPage/>}/>
        <Route path={MainPageURLs.contact} element={<p>Contact</p>}/>
        <Route path={MainPageURLs.aboutMe} element={<p>About Me</p>}></Route>
      </Route>
      <Route element={<TecPageLayout/>}>
        <Route path={MainPageURLs.tec} element={<p>Tec</p>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
