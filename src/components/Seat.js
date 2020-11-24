
import React , { Component } from 'react';
export class Seat extends Component {
    constructor(props) {
        super(props);
      //  this.getPassengerDetails=this.getPassengerDetails.bind(this);
      this.updateStatus=this.updateStatus.bind(this);
      this.updateTicket=this.updateTicket.bind(this);
      this.state = {
            currentTicket: {
                ticket_id:this.props.match.params.id,
                seat_no:null,
                is_available: true,
                passenger:{
                    name:"",
                    gender:"",
                    age:null,
                    phone:"",
                    email:""

                } 
              
              },
           
            message:"",
          isLoaded: false
        }
      }
    
      componentDidMount() {
      
        fetch(`https://api-bookingticket-nestjs.herokuapp.com/ticket/${this.props.match.params.id}`).then(result => result.json()).then(res => {
            console.log(res);
//            console.log(res.passenger.name);
            this.setState({ 
                isLoaded: true,
                currentTicket: res
            })
        })
        

      }
    updateStatus=(status)=>{
        this.setState(prevState=>({
            ...prevState.currentTicket,
                is_available:status
            
    }))

    }
      updateTicket=(e)=>{
      
        const ticket={
            seat_no:this.state.seat_no,
       is_available:this.state.is_available,
           passenger:{ name:document.getElementById('name'), 
            gender:document.getElementById('gender'),
            age:document.getElementById('age'),
            phone:document.getElementById('phne'),
             email:document.getElementById('email'),}
        }
        console.log(ticket);
        this.setState({
           
            currentTicket:ticket
           
        });
        
        fetch(`https://api-bookingticket-nestjs.herokuapp.com/ticket/${this.props.match.params.id}`,{
        
                       
            method: 'PUT',
          // status:"OK",
            headers: {'Content-Type': 'application/json'
        },
            body: JSON.stringify(this.state.currentTicket)
          }).then(res => res.json()).then(r=>{
              console.log(r);
              
              if(r){
                this.setState({isLoaded: false});
                this.componentDidMount();
                alert('Booking Success');
              }
          })

      }
     
       
    render(){
        const { currentTicket,currentPass } = this.state;

    return (
      < div>
        {currentTicket ? (
          <div className="edit-form" >
            <h4>Please fill the details to book the seat</h4>
            <form> 
              <div className="form-group">
                <label >Seat Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="seat"
                  value={currentTicket.seat_no}
                 
                />
              </div>
             
              <div className="form-group">
                <label >Passenger Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                 
               />
              </div>
              <div className="form-group">
                <label >Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                 
               />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                
                
                  
                />
              </div>
              <div className="form-group">
                <label >Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phne"
               
                  
                />
              </div><div className="form-group">
                <label htmlFor="Seat">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
               
                  
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTicket.is_available? "Not Booked" : "Booked"}
              </div>
            </form>
            

            {currentTicket.is_available ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                Not Booked
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Booked
              </button>
            )}

           

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTicket}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on any seat...</p>
          </div>
        )}
      </div>
    );
        
        }
}
export default Seat
