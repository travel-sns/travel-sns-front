import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import Menu from "Src/Menu.js"
// import RoutePage from "Src/RoutePage.js"
import LoginPage from "Src/Container/LoginPage";

const App = () => {
  return (
    <Router basename="/travel-sns-front">
      <LoginPage></LoginPage>
    </Router>
  );
};

// const App = () => {
//     return (<div>
//       <Router basename="/travel-sns-front">
//         <Menu/>
//         <RoutePage/>
//       </Router>
//     </div>)
// }

export default App;
