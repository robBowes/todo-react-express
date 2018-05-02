import React, { Component } from 'react';

class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {items: props.items, itemInput: props.itemInput}
        this.listNumber = props.listNumber;
        // console.log(props)
    }
    // componentWillReceiveProps = (props) => {
    //     this.setState({itemInput: props.itemInput})
    // }
    componentDidMount= () => {
        // This is called after the first render
        // We don't put fetches in the constructor. Why? Ask Jordan :)
        // console.log(this)
        fetch('/items', {
            method: 'POST', // GET is the default method, so this is optional
            body: JSON.stringify({listNumber: this.listNumber})
        })
        .then(response => response.text()) // get the HTTP response body
        .then(responseBody => {
            let parsedResponse = JSON.parse(responseBody);
            this.setState({ items: parsedResponse })
        })
    }
    handleInputChange = event => {
        let inputValue = event.target.value
        this.setState({itemInput: inputValue});
    }
    handleSubmit = event => {
        event.preventDefault();
        let bod = JSON.stringify({itemInput: this.state.itemInput, listNumber: this.listNumber});
        fetch('/addItem', {
            method: 'POST', // GET is the default method, so this is optional
            body: bod
        })
        .then(response => response.json()) // get the HTTP response body
        .then(responseBody => {
            // The state only gets updated when the response is received
            this.setState({ items: responseBody[this.listNumber], itemInput: '' })
        })
    }
    reverseList = event => {
        event.preventDefault();
        fetch('/reverseList', {method:'PUT', body: JSON.stringify(this.listNumber)}).then(res=>res.json()).then((res)=>{
            this.setState({items:res.items})      
        })
    }
    deleteList = event => {
        event.preventDefault();
        fetch('/deleteList', {method:'DELETE', body: JSON.stringify(this.listNumber)}).then(res=>res.json()).then((res)=>{
            this.setState({items:res.items})      
        })
    }
    render =() => {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.itemInput} onChange={this.handleInputChange}></input>
            <input type="button" value="Reverse List" onClick={this.reverseList}/>
            <input type="button" value="Delete List" onClick={this.deleteList}/>
            <input type="submit"></input>
            </form>
            <ul>
            {this.state.items.map(item => (<li> {item} </li>))}
            </ul>
            </div>
        );
    }
}

export default ToDoList;