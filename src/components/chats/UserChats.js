import React, { useContext } from 'react';
import ChatContext from '../context/chats/chatContext';

const UserChats = ({ userChats }) => {
  const chatContext = useContext(ChatContext);
  const { setCurrent, getUserMsg } = chatContext;

  const chatItemOnClick = e => {
    const userKey = e.target.getAttribute('id');
    setCurrent(userKey);
    getUserMsg(userKey);
  };

  return (
    <div className='collection z-depth-1'>
      {userChats.map(userChatItem => (
        <a
          key={userChatItem.id}
          id={userChatItem.id}
          href='#!'
          className='collection-item'
          onClick={chatItemOnClick}
        >
          {userChatItem.firstName + ' ' + userChatItem.lastName}
        </a>
      ))}
    </div>
  );
};

export default UserChats;
