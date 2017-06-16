//	ychat App by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

var socket = require('socket.io-client')('http://localhost:3000');

var request = require('superagent');

function getloggedinuser() {
	request.
	get('/currentusername')
  .end(function(err, res){
    console.log("res.text:")
		console.log(res.text);
		return res.text;
  });
}

function SetloggedinuserF() {
		var outer;
		request.
		get('/currentusername')
		.end(function(err, res){
			outer = res.text;

		});
	}

const thisuser = getloggedinuser();

console.log(socket);
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'chat_data' });
  });

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
          // let el = "<div className='chat_item'>" + msg.sender + ": " + msg.msg + "</div>";
					// var p = document.createElement("p");
					var newDiv = document.createElement("div");
					let chatContent = msg.sender + ": " + msg.msg;
					var newContent = document.createTextNode(chatContent); 
					newDiv.appendChild(newContent); //add the text node to the newly created div. 
					var xy = document.getElementById('chats');
					var aChild = xy.appendChild(newDiv);
					//   $('#messages').append($('<li>').text(msg.msg));
          // tColumn.msgs.push(msg);
        });

		console.log("params: " + params);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
  	console.log('e', e.target.vaule);
  }

	getloggedinuserM() {
		var outer;
		request.
		get('/currentusername')
		.end(function(err, res){
			outer = res.text;
		});
			console.log("method res.text exported:")
			console.log(outer);
			return outer;
	}
	
	handleClick() {
		var elements = document.querySelectorAll('input');
		let chatContent = elements[0].value;
		console.log(chatContent);
		// let el = "<div className='chat_item'>" + chatContent + "</div>";
		// var p = document.createElement("p");
		// var newDiv = document.createElement("div"); 
		// var newContent = document.createTextNode(chatContent); 
  	// newDiv.appendChild(newContent); //add the text node to the newly created div. 
		// var xy = document.getElementById('chats');
		// var aChild = xy.appendChild(newDiv);
		// var zx = document.getElementById('chat_input');
		// var clearInput = zx.value = '';

		var userNameSpanCurrentID  = document.getElementById('showusername');
		var userNameText = userNameSpanCurrentID.textContent;

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
	state = { theuser: thisuser };

	constructor() {
		super();
	}

  componentDidMount() {   
		console.log('about to set socket state'); 
		//	import io from 'socket.io-client'
		
		console.log(socket);
    // socket.on(`server:event`, data => {
		// 	console.log('running socket server event');
    //   this.setState({ data })
    // })

  }

  sendMessage = message => {
    socket.emit(`client:sendMessage`, message)
  }

  render() {
		var thisuser;
		request.
			get('/currentusername')
			.end(function(err, res){
				thisuser = res.text;
				console.log("thisuser")
				console.log(thisuser);
		});
		console.log('username in render function: ');
		console.log(this.state.theuser);
			if ((params !== 'undefined') && (params !== undefined)) {
				return (
				<div className="App">
					<MyInput loggeduser={this.state.theuser} />
				</div>
			);
		}
		else {
			return(<div>not logged in</div>);
		}
  }
}

export default App;
