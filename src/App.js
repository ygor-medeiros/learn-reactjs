import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: 0, name: "Ygor", age: 25 },
            { id: 1, name: "John", age: 26 },
            { id: 2, name: "Max", age: 28 },
            { id: 3, name: "Lisa", age: 22 }
        ],
        showPersons: false
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];

        persons[personIndex] = person;
        
        this.setState({ persons: persons });
    }

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }
 
    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;

        this.setState({ showPersons: !doesShow });
    }

    render() {

        let persons = null;
        let btnClass = '';

        if (this.state.showPersons) {

            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person 
                                    name = {person.name}
                                    age = {person.age}
                                    click = {() => this.deletePersonHandler(index)}
                                    key = {person.id}
                                    changed = {(event) => this.nameChangedHandler(event, person.id)}
                                />
                    })}
                </div>
            );

            btnClass = classes.Red;
        }

        const assignedClasses = [];

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }

        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }

        return (
            <div className={classes.App}>
                <h1>Hello ReactJs</h1>
                <p className={assignedClasses.join(' ')}>Hi, I'm a React App</p>
                <button className={btnClass} onClick={this.togglePersonsHandler}>Toggle Persons</button>
                {persons}
            </div>
        );
        //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello ReactJs'));
    }
}

export default App;
