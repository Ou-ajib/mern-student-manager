import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
    constructor(props){
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    signOut(){
        window.location = '/';
        this.props.signOut();
        console.log('hhhhhh');

    }
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            {/* <a className="nav-link" href="#"><h3>EST Essaouira</h3></a> */}
                            {/* <h3 style={{color: 'white'}}>EST Essaouira</h3> */}
                            <Link to="/" className="nav-link"><h3>EST Essaouira</h3></Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item">
                            <Link to="/students" className="nav-link"><h5>Students & Marks</h5></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/professors" className="nav-link"><h5>Professors & Subject</h5></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/majors" className="nav-link"><h5>Majors</h5></Link>
                        </li>
                        <li>
                            {/* <a className="btn btn-secondary btn-sm" id="navbarDropdown" role="button" href="http://localhost:3000/" aria-haspopup="true"
                            aria-expanded="false" onClick={this.props.signOut} style={{paddingTop: 10,}}>
                            <h5>Sign Out</h5>
                            </a> */}
                            {/* <li> */}
                                <button type="button" className="btn btn-primary btn-small btn-nav" onClick={this.signOut}>
                                    Sign out
                                </button>
                            {/* </li> */}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}