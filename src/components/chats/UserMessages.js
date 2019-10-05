import React, { useContext, useState, useEffect } from 'react';
import ChatContext from '../context/chats/chatContext';
import uuid from 'uuid';
import { db } from '../database/Firebase';

const UserMessages = () => {
  const [text, setText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContext = useContext(ChatContext);
  const { currentChat } = chatContext;

  const onTextChange = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (currentChat !== null) {
      const unsub = db
        .collection('messages')
        .doc(currentChat)
        .collection('msg')
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => doc.data());
          setChatHistory(data.sort((a, b) => a.created - b.created));
        });
    }
    //eslint-disable-next-line
  }, [currentChat]);

  const onSubmitMsg = () => {
    if (text.length !== 0) {
      const data = {
        msg: text,
        created: Date.now(),
        idMsg: uuid.v4()
      };

      db.collection('messages')
        .doc(currentChat)
        .collection('msg')
        .add(data);
      setText('');
    }
  };

  if (chatHistory.length !== 0 && currentChat !== null) {
    return (
      <div className='z-depth-1 user-msg'>
        <ul className='collection'>
          {chatHistory !== null &&
            chatHistory.map(currentMessage => (
              <li key={currentMessage.idMsg} className='collection-item'>
                {currentMessage.msg}
              </li>
            ))}
        </ul>
        <div className='input-field'>
          <input
            type='text'
            className='validate text-dark'
            name='inpMsg'
            value={text}
            placeholder='Отправить сообщение'
            onChange={onTextChange}
          />
          <button
            className='waves-effect waves-light btn'
            onClick={onSubmitMsg}
          >
            Отправить
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default UserMessages;
