import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      items: [],
      itemInput: ''
    }
    this.nLists =3; 
  }
  
  
  render() {
    return (
      <div>
        {Array(this.nLists).fill().map((el, i)=>
        <ToDoList 
          deleteList={this.deleteList} 
          reverseList={this.reverseList} 
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          itemInput={this.state.itemInput}
          items={this.state.items}
          key={i}
          listNumber={i}
        />)}
      </div>
    );
  }
}

export default App;
