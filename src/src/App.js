import React from 'react';
import './App.css';
import firebase from './firebase.js';
var email;
var userpassword;

function App() {
  return (
    <div className="App">
      <header className="App-header">
	    <h1>
			<p> Login </p>
		</h1>
		<h2>
			<p>Email: </p>
			<input type="text" name="email" onChange={handleChangeEmail}/><br/>
			<p>Password: </p>
			<input type="password" name="userpassword" onChange={handleChangePass}/><br/>
			<input type="submit" value="Submit" onClick={login}/>
		</h2>
	  </header>
    </div>
  );
}
function handleChangeEmail(event){
	email = event.target.value;
}
function handleChangePass(event){
	userpassword = event.target.value;
}
function login(){
	console.log(email);
	firebase.auth().signInWithEmailAndPassword(email, userpassword);
	
}
function register(){
	//firebase.registerAccount("test","test");
}
export default App;
