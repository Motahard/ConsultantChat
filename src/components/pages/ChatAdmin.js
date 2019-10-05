import React, { Fragment, useEffect, useContext } from 'react';
import ChatContext from '../context/chats/chatContext';
import UserChats from '../chats/UserChats';
import Loading from '../layout/Loading';
import UserMessages from '../chats/UserMessages';

import { db } from '../database/Firebase';

const ChatAdmin = props => {
  const chatContext = useContext(ChatContext);
  const { userChats, addUserChat, removeUserChat } = chatContext;

  useEffect(() => {
    const unsub = db.collection('users').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const doc = change.doc.data();
        if (change.type === 'added') {
          addUserChat(doc);
        } else if (change.type === 'removed') {
          removeUserChat(doc.id);
        }
      });
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='row'>
        <div className='col s3 p-0'>
          {userChats === null ? (
            <Loading />
          ) : (
            <UserChats userChats={userChats} />
          )}
        </div>
        <div className='col s9'>
          <UserMessages />
        </div>
      </div>
    </Fragment>
  );
};

export default ChatAdmin;
