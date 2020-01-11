import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      major: '',
      name: '',
      email: '',
      phone: '',
      birthday: new Date(),
      subjects: [],
      subjectsIds: [],
      marks: [],
      studentMarks: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/students/'+this.props.match.params.id).then(response => {
        this.setState({
            major: response.data.major,
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            birthday: new Date(response.data.birthday)
        });
        axios.get('http://localhost:5000/majors/'+this.state.major).then(res => {
          this.setState({subjectsIds: res.data.subjects});
          axios.get('http://localhost:5000/subjects').then(r => {
            this.setState({
              subjects: r.data.filter(e => this.state.subjectsIds.includes(e._id)),
            });
            axios.get('http://localhost:5000/marks').then(res => {
              this.setState({
                marks: res.data.filter(e => (e.student === this.props.match.params.id)),
              });
              var s = this.state.subjects.map(s => {
                return {
                  subject: s.name,
                  subjectID: s._id,
                  mark: this.state.marks.filter(m => m.subject === s._id).map(m => m.mark)[0] ?? '',
                }
              });
              this.setState({studentMarks: s});
            });
          });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

  }

  onChangeMajor(e) {
    this.setState({
      major: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
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
    const student = {
      major: this.state.major,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      birthday: this.state.birthday,
    }

    axios.post('http://localhost:5000/students/update/'+this.props.match.params.id, student).then(res => alert(res.data))
    .catch(err => alert('Validation Error: Email must be unique and All Fields are required and should be at least 6 characters.'));
  }

  render() {
    return (
    <div className='text-left'>
      <h1>Edit Student:</h1>
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
        {/* <h2>Marks</h2> */}
        <div className="form-group">
          <input type="submit" value="Edit Student" className="btn btn-lg btn-dark" />
        </div>
      </form>
      <hr/>
      {
        this.state.studentMarks.map((e, i) => 
          <form key={i} onSubmit={(ev) => {
            ev.preventDefault();
            const body = {mark: this.state.studentMarks[i].mark}
            axios.post('http://localhost:5000/marks/edit/'+this.props.match.params.id+'/'+e.subjectID, body).then(res => {
              alert(res.data);
            }).catch(err => alert('Validation Error'));
          }}>
            <div>
              <div className="form-group">
                <label>{e.subject+" :"}</label>
                <input  type="text"
                    required
                    className="form-control"
                    value={e.mark}
                    onChange={(ev) => {
                      const l = this.state.studentMarks;
                      l[i].mark = ev.target.value;
                      this.setState({
                        studentMarks: l,
                      });
                    }}
                />
              </div>  
              <div className="form-group">
                <input type="submit" value="Edit Mark" className="btn btn-lg btn-dark" />
              </div>
            </div>
          </form>
        )}
    </div>
    )
  }
}