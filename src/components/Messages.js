import io from 'socket.io-client';
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Messages extends Component{
    constructor() {
        super();
        this.state = { 
            message:'',
            setMessage:'',
            allMessages:[],
            setAllMessages:[],
            className:'chatBox',
        };
    this.handleChange = this.handleChange.bind(this);
    this.oppenMessage =this.oppenMessage.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this)
      }

    async componentDidMount(){
        const socket = io(window.location.origin);
        if(this.props.chat === this.props.user.id || this.props.user.id){
        socket.on('get-message', (test) => {
            this.setState({allMessages:[ ...this.state.allMessages, test ]})
        });}
    }
   

    handleChange({ target }) {
        this.setState({message:target.value});
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const socket = io(window.location.origin);
        socket.emit('send-message', this.state.message);
        this.setState({message:''});        
      } 

    oppenMessage(){
        if (this.state.className === 'chatBox'){
            this.setState({className: 'chatBoxClose'})
        } else {
            this.setState({className: "chatBox"})
        }
    }
  render() {
    const { oppenMessage,handleSubmit,handleChange } = this;
    let nr=1
    const {chat}=this.props

    const{ message, allMessages,className,}=this.state
    return (
        <div className={className}>
            <div className='message-history'>
                {
                   allMessages.map(message => {
                        return (
                            <p key={nr++}>{message}</p>
                        )
                    })
                }
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' id='message-input' autoComplete="off" onChange={handleChange} value={message} />
                <button type='submit' id='send-button'>Send</button>
            </form>
            <h4 onClick={oppenMessage}>{`${chat.first_name} ${chat.last_name}`}</h4>
        </div>
    )
    }
}
export default connect(
    (state) => ({
      user: state.users.user,
      users: state.users.users,
    }),
    null
  )(Messages);