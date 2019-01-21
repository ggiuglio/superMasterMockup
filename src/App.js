import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main/main';
import ProjectData from './data-mock-up/data-mock-up2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main projectData={ProjectData}></Main>
      </div>
    );
  }
}

export default App;
