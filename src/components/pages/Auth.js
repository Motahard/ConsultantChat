import React, { Component } from 'react';
import { db } from '../database/Firebase';
import uuid from 'uuid';
import ChatUser from '../pages/ChatUser';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      id: '',
      onAuth: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAuthSubmit = e => {
    e.preventDefault();
    const idUser = uuid.v4();
    db.collection('users')
      .doc(idUser)
      .set({
        id: idUser,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      });
    let data = {
      msg: 'Введите первое сообщение!',
      created: Date.now(),
      idMsg: uuid.v4()
    };

    db.collection('messages')
      .doc(idUser)
      .collection('msg')
      .add(data);

    this.setState({
      firstName: '',
      lastName: '',
      id: idUser,
      onAuth: true
    });
  };

  render() {
    const ui =
      this.state.onAuth === false ? (
        <div className='row'>
          <div className='col s12 m6'>
            <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <span className='card-title'>Войти в чат</span>
                <div className='row'>
                  <form className='col s12' onSubmit={this.onAuthSubmit}>
                    <div className='row'>
                      <div className='input-field col s6'>
                        <input
                          placeholder='Имя'
                          id='first_name'
                          name='firstName'
                          type='text'
                          className='validate text-white'
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className='input-field col s6'>
                        <input
                          id='last_name'
                          type='text'
                          className='validate text-white'
                          name='lastName'
                          placeholder='Фамилия'
                          value={this.state.lastName}
                          onChange={this.handleChange}
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
      ) : (
        <ChatUser idUser={this.state.id} />
      );
    return ui;
  }
}

export default Auth;
