import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/users';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


import Home from './Home';
import NavBar from './NavBar'
import Register from './Register';
import Login from './Login';
import Events from './Events'
import Friends from './Friends'
import CreateEvent from './CreateEvent'
import Posts from './Posts'
import EditEvent from './EditEvent'
import User from './User'
import SingleEvent from './SingleEvent'
import FriendProfile from './FriendProfile'
import UpdateProfile from './UpdateProfile'



class App extends Component {
	
	async componentDidMount(){
		await this.props.getUser()
	}
	render() {
		console.log("app props", this.props)

		return (
			<Router>
				{/* <main> */}
					<NavBar />
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/home" component={Home}/>
						<Route exact path="/register" component={Register} />
						<Route exact path="/friends" component={Friends} />
						<Route exact path="/events" component={Events} />
						<Route exact path="/events/:id/editEvent" component={EditEvent} />
						<Route exact path="/createEvent" component={CreateEvent} />
						<Route exact path="/posts" component={Posts} />
						{/* <Route exact path="/uploadPhoto" component={UploadPhoto} /> */}
						<Route exact path="/users/profile/:id" component={User} />
						<Route exact path="/users/:id" component={FriendProfile} />
					  	<Route exact path="/updateUser" component={UpdateProfile} />
						<Route exact path="/events/:id" component = { SingleEvent } />
          
					</Switch>
				{/* </main> */}
			</Router>
		);
	}
}

export default connect(
	(state) => ({
		user: state.users.user
      }),
	(dispatch) => ({
	  getUser: () => dispatch(getUser())
	}),
)(App);