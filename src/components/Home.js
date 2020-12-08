import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import  { getEvents } from '../redux/events'
import { getAllUsers } from '../redux/users'

import User from './User'



export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      allUsers: [],
      user: '',
      showUserComponent: false
    }
    this.createEventButton = this.createEventButton.bind(this)
    this.handleUserNameClick = this.handleUserNameClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchAllUsers()
    await this.props.fetchEvents()
    this.setState({
      events: this.props.events,
      allUsers: this.props.allUsers,
      user: this.props.allUsers.users[Math.floor(Math.random()*(3-1)+1)]
    });
    document.getElementById('userName').innerHTML = this.state.user.first_name + ' ' + this.state.user.last_name
  }

  handleUserNameClick(ev){
    const u = document.getElementById('userName').innerHTML.split(' ').join('').toLowerCase();
    this.setState({
      user: u,
      showUserComponent: true
     })
  }

  createEventButton () {
    window.location.hash = "#/createEvent"
  }
  render() {
    return (
      <div className="main-container">
        <div className="left-container">
          <img src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * (40 - 1) + 1)}.jpg`}/>
          <p id="userName" value={this.innerTex} onClick={this.handleUserNameClick}></p>
          {this.state.showUserComponent ? <Redirect 
          to={{
            pathname: `/${this.state.user}`, 
            state: {name: this.state.user}
          }}
          /> : null}

          <div className="user-post-container">
            <input placeholder="Share A Thought"></input>
            <div className="other-type-of-posts-container">
              <button onClick = {this.createEventButton}>Create Event</button>
              <button>Upload Photo</button>
              <button>Upload Video</button>
            </div>
          </div>
        </div>
        

        <div className="middle-container">
          {this.state.events.map (ev=>{
            let randID = Math.floor(Math.random() * (3 - 1) + 1)
            return (
              <div key={ev.id} className="other-users-post-container">
                <div className="profile-pic-and-name-container">
                  <img src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * (40 - 1) + 1)}.jpg`}/>
                  {/* {this.state.allUsers.users.map(usr=>{
                    return ( */}
                    <div className="other-users-post-text">
                      <p className="full-name">{`${this.state.allUsers.users[randID].first_name} ${this.state.allUsers.users[randID].last_name}`}</p>
                      <p className="event-description">{ev.description}</p>
                    </div>
                    {/* )
                  })} */}
                </div>
              </div>
           )
           })}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    allUsers: state.users,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(getEvents()),
    fetchAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)