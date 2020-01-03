import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class Majors extends Component {
  constructor(props){
    super(props);

    this.state = {
      majors: [],
      subjects: [],
      profs: [],
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/majors').then(res =>{
      if(res.data.length > 0){
        this.setState({majors: res.data});
        console.log(this.state.majors);
      }
    }).catch(err => console.log(err));

    axios.get('http://localhost:5000/subjects').then(res =>{
      if(res.data.length > 0){
        this.setState({subjects: res.data});
        console.log(this.state.subjects);
      }
    }).catch(err => console.log(err));

    axios.get('http://localhost:5000/professors').then(res =>{
      if(res.data.length > 0){
        this.setState({profs: res.data});
      }
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className='text-left'>
        {/* <Link to={"/add/major"}>
          <button type="button" className="btn btn-dark btn-lg float-right">
          Add New Major
          </button>
        </Link> */}
        <h1>EST Essouira Majors & Subjects:</h1>
        <hr/>
        <br/>
        <ul>
          {this.state.majors.map((major, i) => 
            <div className='text-left' style={{float: 'left', marginRight: 110}} key={i}>

            <li key={i}>
              <h2>{major.name}</h2>
              <ul>
                {this.state.subjects.filter(subject => major.subjects.includes(subject._id)).map((subject, i) =>
                  <li key={i}>
                    <h4>{subject.name}:<pre>{this.state.profs.filter(prof => prof._id === subject.professor).map(prof => prof.name)}</pre></h4>
                  </li>
                )}
              </ul>
            </li>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
