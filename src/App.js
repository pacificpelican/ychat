//	ychat App by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

var socket = require('socket.io-client')('http://localhost:3000');

var request = require('superagent');

// function getloggedinuser() {
// 	request.
// 	get('/currentusername')
//   .end(function(err, res){
//     console.log("res.text:")
// 		console.log(res.text);
// 		return res.text;
//   });
// }

// const thisuser = getloggedinuser();

console.log(socket);

	socket.on('chat message', function(msg){
      console.log('message received');
			console.log(msg);
    });

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
			
		</section>
    );
  }
}

class MyInput extends Component {
	constructor(props) {
  	super(props);

		socket.on('chat message', function(msg){
          console.log("receiving chat message: " + msg.msg + " " + msg.sender + " " + msg.sentTime);
					var newDiv = document.createElement("div");
					let chatContent = msg.sender + ": " + msg.msg;
					var newContent = document.createTextNode(chatContent); 
					newDiv.appendChild(newContent); //add the text node to the newly created div. 
					var xy = document.getElementById('chats');
					var aChild = xy.appendChild(newDiv);
        });

		console.log("params: " + params);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
  	console.log('e', e.target.vaule);
  }

	// getloggedinuserM() {
	// 	var outer;
	// 	request.
	// 	get('/currentusername')
	// 	.end(function(err, res){
	// 		outer = res.text;
	// 	});
	// 		console.log("method res.text exported:")
	// 		console.log(outer);
	// 		return outer;
	// }
	
	handleClick() {
	//	var elements = document.querySelectorAll('input');
	//	let chatContent = elements[0].value;

		let elements1 = document.getElementById("chat_input");
		let chatContent = elements1.value;
		console.log(chatContent);

		var userNameSpanCurrentID  = document.getElementById('showusername');
		var userNameText = userNameSpanCurrentID.textContent;

		let setToNothing = document.getElementById("chat_input").value = "";
    socket.emit('chat message', {msg: chatContent, sender: userNameText, sentTime: Date.now()});
	}	

	componentDidMount() {   
		console.log('MyInput component did mount');
		var userNameSpan  = document.getElementById('showusername');
		request.
		get('/currentusername')
		.end(function(err, res){
			var putInUserNameLater = userNameSpan.textContent = res.text;
			console.log('userNameSpan text updated to ' + res.text);
		});
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
				<h6 id="usernameheader">
					<span id="showusernamelabel" class="userinfo">user:</span> <span id="showusername" class="userinfo"></span>
				</h6>
				<p>
					<span id="cantclick"><a href="#" onClick={function() { alert('ok should be fixed')}}>can't type?</a></span>
				</p>
			</div>
			<main className="chat_box">
			<chatContent /><ChatApp />
				<div className="user_input" id="root0">
					<span><input type="text" id="chat_input" className="user_chat" /></span>
					<button onClick={this.handleClick} className="user_button">
						send
					</button>
				</div>
			</main></div>
		);
  }
}

class App extends Component {
	constructor() {
		super();
	}

  componentDidMount() {   
		console.log(socket);
		document.getElementById("chat_input").focus();
  }

  sendMessage = message => {
    socket.emit(`client:sendMessage`, message)
  }

  render() {
		// var thisuser;
		// request.
		// 	get('/currentusername')
		// 	.end(function(err, res){
		// 		thisuser = res.text;
		// 		console.log("thisuser")
		// 		console.log(thisuser);
		// });
		// 	if ((params !== 'undefined') && (params !== undefined)) {
				return (
				<div className="App">
					<MyInput />
				</div>
			);
		// }
		// else {
		// 	return(<div>not logged in</div>);
		// }
  }
}

export default App;
