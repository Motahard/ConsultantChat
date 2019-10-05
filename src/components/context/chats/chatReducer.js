import {
  SET_CURRENT,
  SET_MESSAGES,
  ADD_MESSAGE,
  ADD_USERCHAT,
  REMOVE_USERCHAT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        currentChat: action.payload
      };

    case SET_MESSAGES:
      return {
        ...state,
        currentMessages: action.payload
      };
    case ADD_MESSAGE:
      return {
        ...state,
        currentMessages: [...state.currentMessages, action.payload]
      };
    case ADD_USERCHAT:
      return {
        ...state,
        userChats: [...state.userChats, action.payload]
      };
    case REMOVE_USERCHAT:
      return {
        ...state,
        userChats: state.userChats.filter(
          userchat => userchat.id !== action.payload
        )
      };
    default:
      return state;
  }
};
