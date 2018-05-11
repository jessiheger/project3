import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';

// MATERIAL UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UserAuth extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			value: 'login'
		};
	}

	handleTabChange= (value) => {
		this.setState({ value: value });
	}

	handleEmailChange =(e) => {
		this.setState({ email: e.target.value });
	}
	handlePasswordChange =(e) => {
		this.setState({ password: e.target.value });
	}
	handleNameChange =(e) => {
		this.setState({ name: e.target.value });
	}

	handleLoginSubmit = (e) => {
		e.preventDefault();
		console.log('login form was submitted', this.state);
		axios.post('/auth/login', {
			email: this.state.email,
			password: this.state.password })
		.then(result => {
			console.log("SUCCESSFUL LOGIN! result.data is ", result.data)
			localStorage.setItem('mernToken', result.data.token);
			this.props.updateUser();
		})
		.catch(err => {
			console.log("LOGIN ERROR", err.response.data)
		});
	}

	handleSignupSubmit = (e) => {
		e.preventDefault();
		console.log('Signup form was submitted', this.state);
		axios.post('/auth/signmeup', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password })
		.then(result => {
			console.log("SUCCESSFUL SIGNUP! result.data is ", result.data)
			localStorage.setItem('mernToken', result.data.token);
			this.props.updateUser();
		})
		.catch(err => {
			console.log("SIGNUP ERROR", err.response.data)
		});
	}

	render() {
		if(this.props.user) {
			return (<Redirect to="/profile" />);
		}
		return(
			<Tabs 
				className="UserAuthTabs"
				value={this.state.value}
				onChange={this.handleTabChange} >
				<Tab label="Login" value="login">
					<div>
						<h2>Login</h2>
					</div>
					<div>
						<TextField 
							name="email"
							type="email"
							floatingLabelText="Email" 
							value={this.state.email} 
							onChange={this.handleEmailChange}>
						</TextField>
					</div>
					<div>
						<TextField 
							name="password" 
							type="password" 
							floatingLabelText="Password" 
							value={this.state.password} 
							onChange={this.handlePasswordChange} >
						</TextField>
					</div>
					<div>
						<RaisedButton
							label="Log me in!"
							onClick={this.handleLoginSubmit} 
							/>
					</div>
				</Tab>
				<Tab label="Sign Up" value="signup">
					<div>
						<h2>Sign Up</h2>
					</div>
					<div>
						<TextField 
							name="name"
							type="text"
							floatingLabelText="Name" 
							value={this.state.name} 
							onChange={this.handleNameChange}>
						</TextField>
						<TextField 
							name="email"
							type="email"
							floatingLabelText="Email" 
							value={this.state.email} 
							onChange={this.handleEmailChange}>
						</TextField>
					</div>
					<div>
						<TextField 
							name="password" 
							type="password" 
							floatingLabelText="Password" 
							value={this.state.password} 
							onChange={this.handlePasswordChange} >
						</TextField>
					</div>
					<div>
						<RaisedButton
							label="Sign me up!"
							onClick={this.handleSignupSubmit} 
						/>
					</div>
				</Tab>
			</Tabs>
		);
	}
}

export default UserAuth;