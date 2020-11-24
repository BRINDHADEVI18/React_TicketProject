
import React , { Component } from 'react';
export class Seat extends Component {
    constructor(props) {
        super(props);
      //  this.getPassengerDetails=this.getPassengerDetails.bind(this);
      this.updateName=this.updateName.bind(this);
      this.updateAge=this.updateAge.bind(this);
      this.updateGender=this.updateGender.bind(this);
      this.updatePhone=this.updatePhone.bind(this);
      this.updateTicket=this.updateTicket.bind(this);
      this.updateTicketDetails=this.updateTicketDetails.bind(this);
      
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
              currentPass:{
                name:"",
                gender:"",
                age:null,
                phone:"",
                email:""
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
    updateName(e){
        const nam=e.target.value;
        console.log(nam);
        this.setState(prevState => ({
            ...prevState,
            currentTicket: {
                ...prevState.currentTicket,
                passenger:  {
                       ...prevState.currentTicket.passenger,
                       name: nam
                    }
                }
           
        }))
    }
    updateGender(e){
        const g=e.target.value;
        console.log(g);
        this.setState(prevState => ({
            ...prevState,
            currentTicket: {
                ...prevState.currentTicket,
                passenger:  {
                       ...prevState.currentTicket.passenger,
                       gender: g
                    }
                }
           
        }))
    }
    updateAge(e){
        const ag=e.target.value;
        console.log(ag);
        this.setState(prevState => ({
            ...prevState,
            currentTicket: {
                ...prevState.currentTicket,
                passenger:  {
                       ...prevState.currentTicket.passenger,
                       age: ag
                    }
                }
           
        }))
    }
    updatePhone(e){
        const ph=e.target.value;
        console.log(ph);
        this.setState(prevState => ({
            ...prevState,
            currentTicket: {
                ...prevState.currentTicket,
                passenger:  {
                       ...prevState.currentTicket.passenger,
                       phone: ph
                    }
                }
           
        }))
    }
    updateMail(e){
        const mail=e.target.value;
        console.log(mail);
        this.setState(prevState => ({
            ...prevState,
            currentTicket: {
                ...prevState.currentTicket,
                passenger:  {
                       ...prevState.currentTicket.passenger,
                       email:mail
                    }
                }
           
        }))
    }
      updateTicketDetails=()=>{
           /*  let ticktet={
                    ticket_id: this.state.currentTicket.ticket_id,
                    is_available:this.state.currentTicket.is_available,
                    seat_no:this.state.seat_no,
                    passenger:{
                        name:this.state.currentTicket.passenger.name,
                        gender:this.state.currentTicket.passenger.gender,
                        age:this.state.currentTicket.passenger.age,
                        phone:this.state.currentTicket.passenger.phone,
                        email:  this.state.currentTicket.passenger.email,
                       
                       
                        
                    }
                }
                   */ 
      
  

    
             
                  
      }
      updateTicket=(e)=>{
      
        const ticket={
            seat_no:e.target.value,
         //   is_available:document.getElementById('avail'),
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
            mode:'cors',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
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