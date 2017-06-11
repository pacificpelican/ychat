//	ychat App by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var params = getParameterByName('username');

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
				<div className="chat_item">
				NOW IN APP FORM!!
			</div>
		</section>
    );
  }
}

class MyInput extends Component {
	constructor(props) {
  	super(props);
		console.log("params: " + params);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
  	console.log('e', e.target.vaule);
  }
	
	handleClick() {
		var elements = document.querySelectorAll('input');
		let chatContent = elements[0].value;
		console.log(chatContent);
		let el = "<div className='chat_item'>" + chatContent + "</div>";
		var p = document.createElement("p");
		var newDiv = document.createElement("div"); 
		var newContent = document.createTextNode(chatContent); 
  	newDiv.appendChild(newContent); //add the text node to the newly created div. 
		var xy = document.getElementById('chats');
		var aChild = xy.appendChild(newDiv);
		var zx = document.getElementById('chat_input');
		var clearInput = zx.value = '';
	}	
	
  render() {
  	return (
		<div id="innerContainer">
			<div id="title_area">
				<h1 class="nasty_chat">
					Y CHAT
				</h1>
				<h5 id="tagline">
					from <a href="http://danmckeown.info">Dan McKeown</a>
				</h5>
			</div>
			<main className="chat_box">
			<chatContent /><ChatApp />
				<div className="user_input" id="root0">
					<input id="chat_input" className="user_chat" />
					<button onClick={this.handleClick} className="user_button">
						send
					</button>
				</div>
			</main></div>
		);
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyInput />
      </div>
    );
  }
}

export default App;
