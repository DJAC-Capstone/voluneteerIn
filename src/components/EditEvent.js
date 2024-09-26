import React, {Component} from 'react'
import {connect} from 'react-redux'
import {userStyles} from '../utils/userStyles'
import {updateEvent} from '../redux/events'

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
        title: '',
      description: '',
      date: '',
      city: '',
        state: '',
    }      
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  async handleChange(ev){
      ev.preventDefault(ev);
      this.setState({[ev.target.name]:ev.target.value})
  }
  async handleSubmit(ev) {
    ev.preventDefault();
    await this.props.updateEvent(this.state,this.props.match.params.id)	
		window.location.hash = "#/events"
  }


  render(){   
  const { handleChange,handleSubmit} = this
  const {event}=this.props;
    return (
      <div  style={{ marginTop: '100px',marginLeft:'50px' }} id='edit-event'>
        <form style={userStyles} onSubmit={handleSubmit}>
          <div style={{ margin: '20px' }}>
            <h3>Edit Event Info</h3>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Title" name="title" onChange={handleChange} value={this.state.title } />
            </div>
            <div className="form-group">
              <input type="text" className="form-control"  placeholder="Description" name="description" onChange={handleChange} value={this.state.description} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Date" name="date" onChange={handleChange} value={this.state.date} />
            </div>
            <hr/>
            <h3>Edit Event Location</h3>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="City" name="city" onChange={handleChange} value={this.state.city} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control"  placeholder="State" name="state" onChange={handleChange} value={this.state.state} />
            </div>
            <button type="submit" className="btn btn-primary"> Save Changes </button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps=({event})=>{
  
   
    return{
        event,
        
       
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
      updateEvent: (event,id) => dispatch(updateEvent(event,id)),
     
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
