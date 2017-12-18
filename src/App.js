import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {

  //State only available in components that extends Component, not just a simple function component
  state = {
    persons: [
      { name: 'Jon', age: 28 },
      { name: 'Brad', age: 29 },
      { name: 'Wilson', age: 30 }
    ],
    otherState: "some other value"
  }
  switchNameHandler = (newName) => {
    // console.log("Was Clicked");
    // DON'T DO THIS: this.state.person[0].name = "Jonathon"
    this.setState({persons: [
        { name: newName, age: 28 },
        { name: 'Bradley', age: 400 },
        { name: 'Wilson', age: 32 }
      ] 
    })
  }

  nameChangedHandler = (event) => {
    this.setState({persons: [
      { name: 'Jon', age: 28 },
      { name: event.target.value, age: 400 },
      { name: 'Wilson', age: 32 }
    ] 
  })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    return (
      <div className="App">
        <h1>Hello, I'm a React App.</h1>
        <button
          style={style} 
          onClick={this.switchNameHandler.bind(this, 'Jonathon!!')}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        {/* Use props.children to access JSX between custom elements */}
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Jon !!')}
          changed={this.nameChangedHandler}> My Hobbies: Drumming 
        </Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}/>
      </div>
    );

    //createElement takes at least 3 arguments, can have infinite number. Can use nested React.createElement. This is what JSX is compiled into
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null, "Hello, I'm a React App."));
  }
}

export default App;
