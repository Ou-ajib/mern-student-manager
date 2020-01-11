import React, { Component } from 'react'
import './App.css';

import Login from './components/login.component'
import Home from './components/home.component'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      // user: null,
      user: {
        username: 'Aissam',
        email: 'ouajibaissam@gmail.com',
        password: 'Aissam123',
      },
    }
  }
  
  render() {
    // const app = this.state.loggedIn ? 
    //   <Home signOut={() => this.setState({loggedIn: false, user: null})} user={this.state.user}/> : 
    //   <Login signIn={(user) => this.setState({loggedIn: true, user: user})}/>;

    const app = <Home user={this.state.user}/>
    return (
      <div className="App">
        {app}
      </div>
    );
  }
}

export default App