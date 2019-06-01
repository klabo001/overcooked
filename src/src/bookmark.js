import React from 'react';

class Bookmark extends React.Component {

  constructor(props){

    super(props);
    this.state ={
      bookmark: 124,
      updated: false
    }
    this.updateBookmark = this.updateBookmark.bind(this);
  }

  updateBookmark() {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          bookmark: prevState.bookmark + 1,
          updated: true
        };
      });
    } else {

      this.setState((prevState, props) => {
        return {
          bookmark: prevState.bookmark - 1,
          updated: false
        };
      });
    }


  }

  render(){

    return(
      <div>
        <p onClick={this.updateBookmark}>Bookmark</p>
        <p>{this.state.bookmark}</p>
      </div>
    );

  }


}

export default Bookmark;
