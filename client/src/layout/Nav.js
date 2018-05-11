import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class Nav extends Component {
	handleLogout = (e) => {
		console.log('Logging out...');
		e.preventDefault();
		localStorage.removeItem('mernToken'); 
		this.props.updateUser();
	}
	render() {
		let links = '';
		if(this.props.user){
			links = (
				<span>
					<Link to="/profile">Profile</Link>
					<Link to="/newtrip">New Trip</Link>
					<Link to="/worldview">World View</Link>
					<a onClick={this.handleLogout}>Logout</a>
				</span>
				);
		} 
		else {
			links = (
			<span>
					<Link to="/login">Log In</Link>
					<Link to="/demo">Demo</Link>
			</span>
			);
		}
		return(
			<div>
				<nav className = "nav" >
					<Link to="/">Home</Link>
					{links}
        		</nav>
				<header className="App-header">
      				<h1 className="App-title">Welcome to React</h1>
    			</header>
			</div>
		);
	}
}

export default Nav;