//	ychat App by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

var socket = require("socket.io-client")("http://localhost:3000");

var request = require("superagent");

console.log(socket);

socket.on("chat message", function(msg) {
  console.log("message received");
  console.log(msg);
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var params = getParameterByName("username");

class ChatApp extends Component {
  render() {
    return <section id="chats" className="chat_data" />;
  }
}

class MyInput extends Component {
  constructor(props) {
    super(props);

    socket.on("chat message", function(msg) {
      console.log(
        "receiving chat message: " +
          msg.msg +
          " " +
          msg.sender +
          " " +
          msg.sentTime
      );
      var newDiv = document.createElement("div");
      let processedTime = msg.sentTime / 60 / 60 / 24 / 1000 / 365 + 1970;
      let chatContent = msg.sender + ": " + msg.msg;
      let chatMeta = "sent " + processedTime + " ";
      var newContent = document.createTextNode(chatContent);
      newDiv.appendChild(newContent); //add the text node to the newly created div.
      var xy = document.getElementById("chats");
      var aChild = xy.appendChild(newDiv);
      var newSec = document.createElement("aside");
      var newMetaContent = document.createTextNode(chatMeta);
      newSec.appendChild(newMetaContent); //add the text node to the newly created div.
      var xy2 = document.getElementById("chats");
      var aChild2 = xy.appendChild(newSec);
    });

    console.log("params: " + params);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("e", e.target.vaule);
  }

  handleClick() {
    let elements1 = document.getElementById("chat_input");
    let chatContent = elements1.value;
    console.log(chatContent);

    var userNameSpanCurrentID = document.getElementById("showusername");
    var userNameText = userNameSpanCurrentID.textContent;

    let setToNothing = (document.getElementById("chat_input").value = "");
    socket.emit("chat message", {
      msg: chatContent,
      sender: userNameText,
      sentTime: Date.now()
    });
  }

  handleKeyPress = event => {
    if (event.key == "Enter") {
      this.handleClick();
    }
  };

  componentDidMount() {
    console.log("MyInput component did mount");
    var userNameSpan = document.getElementById("showusername");
    request.get("/currentusername").end(function(err, res) {
      var putInUserNameLater = (userNameSpan.textContent = res.text);
      console.log("userNameSpan text updated to " + res.text);
    });
  }

  render() {
    return (
      <div id="innerContainer">
        <div id="title_area">
          <h1 className="nasty_chat">Y CHAT</h1>
          <h5 id="tagline">
            from <a href="http://danmckeown.info">Dan McKeown</a>
          </h5>
          <h6 id="usernameheader">
            <span id="showusernamelabel" className="userinfo">
              user:
            </span>{" "}
            <span id="showusername" className="userinfo" />
          </h6>
          <p>
            <span id="cantclick">
              <a
                href="#"
                onClick={function() {
                  alert("ok the cursor should be free");
                }}
              >
                just type!
              </a>
            </span>
          </p>
          <p>
            <span id="ychatlink">
              <a href="http://ychat.pacificio.com">ychat on pacificio</a>
            </span>
          </p>
        </div>
        <main className="chat_box">
          <chatContent />
          <ChatApp />
          <div className="user_input" id="root0">
            <span>
              <input
                type="text"
                id="chat_input"
                className="user_chat"
                onKeyUp={this.handleKeyPress}
              />
            </span>
            <button onClick={this.handleClick} className="user_button">
              send
            </button>
          </div>
        </main>
      </div>
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
    socket.emit(`client:sendMessage`, message);
  };

  render() {
    return (
      <div className="App">
        <MyInput />
      </div>
    );
  }
}

export default App;
