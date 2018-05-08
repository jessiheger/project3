import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props){
		super(props);
	{/* give Signup an initial state */}
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
	{/* bc we use an arrow function, the scope is still to the Sign up component*/}
		e.preventDefault();
		console.log('form was submitted', this.state);
		{/* connect this function to the router.post('/signup' route in auth.js : 
		1st parameter: URL that I want to hit
		2nd parameter: data that I want to send
		Will only be able to reach /auth/signup if nodemon is running*/}
		axios.post('/auth/signup', this.state)
		.then(result => {
			console.log("SUCCESS!", result.data)
			// when we sign or login, we want to set the token; adds newly received token to local storage
			localStorage.setItem('mernToken', result.data.token);
			// update the user with a call to App.js to do this for us (the getUser function)
			this.props.updateUser();
			// ^ we want to send props to the signup route
		})
		.catch(err => {
			console.log("ERROR", err)
		})
	}


	render() {
		if(this.props.user) // if there is a logged in user
			return (<Redirect to="/profile" />); // if you're already logged in, you dont need to sign up again
		return(
			<div>
				<h2>Signup As a New User!</h2>
				<form onSubmit={this.handleSubmit}>
				{/* handeSubmit is defined above; "this" is referring to the Signup component*/}
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