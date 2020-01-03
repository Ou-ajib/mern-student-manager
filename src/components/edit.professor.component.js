import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      subject: '',
      email: '',
      phone: '',
      birthday: new Date(),
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/professors/'+this.props.match.params.id).then(response => {
        this.setState({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            birthday: new Date(response.data.birthday),
        });
    }).catch(function (error) {console.log(error);});


    axios.get('http://localhost:5000/subjects/prof/'+this.props.match.params.id).then(response => {
      console.log(response.data);
      if(response.data.length > 0) 
        this.setState({subject: response.data[0].name, subj: response.data[0]});
        // });
    }).catch(function (error) {console.log(error);});
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  onChangeBirthday(date) {
    this.setState({
      birthday: date
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const prof = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      birthday: this.state.birthday,
    }
    const subject = {
      name: this.state.subject,
      professor: this.props.match.params.id,
    }

    axios.post('http://localhost:5000/professors/update/'+this.props.match.params.id, prof).then(res => {
      axios.post('http://localhost:5000/subjects/update/'+this.state.subj._id, subject).then(res => {
        alert('Professor and Subject Updated');
      }).catch(err => console.log(err));
    });

  }

  render() {
    return (
    <div className='text-left'>
      <h1>Edit Professor & Subject:</h1>
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
          <label>Subject: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.subject}
              onChange={this.onChangeSubject}
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
          <input type="submit" value="Edit Professor" className="btn btn-lg btn-dark" />
        </div>
      </form>
    </div>
    )
  }
}