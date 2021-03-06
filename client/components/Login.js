/* eslint-disable max-len, arrow-body-style, no-underscore-dangle */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { };
  }

  // componentWillMount() {
  //   axios.get('/api/pokemon')
  //   .then((rsp) => {
  //     this.setState({ pokemon: rsp.data.pokemon });
  //   });
  // }

  create(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    axios.post('/api/login', { email, password })
    .then((req) => {
      // this.setState({ pokemon: [...this.state.pokemon, rsp.data.pokemon] });
      console.log('rsp.body', req.body);
      localStorage.clear();
      localStorage.setItem('token', req.data.token);
      browserHistory.push('/pokemon');
    })
    .catch(() => {
      // notify user login failed
    });
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input ref="email" type="text" className="form-control" id="email" />
              </div>

              <div className="form-group">
                <label htmlFor="url">Password</label>
                <input ref="password" type="password" className="form-control" id="password" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Login</button>
            </form>
          </div>
          <div className="col-xs-9">
          </div>
        </div>
      </div>
    );
  }
}
