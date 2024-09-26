import axios from 'axios';

const GET_USER = 'GET_USER';
const LOGIN_USER = 'LOGIN_USER';
const GET_ALL_USERS = 'GET_ALL_USERS';
const SIGN_UP = 'SIGN_UP';
const FIND_USER='FIND_USER';
const FOLLOW_USER = 'FOLLOW_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  user: {},
  users: [],
  foundUser:{}
};

export const _getUser = (user) => ({
  type: GET_USER,
  user,
});

const getUser = () => async (dispatch) => {
  const res = await axios.get('/api/users/get-user');
  dispatch(_getUser(res.data));
};
export const _findUser = (foundUser) => ({
  type: FIND_USER,
  foundUser,
});

const findUser = (id) => async (dispatch) => {
  const res = await axios.get(`/api/users/${id}`);
  console.log(res.data)
  dispatch(_findUser(res.data));
};

export const _getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

const getAllUsers = () => async (dispatch) => {
  const res = await axios.get('/api/users');
  dispatch(_getAllUsers(res.data));
};

export const _loginUser = (user) => ({
  type: LOGIN_USER,
  user,
});

const loginUser = (loginCreds) => async (dispatch) => {
  const res = await axios.post('/api/login', loginCreds);
  dispatch(_loginUser(res.data));
};

export const _signUp = (user) => ({
  type: SIGN_UP,
  user,
});

const signUp = (infoObject) => async (dispatch) => {
  const res = await axios.post('/api/users/create', infoObject);
  dispatch(_signUp(res.data));
};

export const _logoutUser = (user) => {
  return {
      type: LOGOUT_USER,
      user
  }
}

const logoutUser = () => {
  return async(dispatch) => {
     const res= await axios.post('/api/logout')
     console.log(res.data);
     
      dispatch(_logoutUser(res.data))
  }
}

export const _followFrined = (user) => ({
  type: FOLLOW_USER,
  user,
});

const followFrined = (id,arr) => async (dispatch) => {
  const res = await axios.put('/api/users/follow/frined', {id,arr});
  dispatch(_followFrined(res.data));
};


  function _updateUser(updatedUser) {
    return {
      type: UPDATE_USER,
      updatedUser,
    };
  }
  
  export function updateUser(userId, changeObject) {
    console.log('updated user being called');
    return async (dispatch) => await axios
      .put(`/api/users/${userId}`, changeObject)
      .then((res) => {
        console.log('axios update response: ', res.data[1][0]);
        dispatch(_updateUser(res.data[1][0]));
      })
      .catch((e) => console.log(e));
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: return { ...state, user: action.user };
    case LOGOUT_USER: return { ...state, user: action.user };
    case LOGIN_USER: return { ...state, user: action.user };
    case GET_ALL_USERS: return { ...state, users: action.users };
    case SIGN_UP: return { ...state, user: action.user };
    case FIND_USER: return { ...state, foundUser: action.foundUser };
    case FOLLOW_USER: return { ...state, user: action.user };

    default: return state;
  }
}

export {
  getUser, signUp, logoutUser, loginUser, getAllUsers, findUser, followFrined
};