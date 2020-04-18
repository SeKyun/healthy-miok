// import React from 'react';
// import './App.css';
// import Routes from '../src/components/pages/Route';

// function App() {
//   return (
//     <div className="App">
//       <Routes />

//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react';

class App extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch('/users')
      .then((res) => res.json())
      .then((users) => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}> {user.username} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
