import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    user:state.user
  };
};

const PrivateRouteComponent = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

const PrivateRoute = connect(
  mapStateToProps
)(PrivateRouteComponent);

export default PrivateRoute