import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {

  const renderContent = () => {
    switch(auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Sign In With Google</a></li>
        );
      default:
        return (
          <li><a href="/api/logout">Logout</a></li>
        );
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={ auth? "/surveys": "/" } className="left brand-logo">Emaily</Link>
        <ul className="right">
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Header);
