import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getPosts} from '../redux/posts'
import uuid from 'react-uuid'
import  { getEvents } from '../redux/events'
export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts:[],
      events: [],
      allUsers: [],
      userEvents: [],
      img:'0.jpg'
    }
  }
  componentDidMount() {
    this.props.fetchEvents()
    if(this.props.allUsers.user.imgURL !== null){
      this.setState({img: this.props.allUsers.user.imgURL })
    }
    this.props.fetchPosts()
    this.setState({  posts:this.props.posts})
  }
  render() {
    console.log("props in render", this.props)
    const {user} = this.props.allUsers
    const {users} = this.props.allUsers
    const userInfo = users.filter(u=>u.id === user.id)
    if (userInfo.length === 0 || userInfo.events === null ){
      return (
        null
      ) 
    }
    return (
      <div className="main-container">
        <div className="left-container">
          <div className="profile-picture">
            <img src={this.state.img}/>
            <Link to={`/users/profile/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
          </div>
          <div className="user-post-container">
            <input placeholder="Post"></input>
            <div className="other-type-of-posts-container">
              <button><Link to = "/createEvent">Create Event</Link></button>
              {/* <button>Upload Photo</button> */}
              <button>Post</button>
              <button><Link to =  "/updateUser">Update Profile</Link></button>
              <button><Link to = "/posts">Create Post</Link></button>
            </div>
          </div>
          <div className="last-post">
            <p className="post-title">Had a great time with friends volunteering at the soup kitchen</p>
            <img className="image-post" src="https://media.istockphoto.com/photos/volunteers-cleaning-park-picture-id986900214?k=6&m=986900214&s=612x612&w=0&h=XaXvsvgJt1keusMMkOyXF8xpOxVLI3znd0SWRFSYxvY=" />
          </div>
          <div className="last-post">
            <p className="post-title">Had a great time with friends volunteering at the soup kitchen</p>
            <img className="image-post" src="https://media.istockphoto.com/photos/donate-to-the-poor-homeless-still-seen-in-society-concept-of-charity-picture-id1082704324?k=6&m=1082704324&s=612x612&w=0&h=o4mrYDjCvudoAexUUthn8GtB2Q_hHasHmek7YHPy0cw=" />
          </div>
          <div className="last-post">
            <p className="post-title">Had a great time with friends volunteering at the soup kitchen</p>
            <img className="image-post" src="https://media.istockphoto.com/photos/people-planting-tree-in-park-picture-id1022255954?k=6&m=1022255954&s=612x612&w=0&h=kGMlSfixvVec2FSsrmoE785K5_m4pPcj0tYl3TdKYvk=" />
          </div>
          <div >
         {this.state.posts.map(post=>{
           console.log(post.imagePreviewUrl)
              return (<div key={post.id}>
                  <img src={post.imagePreviewUrl}/>
                  <h5>{post.comment}</h5>
                  <img id='new-img'/>
              </div>)
            })}
         </div>
        </div>
        <div className="middle-container">
          {user.friends.length === 0 || user.friends === undefined || user.friends === null ?
          <p></p>
          :
          user.friends.map (friendID => {
          let friendInfo = users.find((friend) => friend.id === friendID)
          return (
            <div key={uuid()} className="other-users-post-container">
              <div className="profile-pic-and-name-container">
                <img className="profile-pic" src={`${friendInfo.imgURL}`}/>
                <div>
                  <Link to={`/users/${friendInfo.id}`}>{`${friendInfo.first_name} ${friendInfo.last_name}`}</Link>
                  {friendInfo.events.length === 0 ? <div>No Events Found</div> :
                  <div className="friends-events-details">
                    <p>{`${friendInfo.events[0].title}`}</p>
                    <p>{`${friendInfo.events[0].description}`}</p>
                  </div>
                  }
                </div>
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
    user: state.users.user,
    posts: state.posts.posts,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // getUser: ()=> dispatch(getUser()),
    fetchEvents: () => dispatch(getEvents()),  
    fetchPosts: () => dispatch(getPosts()),
    // fetchAllUsers: () => dispatch(getAllUsers()),
    // findUser: (id) => dispatch(findUser(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)