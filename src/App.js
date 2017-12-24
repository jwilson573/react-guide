import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {

  //State only available in components that extends Component, not just a simple function component
  state = {
    persons: [
      { id: 1, name: 'Jon', age: 28 },
      { id: 2, name: 'Brad', age: 29 },
      { id: 3, name: 'Wilson', age: 30 }
    ],
    otherState: "some other value",
    showPersons: false
  }
  // switchNameHandler = (newName) => {
  //   // console.log("Was Clicked");
  //   // DON'T DO THIS: this.state.person[0].name = "Jonathon"
  //   this.setState({persons: [
  //       { name: newName, age: 28 },
  //       { name: 'Bradley', age: 400 },
  //       { name: 'Wilson', age: 32 }
  //     ] 
  //   })
  // }



  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    // Alternative to the above code
    // const persons = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({persons: persons})
  }
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons: !doesShow})
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice() <- alternative to the spread operator ...
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      marginBottom: '20px',
      cursor: 'pointer',
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, idx) => {
            return(
              <Person 
                name={person.name} 
                age={person.age} click={() => this.deletePersonHandler(idx)} 
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
            )
          })}          
          {/* Use props.children to access JSX between custom elements */}
        </div>
      );
      style.backgroundColor = 'red';
    }
    let classes = [];
    let warning = null;

    if(this.state.persons.length <= 2){
      classes.push('red');
      warning = "Running out of people to remove."
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
      warning = "Running out of people to remove.";
    } 
    if (this.state.persons.length === 0){
      warning = "No more people to remove.";
    }

    return (
     
        <div className="App">
          <h1>Hello, I'm a React App.</h1>
          <p className={classes.join(' ')}>{warning}</p>
          <button
            style={style}
            onClick={this.togglePersonHandler}> Show People
          </button>
          {persons}
          
        </div>
     
    );

    //createElement takes at least 3 arguments, can have infinite number. Can use nested React.createElement. This is what JSX is compiled into
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null, "Hello, I'm a React App."));
  }
}

export default App;
