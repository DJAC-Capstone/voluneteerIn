import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser} from '../redux/users';
import { getEvents, followEvent, unFollowEvent } from '../redux/events';
import { Link } from 'react-router-dom';  


class Events extends Component {
	constructor() {
		super()
		this.state = {
			arr:[],
            user: {id:0},
		}
		this.getArr =this.getArr.bind(this)
		this.addEvent = this.addEvent.bind(this)
		this.removeEvent =this.removeEvent.bind(this)
	  }
	async componentDidMount() {
		await this.props.getEvents();
		await this.props.getUser()
	}
	editEventButton(){
		window.location.hash=`#/editEvent`
	}
	componentDidUpdate(prevProps){
        if(this.props.user.events === 'undefined'|| prevProps.user.id !== this.state.user.id){
			this.getArr()
			this.setState({user:this.props.user})
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


	render() {
		const {arr} =this.state
		const { events } = this.props;
		return (
			<div className="allEventsContainer">
				{
					events.map(event => (
						<div className='oneEvent' key={event.id}>
							<img src={event.image}/>
							<ul>
								<Link to={`/events/${event.id}`}>{event.title}</Link>
								<h5>{event.city},{' '}{event.state}{' '}</h5>
								<li>{event.description}</li>
							</ul>
							{
							arr ?
								arr.indexOf(event.id) === -1?
								<button onClick={()=> this.addEvent(event)}> Join </button>:
								<button onClick={()=> this.removeEvent(event)}> Cancel </button>
							:null
							}
						</div>
					))
				}
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			events: state.events.events,
			user: state.users.user
		};
	},
	dispatch => {
		return {
			getEvents: () => dispatch(getEvents()),
			followEvent: (userID, EventTd) => dispatch(followEvent(userID, EventTd)),
			unFollowEvent: (userID, EventTd) => dispatch(unFollowEvent(userID, EventTd)),
			getUser: () => dispatch(getUser()),
		};
	},
)(Events);
