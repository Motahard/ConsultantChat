import React, { useState, useEffect } from 'react';
import { db } from '../database/Firebase';
import jwt from 'jsonwebtoken';
import ChatAdmin from './ChatAdmin';

const LoginAdmin = () => {
  const [dbData, setDbData] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    db.collection('admin')
      .doc('admin')
      .get()
      .then(doc => setDbData(doc.data().token));
  }, []);

  const onLoginEvent = e => {
    e.preventDefault();
    const tokenAuthDb = jwt.verify(dbData, 'admin');

    if (tokenAuthDb.login === login && tokenAuthDb.password === password) {
      setAuth(true);
    }
  };

  const onLoginChange = e => {
    setLogin(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  if (isAuth) {
    return <ChatAdmin />;
  } else {
    return (
      <div className='row'>
        <div className='col s12 m6'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <span className='card-title'>Войти</span>
              <div className='row'>
                <form className='col s12' onSubmit={onLoginEvent}>
                  <div className='row'>
                    <div className='input-field col s6'>
                      <input
                        placeholder='Логин'
                        type='text'
                        name='login'
                        className='validate text-white'
                        value={login}
                        onChange={onLoginChange}
                      />
                    </div>
                    <div className='input-field col s6'>
                      <input
                        type='password'
                        className='validate text-white'
                        placeholder='Пароль'
                        name='password'
                        value={password}
                        onChange={onPasswordChange}
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type='submit'
                      value='Войти'
                      className='btn submit-input'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginAdmin;
