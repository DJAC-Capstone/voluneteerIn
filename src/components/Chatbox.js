import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getAllUsers, getUser } from '../redux/users';

// components
import Messages from './Messages';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      class: "chatBoxClose",
      openedChats: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.oppenMessage =this.oppenMessage.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  async componentDidMount(){
    await this.props.getAllUsers()
  }

  handleChange(ev) {
    this.setState({
      message: ev.target.value,
    });
  }

  oppenMessage(){
      if (this.state.class === 'showAllUsers'){
          this.setState({class: 'chatBoxClose'})
      } else {
          this.setState({class: "showAllUsers"})
      }
  }
  newMessage(user){
    this.setState({ openedChats: [...this.state.openedChats, user] });
  }

  render() {
    const { newMessage } = this;
    const {users, user}=this.props
    const { openedChats } = this.state;
    const friends = user.friends
    return (
      <div className='messages' >
        <div className={this.state.class}>
          {user.friends?
            users.map(user => 
              friends.indexOf(user.id) > -1?             
                  <ul key={user.id} onClick={()=>newMessage(user)}>{user.first_name}</ul>:null
            ):null        
          }
        </div>
        <button onClick={()=>this.oppenMessage()}>Messages</button>
          {
            openedChats.length > 0 && openedChats.map(chat => (
              <Messages chat={chat} key={chat.id} />
            ))
          }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.users.user,
    users: state.users.users,
    state
  }),
  (dispatch) => ({
    getAllUsers: () => dispatch(getAllUsers()),
    getUser: () => dispatch(getUser())
  }),
)(Chat);
