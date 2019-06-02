import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import firebase from './firebase.js';
import UploadRecipe from './RecipeUpload.tsx';
import updateApp from './index.js';
var listings = [];
var searchval = "";
var error = "";
var spaceregex = / +/;
var quoteregex = /"([^"]*)"/g;
var curpage;
function FoundInput(data, vals){
	var foundflag = false;
	var k;
    vals.forEach(function(temp) {
		var val = new RegExp(temp,"i");
		var title = data.val().title;
		var description = data.val().description;
		var user = data.val().user;
		if (val.test(title) == true){
			foundflag = true;
		}
		if (val.test(description) == true){
			foundflag = true;
		}
		if (val.test(user) == true){
			foundflag = true;
		}
		var ing = data.val().ingredients;
		var i;
		for (i = 0; i < ing.length; i++){
		  if (val.test(ing[i]) == true){
			  foundflag = true;
		  }
		}
	});
	return foundflag;
}
function handleReturnToSearchInput(){
	error = "";
	searchval = "";
	curpage = <InputSearchPage/>;
	updateApp();
}
function RecipeSearch() {
	listings.length = 0;
	var quotes = searchval.match(quoteregex); // gets every search term between quotes
	var searchValues = [];
	if (quotes !== null){
		for (var quotein = 0; quotein < quotes.length; quotein++){
			quotes[quotein] = quotes[quotein].replace(/"/g,""); // removes the quotes from the strings
		}
	}
	searchval = searchval.replace(quoteregex,""); // removes the quotes from the search string
	console.log(searchval);
	if (searchval !== ""){
		searchValues = searchval.split(spaceregex); // gets any terms separated by spaces
	}
	if (quotes !== null){
		searchValues = searchValues.concat(quotes);
	}
	console.log(searchValues);
	var ref = firebase.database().ref("recipes");
	ref.orderByValue().on("value", function(snapshot) {
	  snapshot.forEach(function(data) {
		  var testflag = FoundInput(data, searchValues);
		  if (testflag == false){
		  }
		  else{
			  var listing = "<div>";
			  listing = listing + "<h1>" + data.val().title + "</h1>";
			  listing = listing + "<h2>" + data.val().description + "</h2>";
			  listing = listing + "<h2>Recipe by: " + data.val().user + "</h2>";
			  var ing = data.val().ingredients;
			  var meas = data.val().measurements;
			  var stps = data.val().steps;
			  var i;
			  listing = listing + "<ul>"
			  for (i = 0; i < ing.length; i++){
				  listing = listing + "<li>" + ing[i] + ", " + meas[i] + "</li>";
			  }
			  listing = listing + "</ul>"
			  listing = listing + "<h3>Steps</h4>";
			  listing = listing + "<ul>"
			  for (i = 0; i < stps.length; i++){
				  listing = listing + "<li>" + stps[i] + "</li>";
			  }
			  listing = listing + "</ul>"
			listing = listing + "</div>";
			listings.push(listing);
		  }
	  });
	});
	if (listings.length == 0){
		var listing = "<div><h1><p>No results found</p></h1></div>";
		listings.push(listing);
	}
}


//this is the html for the login page
class SearchPage extends React.Component {
	render(){
	var page;
	page =
	<div>
	<div>
		<h4>
			<p>Return to search?.</p>
			<input type="submit" value="search" onClick={handleReturnToSearchInput}/>
		</h4>
	</div>
	<div dangerouslySetInnerHTML={{__html: listings}}>
	</div>
	</div>
	return page;
	}
}
function StartSearch(){
	RecipeSearch();
	curpage = <SearchPage/>;
	updateApp();
}
function handleSearchEvent(event){
		if (searchval == ""){
			error = "Please input a value for the search";
		curpage = <InputSearchPage/>;
		 updateApp();
		 }
		else{StartSearch();}
}
function handleChangeSearch(event){
	searchval = event.target.value;
}
class InputSearchPage extends React.Component {
	
	render(){
	var page;
	page =
	<div>
		<h1>
			<p>Please input your search terms:</p>
		</h1>
		<h2>
			<input type="text" name="term" onChange={handleChangeSearch}/><br/>
		</h2>
		<h3>
			<p>{error}</p>
		</h3>
		<h4>
			<p>Search terms are separated by spaces. Any recipe containing any term will be returned.</p>
			<p>Surround a search term in quotes to search for an exact term.</p>
			<p>Example: Searching <i>peanut butter</i> will return recipes using peanuts or butter.</p>
			<p>Searching <i>"peanut butter"</i> will return recipes using peanut butter.</p>
			<p>The term is searched for in the recipe title, description, uploader's username, and ingredients.</p>
			<input type="submit" value="search" onClick={handleSearchEvent}/>
		</h4>
	</div>
	return page;
	}
}
curpage = <InputSearchPage/>;
function Search(){
	return curpage;
}









export default Search;