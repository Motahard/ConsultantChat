import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { db } from '../database/Firebase';
import Auth from './Auth';

const ChatUser = ({ idUser }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [text, setText] = useState('');
  const [docToDelete, setDocToDelete] = useState('');

  useEffect(() => {
    const unsub = db
      .collection('messages')
      .doc(idUser)
      .collection('msg')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        setChatHistory(data.sort((a, b) => a.created - b.created));
      });
    //eslint-disable-next-line
  }, []);

  const handleChange = e => {
    setText(e.target.value);
  };

  const onSubmitMsg = () => {
    if (text.length !== 0) {
      const data = {
        msg: text,
        created: Date.now(),
        idMsg: uuid.v4()
      };

      db.collection('messages')
        .doc(idUser)
        .collection('msg')
        .add(data);

      setText('');
    }
  };

  const onLeaveChat = () => {
    db.collection('users')
      .where('id', '==', idUser)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => setDocToDelete(doc.id));
      });
    if (docToDelete !== '') {
      db.collection('users')
        .doc(docToDelete)
        .delete();
      setChatHistory('');
    }
  };

  if (chatHistory.length !== 0) {
    return (
      <div className='z-depth-1 user-msg container'>
        <ul className='collection'>
          {chatHistory !== null &&
            chatHistory.map(currentMessage => (
              <li key={currentMessage.idMsg} className='collection-item'>
                {currentMessage.msg}
              </li>
            ))}
        </ul>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              className='validate text-dark'
              name='inpMsg'
              placeholder='Отправить сообщение'
              value={text}
              onChange={handleChange}
            />
            <button
              className='waves-effect waves-light btn'
              onClick={onSubmitMsg}
            >
              Отправить
            </button>
            <div>
              <button className='btn my-5 bg-red' onClick={onLeaveChat}>
                Покинуть чат
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Auth />;
  }
};

export default ChatUser;
