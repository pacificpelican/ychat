import React, { Component } from 'react';


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
  

class MyInput extends React.Component{
	constructor(props){
  	super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
  	console.log('e', e.target.vaule);
  }
	
	handleClick() {
	//	console.log('send was clicked');
		var elements = document.querySelectorAll('input');
	//	alert('not working yet');
		let chatContent = elements[0].value;
		console.log(chatContent);
		let el = "<div className='chat_item'>" + chatContent + "</div>";
//		section.chat_data.appendChild(el);
		var p = document.createElement("p");
	//	document.body.appendChild(p);
	//	document.body.section.chat_data.appendChild(el);
	//	var xy = getElementById('chats');
		// var xy = document.getElementById('chats');
		// //	elem.style.color = newColor;
		// var aChild = xy.appendChild(p);
		
		
		var newDiv = document.createElement("div"); 
		var newContent = document.createTextNode(chatContent); 
  		newDiv.appendChild(newContent); //add the text node to the newly created div. 

		  // // add the newly created element and its content into the DOM 
		  // var currentDiv = document.getElementById("div1"); 
		  // document.body.insertBefore(newDiv, currentDiv); 
		var xy = document.getElementById('chats');
  	//	elem.style.color = newColor;
		var aChild = xy.appendChild(newDiv);
		var zx = document.getElementById('chat_input');
		var clearInput = zx.value = '';
	}	
	
  render(){
  	return <div id="innerContainer">
<div id="title_area">
	<h1 class="nasty_chat">
		YOGA CHAT
	</h1>
	<h5 id="tagline">
		from <a href="http://danmckeown.info">Dan McKeown</a>
	</h5>
</div>
		
<main className="chat_box">
<chatContent /><DataDisplay0 />
	<div className="user_input" id="root0">
		<input id="chat_input" className="user_chat" />
		<button onClick={this.handleClick} className="user_button">
			send
		</button>
	</div>
</main></div>
  }
}
//	ReactDOM.render(<MyInput/>, document.getElementById('myyogachat'));

// var shape = new mojs.Shape({
// 	shape:        'circle',
// 	fill:       'orange',
// 	top:		'45%',
// 	scale:         { 0 : 0.2 },
// 	left:         '20px',
// 	duration:      1000,
// 	delay:         1000,
//  	easing:        'cubic.out',
// 	repeat:        25
// });

//	shape.play();