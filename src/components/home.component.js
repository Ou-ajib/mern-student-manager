import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './navbar.component';
import Students from './students.component';
import Professors from './professors.component';
import Majors from './marjors.component';
import Wellcome from './wellcome.component';
import EditStudent from './edit.student.component';
import AddStudent from './add.student.component';
import AddProfessor from './add.professor.component';
import EditProfessor from './edit.professor.component';

export default class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
        }
    }
    render(){
        return (
            <Router>
                <Navbar signOut={this.props.signOut}/>
                <br/>
                <div className="container">
                    <Route path="/" exact component={() => <Wellcome user={this.state.user} onUpdateUser={(user) => this.setState({user: user})} />} />
                    <Route path="/students" component={Students} />
                    <Route path="/professors" component={Professors} />
                    <Route path="/majors" component={Majors} />
                    <Route path="/edit/student/:id" component={EditStudent} />
                    <Route path="/add/student" component={AddStudent} />
                    <Route path="/edit/professor/:id" component={EditProfessor} />
                    <Route path="/add/professor" component={AddProfessor} />
                </div>
            </Router>
        );
    }
}