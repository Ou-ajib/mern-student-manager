import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export default class Welcome extends Component {
  constructor(props){
    super(props);

    this.updateInfo = this.updateInfo.bind(this);
    this.addAdmin = this.addAdmin.bind(this);

    this.state = {
      user: this.props.user,
      email: this.props.user.email,
      username: '',
      currentpassword: '',
      newpassword: '',
      eml: '',
      usrname: '',
      pswrd: '',
      repeatpswrd: '',
    }
  }


  updateInfo(e){
    e.preventDefault();
    if(this.state.user.password === this.state.currentpassword){
      const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.newpassword,
      }
      // console.log(user);
      axios.post('http://localhost:5000/admins/update/'+this.state.user._id, user).then(res => {
        const newuser = {
          _id: this.props.user._id,
          email: this.state.email,
          username: this.state.username,
          password: this.state.newpassword,
        }
        this.props.onUpdateUser(newuser);
      }).catch(err => alert('Validation Error: Email must be unique and All Fields are required and should be at least 6 characters.'));
    } else alert('Incorrect password');
  }

  addAdmin(e){
    e.preventDefault();
    if(this.state.pswrd === this.state.repeatpswrd){
      const admin = {
        email: this.state.eml,
        username: this.state.usrname,
        password: this.state.pswrd,
      }
      axios.post('http://localhost:5000/admins/add', admin).then(res => {
        this.props.onUpdateUser(this.props.user);
        alert('Admin Added!');
      }).catch(err => alert('Validation Error: Email must be unique and All Fields are required and should be at least 6 characters.'));
    }else alert('Password and Repeat Password Fields to not match');
  }


  render() {
    return (
      <div className='text-left'>
        <h1>Welcome back, {this.state.user.username}.</h1>
        <br/>
        <br/>
        <div className='container'>
          <div className='text-left'>

            <Grid container direction={'row'}>
                <Container component="main" maxWidth="xs">
                    <form  noValidate>
                      <fieldset>
                        <legend><h2>Edit Your Info</h2></legend>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={this.state.user.email}
                        autoComplete="email"
                        disabled={true}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label='User Name'
                        autoComplete="username"
                        id='username'
                        name='username'
                        onChange= {(e) => {
                          this.setState({
                            username: e.target.value,
                          });
                        }}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Current Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => this.setState({
                          currentpassword: e.target.value,
                        })}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="New Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => this.setState({
                          newpassword: e.target.value,
                        })}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{marginTop: 40, paddingTop: 12}} 
                        onClick={this.updateInfo}
                        >
                          <h4>Edit Your Info</h4>
                        </Button>
                      </fieldset>
                    </form>
                </Container>
                <Container component="main" maxWidth="xs">
                    <form  noValidate>
                      <fieldset>
                        <legend><h2>Add New Admin</h2></legend>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="User Name"
                        autoComplete="username"
                        onChange={(e) => this.setState({
                          usrname: e.target.value,
                        })}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        onChange={(e) => this.setState({
                          eml: e.target.value,
                        })}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => this.setState({
                          pswrd: e.target.value,
                        })}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Repeat Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => this.setState({
                          repeatpswrd: e.target.value,
                        })}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{marginTop: 40, paddingTop: 12}} 
                        onClick={this.addAdmin}
                        >
                            <h4>Add New Admin</h4>
                        </Button>
                      </fieldset>
                    </form>
                </Container>
            </Grid>
          </div>
            </div>
      </div>
    );
  }
}
