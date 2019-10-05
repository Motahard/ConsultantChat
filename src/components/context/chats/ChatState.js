import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import { db } from '../../database/Firebase';
import {
  SET_CURRENT,
  SET_MESSAGES,
  ADD_USERCHAT,
  REMOVE_USERCHAT
} from '../types';

const ChatState = props => {
  const initialState = {
    userChats: [],
    currentChat: null,
    currentMessages: null
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  const setCurrent = currentID => {
    dispatch({
      type: SET_CURRENT,
      payload: currentID
    });
  };

  const getUserMsg = id => {
    db.collection('messages')
      .doc(id)
      .collection('msg')
      .get()
      .then(doc => {
        const data = doc.docs.map(docItem => docItem.data());
        if (data.length !== 0) {
          dispatch({
            type: SET_MESSAGES,
            payload: data
          });
        } else {
          dispatch({
            type: SET_MESSAGES,
            payload: []
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addUserChat = user => {
    dispatch({
      type: ADD_USERCHAT,
      payload: user
    });
  };

  const removeUserChat = id => {
    dispatch({
      type: REMOVE_USERCHAT,
      payload: id
    });
  };

  return (
    <ChatContext.Provider
      value={{
        userChats: state.userChats,
        currentChat: state.currentChat,
        currentMessages: state.currentMessages,
        setCurrent,
        getUserMsg,
        addUserChat,
        removeUserChat
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
