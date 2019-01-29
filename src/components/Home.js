import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
  handleClick() {
    this.props.handleChangeState();
  }

  render() {
    return (
      <div>
        <p>{this.props.initialText}</p>
        <button type="button" onClick={this.handleClick.bind(this)}>
          change text!
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  initialText: PropTypes.string.isRequired,
  changeText: PropTypes.func
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChangeState: () => dispatch({ type: "CHANGE_TEXT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
