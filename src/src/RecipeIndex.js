import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import firebase from './firebase.js';
import UploadRecipe from './RecipeUpload.tsx';
import updateApp from './index.js';
import Bookmark from './bookmark.js';
var listings = [];

function RecipeIndex() {
	var ref = firebase.database().ref("recipes");
	ref.orderByValue().on("value", function(snapshot) {
	  snapshot.forEach(function(data) {
			var ing = data.val().ingredients;
		  var meas = data.val().measurements;
		  var stps = data.val().steps;
		  var i;
			var ingList = [];
			var stepsList = [];

		  for (i = 0; i < ing.length; i++){
			  //listing = listing + "<li>" + ing[i] + ", " + meas[i] + "</li>";
				ingList.push(<li>{ing[i]}, {meas[i]}</li>);
		  }
			for (i = 0; i < stps.length; i++){
			  //listing = listing + "<li>" + stps[i] + "</li>";
				stepsList.push(<li>{stps[i]}</li>);
		  }
		  var listing =
			(
			<div>
			<Bookmark />
		  <h1>{ data.val().title }</h1>
		  <h2>{ data.val().description }</h2>
		  <h2>Recipe by: { data.val().user }</h2>
		  <ul>
			{ingList}
		  </ul>
		  <h3>Steps</h3>
			<ul>
			{stepsList}
		  </ul>
			</div>
			)
		console.log(listing);
		listings.push(listing);
	  });
	});
}
RecipeIndex();

//this is the html for the login page
class IndexPage extends React.Component {
	render(){
	return <div>{ listings }</div>
	}
}












//heres where the website is run and rendered
//setPageOnStartup();



export default IndexPage;
