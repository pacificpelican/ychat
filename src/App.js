import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ChatApp extends Component {
		render() {
    return(
      <section id="chats" className="chat_data">
			<div className="chat_item">
				__HELLO WORLD___
			</div>
			<div className="chat_item">
				___chat2___
			</div>
			<div className="chat_item">
				___chat 3___
			</div>
			<div className="chat_item">
				___chat 4___ __ __
			</div>
		</section>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
                <ChatApp />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
