import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { getUser } from '../redux/users';



export class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            events: [],
            friends: [],
            img:'0.jpg'
        }
    }
    async componentDidMount(){
		await this.props.getUser()
	}
    componentDidUpdate(){
        if(this.state.user === ''){
            this.setState({user: this.props.user, events: this.props.user.events, friends: this.props.user.friends})
            if(this.props.user.imgURL !== null){
                this.setState({img: this.props.user.imgURL })
            }
        }
    }
    render(){
        const {events, user, friends,img} = this.state
        return( 
            <div id="user-profile-main-container">
                <div className='user-mini-profile'> 
					<img src={img}/>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <h4>Friends: {friends !==  null ? friends.length: 0}</h4>
                    <h4>Events: {events.length}</h4>
                    <button><Link to =  "/updateUser">Update Profile</Link></button>
                </div>   
                <div className="activities">
                        {events.map(event =>
                            {
                            return (
                            <div className='oneEvent-users-profile' key={event.id}>
                                <img src={event.image}/>
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
		user: state.users.user
      }),(dispatch) => ({
        getUser: () => dispatch(getUser()),
      })
  )(User)
