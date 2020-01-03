import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AddProfessor extends Component {
  constructor(props) {
    super(props);

    this.onChangeProf = this.onChangeProf.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubjectSubmit = this.onSubjectSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.clearFields = this.clearFields.bind(this);

    this.state = {
      name: '',
      email: '',
      phone: '',
      birthday: new Date(),
      subjects: [],
      availableprofessors: [], 
      professor: {
        name: '',
      },
      subjectname: '',
    }
  }

  clearFields(){
    this.setState({
      name: '',
      email: '',
      phone: '',
      birthday: new Date(),
      subjects: [],
      availableprofessors: [], 
      professor: {
        name: '',
      },
      subjectname: '',
    });
  }

  getData(){
    this.clearFields();
    axios.get('http://localhost:5000/subjects').then(res => {
      this.setState({subjects: res.data});
      axios.get('http://localhost:5000/professors').then(response => {
        const p = response.data.filter(prof => !this.state.subjects.map(subject => subject.professor).includes(prof._id));
        if(p.length > 0)
        this.setState({
          availableprofessors: p,
          professor: p[0],
        });
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  componentDidMount(){
    this.getData();
  }

  onChangeProf(e) {
    const p = this.state.availableprofessors.filter(prof => prof.name === e.target.value);
    this.setState({
      professor: p[0],
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeSubjectName(e) {
    this.setState({
      subjectname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeBirthday(date) {
    this.setState({
      birthday: date
    });
  }

  onSubjectSubmit(e){
    e.preventDefault();
    const subject = {
        professor: this.state.professor._id,
        name: this.state.subjectname,
    }


    axios.post('http://localhost:5000/subjects/add', subject).then(res => {
      this.getData();
      alert(res.data);
    }).catch(err => alert('Validation Error: All Fields are required.'));
  }

  onSubmit(e) {
    e.preventDefault();
    const professor = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      birthday: this.state.birthday,
    }

    axios.post('http://localhost:5000/professors/add', professor).then(res => {
      this.getData();
      alert(res.data);
    }).catch(err => alert('Validation Error: All Fields are required.'));
  }

  render() {
    return (
    <div className='text-left'>
      <h1>Add New Professor:</h1>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group"> 
          <label>Phone: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
              />
        </div>
        <div className="form-group">
          <label>Birthday: </label>
          <div>
            <DatePicker
              selected={this.state.birthday}
              onChange={this.onChangeBirthday}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add New Professor" className="btn btn-lg btn-dark" />
        </div>
      </form>
      <hr/>
    <h1>Add New Subject:</h1>
    <form onSubmit={this.onSubjectSubmit}>
      <div className="form-row"> 
          <label>Available Professors: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.professor.name}
              onChange={this.onChangeProf}>
              {
                this.state.availableprofessors.map(function(prof) {
                  return <option 
                    key={prof.name}
                    value={prof.name}>{prof.name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.subjectname}
              onChange={this.onChangeSubjectName}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Add New Subject" className="btn btn-lg btn-dark" />
        </div>
      </form>
    </div>
    )
  }
}