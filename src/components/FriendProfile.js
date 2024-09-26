import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { findUser } from '../redux/users';


class FriendProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            events: [],
            friends: [],
        }
    }
    async componentDidMount(){
        await this.props.findUser( this.props.match.params.id)
    }
    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.state.user.id){
            this.setState({
                user: this.props.user, 
                events: this.props.user.events? this.props.user.events: [], 
                friends: this.props.user.friends ? this.props.user.friends: []
            })
        }
    }
    render(){
        const {user}= this.props
        const {events, friends}= this.state
        return( 
            <div id="user-profile-main-container">
                <div className='user-mini-profile'> 
					<img src={user.imgURL}/>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <h4>Friends: {friends? friends.length:0}</h4>
                    <h4>Events: {events.length}</h4>
                </div>   
                <div className="activities">
                        {
                         events.map(event =>
                            {
                            return (
                            <div className='oneEvent-users-profile' key={event.id}>
                                <img src={`${event.image}`}/>
                                <ul>
                                    <Link to={`/events/${event.id}`}>{event.title}</Link>
                                    <li>{event.description}</li>
                                    <h5>{event.city},{' '}{event.state}{' '}</h5>
                                   
                                </ul>
                                <div>
                                    <h4>Commment</h4>
                                    <li>{event.comments}</li>
                                </div>
                            </div>
                            )
                            })
                        }
                </div>
            </div>
        
        )
    }
}


export default connect(
	(state) => ({
        user: state.users.foundUser,
        state
      }),(dispatch) => ({
        findUser: (id) => dispatch(findUser(id))
      })
  )(FriendProfile)
