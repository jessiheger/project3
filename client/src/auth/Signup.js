import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	handleNameChange =(e) => {
		this.setState({ name: e.target.value });
	}

	handleEmailChange =(e) => {
		this.setState({ email: e.target.value });
	}
	handlePasswordChange =(e) => {
		this.setState({ password: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('form was submitted', this.state);
		axios.post('/auth/signmeup', this.state)
		.then(result => {
			console.log("SUCCESS!", result.data)
			localStorage.setItem('mernToken', result.data.token);
			this.props.updateUser();
		})
		.catch(err => {
			console.log("ERROR", err)
		})
	}


	render() {
		if(this.props.user) 
			return (<Redirect to="/profile" />);
		return(
			<div>
				<h2>Signup As a New User!</h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input name="Name" placeholder="What is your name?" value={this.state.name} onChange={this.handleNameChange}>
						</input>
					</div>
					<div>
						<input name="Email" placeholder="What is your email?" value={this.state.email} onChange={this.handleEmailChange}>
						</input>
					</div>
					<div>
						<input name="Password" type="password" placeholder="What is your password?" value={this.state.password1} onChange={this.handlePasswordChange} />
					</div>
					<input type="submit" value="Sign Me Up!" className="button" />
				</form>
			</div>
		);
	}
}

export default Signup;