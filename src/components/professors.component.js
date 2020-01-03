import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Exercise = props => (
  <tr>
    <td>{props.prof.name}</td>
    <td>{props.subject}</td>
    <td>{props.prof.email}</td>
    <td>{props.prof.phone}</td>
    <td>{props.prof.birthday.substring(0,10)}</td>
    <td>
      <Link to={"/edit/professor/"+props.prof._id} style={{marginRight: 10}}>
        <button type="button" className="btn btn-dark btn-sl">
        Edit
        </button>
      </Link> 
        | 
      <button type="button" style={{marginLeft: 10}} className="btn btn-dark btn-sl" onClick={() => { props.deleteProf(props.prof._id) }}>
        Delete
        </button>
    </td>
  </tr>
);

export default class Professors extends Component {
  constructor(props) {
    super(props);

    this.deleteProf = this.deleteProf.bind(this)

    this.state = {
      professors: [],
      subjects: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/professors').then(response => {
      this.setState({professors: response.data});
    }).catch(err => console.log(err));

    axios.get('http://localhost:5000/subjects').then(response => {
      this.setState({subjects: response.data,});
    }).catch(err => console.log(err));
  }

  deleteProf(id) {
    axios.delete('http://localhost:5000/professors/'+id).then(response => { console.log(response.data)});
    this.setState({
      professors: this.state.professors.filter(el => el._id !== id),
    });
  }

  professorsList() {
    return this.state.professors.map(prof => {
      return <Exercise prof={prof} deleteProf={this.deleteProf} key={prof._id} subject={this.state.subjects.filter(subject => prof._id === subject.professor).map(subject => subject.name)}/>;
    });
  }

  render() {
    return (
      <div className='text-left'>
        <Link to='/add/professor'>
        <button type="button" className="btn btn-dark btn-lg float-right">
        Add New Professor or Subject
        </button>
        </Link>
        <h1>EST Essouira Professors & Subjects:</h1>
        <hr/>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.professorsList() }
          </tbody>
        </table>
      </div>
    )
  }
}