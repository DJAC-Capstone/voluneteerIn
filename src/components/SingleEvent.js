import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleEvent, followEvent,unFollowEvent } from '../redux/events';
import DisplayMaps from './DisplayMap';
import { Link } from 'react-router-dom';  


class SingleEvent extends Component{
    constructor(){
        super();
        this.state = {
            id: 0,
            event: {id:0},
            arr:[],
            user: {},
          }
        this.getArr =this.getArr.bind(this)
		this.addEvent = this.addEvent.bind(this)
		this.removeEvent =this.removeEvent.bind(this)
    }

   async componentDidMount(){
       await this.props.singleEvent(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if (this.state.id !== this.props.match.params.id){
			this.getArr()
            this.setState({
                event: this.props.event,
                user: this.props.user,
                id: this.props.match.params.id
            })
        }
      }
    addEvent(event){
        const newArr=[...this.state.arr]
		newArr.push(event.id)
        this.setState({arr: newArr})
		this.props.followEvent(this.props.user, event)
	}
	removeEvent(event){
        const newArr=[]
        for(let i=0; i< this.state.arr.length; i++){
            if(this.state.arr[i] !== event.id){
                newArr.push(this.state.arr[i])
            }
		}
		this.props.unFollowEvent(this.props.user, event)
		this.getArr()
        this.setState({arr: newArr})
	}
	getArr(){
		const newArr=[]
		this.props.user.events?
			this.props.user.events.forEach(index =>{
				newArr.push(index.id)
			})
		:null
		this.setState({arr: newArr})
	}



    render(){
		const {arr} =this.state
        const {event} = this.state
        return (
            <div className="singleeventContainer">
                        <img src={event.image}/>
                    <div className='titleContainer'>   
                        <ul>
                            <h2>{event.title}</h2>
                            <h3>Date: {new Date(event.date).toDateString()}</h3>
                            <h4>Description: {event.description}</h4>
                        </ul>
                        <div className='button-container'>
                            {
								arr ?
                                    arr.indexOf(event.id) === -1?
                                    <button onClick={()=> this.addEvent(event)}> Join </button>:
                                    <button onClick={()=> this.removeEvent(event)}> Cancel </button>
							    :null
							}
							<Link  to={`${event.id}/editEvent`}><button>Edit</button></Link>
                        </div>
                    </div>
                <div className='dataContainer'>
                    <div className="eventLocation">
                  <h4>Location: {' '}{event.city}, {''}{event.state}</h4>
                        <div>
                        <DisplayMaps event ={event}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        event:  state.events.event,
		user: state.users.user

      }),
      (dispatch) => ({
        singleEvent: (id) => dispatch(singleEvent(id)),
        followEvent: (userID, EventTd) => dispatch(followEvent(userID, EventTd)),
		unFollowEvent: (userID, EventTd) => dispatch(unFollowEvent(userID, EventTd)),

      })
)(SingleEvent)

