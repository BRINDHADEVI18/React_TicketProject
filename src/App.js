import React, { Component } from "react";// eslint-disable-next-lin
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Seat from './components/Seat';
import SeatDetails from "./components/SeatDetails";

//import AddTutorial from "./components/add-tutorial.component";
//import Tutorial from "./components/tutorial.component";
//import TutorialsList from "./components/tutorials-list.component";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        
          <div className="navbar-nav mr-auto">
              <h1 style={{color: "white"}}>TicketBookingApp</h1>
          </div>
        </nav>

        <div className="container mt-3">
          
          <Switch>
            <Route exact path={["/", "/ticket"]} component={SeatDetails} />
            <Route exact path={[ "/ticket/:id"]} component={Seat} />
            
          
          </Switch>
        </div>
      </div>
      </BrowserRouter> 
    );
  }
}

export default App;