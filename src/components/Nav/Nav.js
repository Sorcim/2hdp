import {Link, useHistory} from "react-router-dom";
import Search from "../Search/Search";
import React, {Fragment} from "react";
import {connect} from "react-redux";
import {logoutAction} from "../Login/LoginAction";

const mapStateToProps = (state, ownProps) => {
  return {
    user:state.user
  };
};

const mapDispatchToProps = {
  logoutAction
};

const NavComponent = ({user, logoutAction}) => {
  const history = useHistory();
  const logout = () => {
    logoutAction()
    history.push('/')
  }
  return <nav className="border-b border-gray-800">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between px-4 py-6">
      <ul className="flex flex-col md:flex-row items-center">
        <li>
          <Link to="/">
            <h1>2HDP Like</h1>
          </Link>
        </li>
        {user &&
          <Fragment>
            <li className="md:ml-16 mt-3 md:mt-0">
              <Link to="/like">Movies Like</Link>
            </li>
            <li className="md:ml-6 mt-3 md:mt-0">
              <Link to="/randomize">Random Movie</Link>
            </li>
            <li className="md:ml-6 mt-3 md:mt-0 cursor-pointer" onClick={()=>{logout()}}>
              Logout
            </li>
          </Fragment>
        }
      </ul>
      {user && <Search/>}
    </div>
  </nav>

}
const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavComponent);

export default Nav;