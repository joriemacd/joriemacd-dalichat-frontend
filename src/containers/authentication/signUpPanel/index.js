import React from 'react';
import { connect } from 'react-redux';

import ActionTypes from '../../../state/actions';
import { signUpUser } from '../../../state/actions/authActions';
import {
  createErrorSelector, setError, clearError, createLoadingSelector,
} from '../../../state/actions/requestActions';

class SignUpPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    };

    this.handleFirstNameUpdate = this.handleFirstNameUpdate.bind(this);
    this.handleLastNameUpdate = this.handleLastNameUpdate.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // If the user is already authenticated, auto-redirect
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/admin');
    }
  }

  handleFirstNameUpdate(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameUpdate(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailUpdate(e) {
    this.setState({ email: e.target.value });
  }

  handleUsernameUpdate(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordUpdate(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.firstName) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter your first name!');
    } else if (!this.state.lastName) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter your last name!');
    } else if (!this.state.email) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter an email address!');
    } else if (!this.state.username) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter a username!');
    } else if (!this.state.password) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter a password!');
    } else {
      // Send only if all fields filled in
      this.props.signUpUser(this.state.email, this.state.username, this.state.password, this.state.firstName, this.state.lastName).then((response) => {
        this.props.history.push('/');
      }).catch((error) => {
        // Add error-handling logic here
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameUpdate} required />
          <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameUpdate} required />
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailUpdate} required />
          <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameUpdate} required />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordUpdate} required />
          <input type="submit" value="Sign Up" />
        </form>
        {this.props.isLoading ? <div>Authenticating...</div> : this.props.errorMessage}
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const loadActions = [ActionTypes.AUTH_USER];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

export default connect(mapStateToProps, { signUpUser, setError, clearError })(SignUpPanel);
