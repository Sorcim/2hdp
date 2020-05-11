import React from 'react';
import "./Login.scss";
import firebase from "../../Tools/Firebase";
import {useHistory} from "react-router-dom";
import {loginAction} from "./LoginAction";
import {connect} from "react-redux";

const mapDispatchToProps = {
  loginAction
};

const LoginComponent = ({loginAction}) => {
  const [email, setEmail] = React.useState('johan.pesquer@gmail.com');
  const [password, setPassword] = React.useState('azerty');
  const [error, setError] = React.useState('');
  const history = useHistory();
  const submitForm = (e) => {
    setError('');
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        loginAction(firebase.auth().currentUser)
        history.push('/')
      })
      .catch((error)=>{
      setError(error.message)
    })
  }
  return <div className="login">
    <form className="form" onSubmit={submitForm}>
      {error && <p className="error">{error}</p>}
      <div className="form__body">
        <div className="input-with-icon">
          <input
            type="email"
            className="input-custom"
            placeholder="your.name@company.com"
            name="email"
            value={email}
            onChange={(event)=>{
              setEmail(event.target.value)
            }}
          />
        </div>
        <div className="input-with-icon">
          <input
            type="password"
            className="input-custom"
            placeholder="password"
            name="password"
            value={password}
            onChange={(event)=>{
              setPassword(event.target.value)
            }}
          />
        </div>
        <button className="btn" type="submit" >Login</button>
      </div>
    </form>
  </div>;
}
const Login = connect(
  null,
  mapDispatchToProps
)(LoginComponent);

export default Login