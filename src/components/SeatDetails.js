import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import steer from '../static/img/steer.png';
class SeatDetails extends Component {
  constructor(props) {
    super(props);
     this.getSeatstatus = this.getSeatstatus.bind(this);
     this.resetAllTickets = this.resetAllTickets.bind(this);

    this.state = {
      size: "small",
      tickets:[],
      isLoaded:false,
      currentTicket_id:{},
      currentIndex:-1,
      arr: [0, 2.5, 5, 7.5, 10, 12.5, 15,17.5,20,22.5],
      oddA: ["1", "3", "5", "7", "9", "11", "13", "15","17","19"],
      evenA: ["2", "4", "6", "8", "10", "12", "14","16","18","20"],
      oddB: ["21", "23", "25", "27", "29", "31", "33", "35","37","39"],
      evenB: ["22", "24", "26", "28", "30", "32", "34","36","38","40"],
    };
  }
  componentDidMount() {
   // const url='';
    fetch('https://api-bookingticket-nestjs.herokuapp.com/details/tickets'
     //mode: 'no-cors' // 'cors' by default
    ).then(res => res.json()).then(json => {
            console.log(json);
            this.setState({
                isLoaded: true,
                
                tickets: json
                
            })
        })
        .catch(err=>{
          console.log(err);
        })
           
   
  }
 getSeatstatus(tickets,seat)
 { 
   
 console.log(tickets);
  const test=ticket=>ticket.seat_no==seat;
   const res= tickets.find(test);
   console.log(res);
     this.setState({
      currentTicket_id: res,
      currentIndex:1
     
  }); 
 

 }
 resetAllTickets=()=>{
  fetch('https://api-bookingticket-nestjs.herokuapp.com/details/reset').then(res=>res.json()).then(res=>{

    console.log(res);
    alert(' All the seats are successfully Reseted');
    this.setState({isLoaded: false});
    this.componentDidMount();
})

 }


  render() {
    const { size, arr, oddA, oddB, evenA, evenB ,tickets,currentTicket_id,currentIndex} = this.state;
 //   const {open,close}=this.props;
    return (
            <div style={{display: "flex"}} className="list row">
       <div className="col-md-6">
                 <div style={styles.wrapper}>
          <div className="steer" style={styles.steer}>
            <img style={styles.img} src={steer} alt="Steering"/>
          </div>
          <div style={styles.busDiv}>
            {arr.map((le, i) => {
              return (
                <div key={i}
                  
               style={{ ...styles.firstCol, ...{ top: `${le}rem` } }}

               >
                  <button
                    className="btn btn-sm btn-primary"
                    type="primary"
                   onClick={()=>this.getSeatstatus(tickets,oddA[i])}
                    size={size}
                   >
                    {oddA[i]}
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    type="primary"
                    onClick={()=>this.getSeatstatus(tickets,evenA[i])}
                    size={size}
                   >
                    {evenA[i]}
                  </button>
                </div>
              );
            })}
            {arr.map((le, i) => (
              <div
                key={i}
                style={{ ...styles.secondCol, ...{ top: `${le}rem` } }}
               
              >
                <button
                  className="btn btn-sm btn-primary"
                  type="primary"
                  onClick={()=>this.getSeatstatus(tickets,oddB[i])}
            
                >
                  {oddB[i]}
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={()=>this.getSeatstatus(tickets,evenB[i])}
                  type="primary">
                  {evenB[i]}
                </button>
              </div>
            ))}
          </div>
      
        </div>
        <div >
                <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.resetAllTickets}
          >
            Reset
          </button>
  
                </div>
        </div>
               
               
       

      
        <div className="col-sm-6">
        {(currentIndex==1)? (
            <div>
              <h4>Seat Details</h4>
              <div>
                <label>
                  <strong>Seat Number:</strong>
                </label>{" "}
                {currentTicket_id.seat_no}
              </div>
              
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTicket_id.is_available ? "Not Booked" : "Booked"}
              </div>
              <Link   to={"/ticket/" + currentTicket_id.ticket_id} >Edit</Link>
              
             
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on any seat...</p>
            </div>
          )} 
         </div>
      
      </div>
      
  
    );
  }
}

const styles = {
  wrapper: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center"
  },
  steer: {
    margin: ".5rem",
    position: "relative",
    top: 0,
    left: "12rem"
  },
  img: {
    height: "3rem",
    transform: "rotate(90deg)"
  },
  busDiv: {
      background: "#434343",
    height: "98rem",
    position: "relative",
    width: "17rem",
    color: "#ffff"
  },
  secondCol: {
    position: "absolute",
    top: 0,
    right: 0
  },
  firstCol: {
    position: "absolute",
    top: 0,
    left: 0
  },
  
  button: {
    margin: ".5rem"
  }
};

export default SeatDetails;

