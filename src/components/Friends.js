import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getAllUsers, followFrined, findUser} from '../redux/users';
import {Link} from 'react-router-dom'



class Friends extends Component {
    constructor () {
      super()
      this.state = {
        username:'',
        userDetail:null,
        frindList:[]
      }
      this.addFriend=this.addFriend.bind(this)
      this.handleSearch=this.handleSearch.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
      this.getFriendProfile = this.getFriendProfile.bind(this)
      this.unFollow = this.unFollow.bind(this)
    }
     componentDidMount(){
     this.props.getAllUsers()
      
    }
  
    handleSearch (e) {
      this.setState({ username: e.target.value })
    }
  
    handleSubmit (e) {
      e.preventDefault()
      // this.props.findUser()
    }

    addFriend(user,friendId){
      if(user.friends === null){
        const arr=[friendId]
        this.setState({username: ''})
        this.props.followFrined(user.id, arr)
      }else{ 
        const arr=[...user.friends ,friendId]
        this.setState({username: ''})
        this.props.followFrined(user.id, arr)
      }
    }

    getFriendProfile(id){
      this.setState({username: ''})
      this.props.findUser(id)
    }
    
    unFollow(user,friendId){
      const arr=[]
      for(let i=0; i<user.friends.length;i++){
        if(user.friends[i]!==friendId){
          arr.push(user.friends[i])
        }
      }
      this.props.followFrined(user.id, arr)
      this.setState({username: ''})
    }

    render () {
      const{handleSearch,handleSubmit}=this
      const {username} = this.state
      const {users, logedInUser}= this.props
      return (
      
        <div className='searchbar-container'>
          <form onSubmit={handleSubmit}>
            <input type='text' size='45' placeholder='name' onChange={handleSearch} value={username} />
            <button type='submit' onClick={handleSubmit}> Search</button>
          </form>
          <ul id="myUL" >
                {
                users.map( user => {
                  if (user.first_name.toLowerCase().indexOf(username.toLowerCase()) > -1 && username!== '') {
                      return (
                        <div key ={user.id}>
                          <img src={user.imgURL}/>
                          <Link to={`/users/${user.id}`} onClick={() =>this.getFriendProfile(user.id)}>{user.first_name}</Link>
                          {         
                          logedInUser.friends?                
                            logedInUser.friends.indexOf(user.id) > -1 ?
                            <button onClick={()=>this.unFollow(this.props.logedInUser, user.id)}>Unfollow</button>:
                            <button onClick={(ev)=>this.addFriend(this.props.logedInUser, user.id)}>Follow</button>
                            :<button onClick={()=>this.addFriend(this.props.logedInUser, user.id)}>Follow</button>
                          }
                        </div>
                      )
                    }
                  }) 
                }
            </ul>
          </div>
        )  
      }
  }
  const mapStateToProps=(state)=>{
    return{
      users:state.users.users,
      logedInUser:state.users.user
    }
  }
 const mapDispatchToProps=(dispatch)=>{
    return{
      followFrined:(id, arr)=>dispatch(followFrined(id, arr)),
      getAllUsers:()=>dispatch(getAllUsers()),
      findUser: (id) => dispatch(findUser(id))
    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (Friends);