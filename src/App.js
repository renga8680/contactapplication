/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as contactAction from "./actions/contactAction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleinput = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let contact = {
      name: this.state.name
    };
    this.props.createContact(contact);
  };

  listView(data, index) {
    console.log("ndjd");
    return (
      <div className="row">
        <div className="col-md-5">
          <li key={index} className="list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button
            onClick={e => this.deleteContact(e, index)}
            className="btn btn-danger"
          >
            REMOVE
          </button>
        </div>
      </div>
    );
  }

  deleteContact(e, index) {
    e.preventDefault();
    this.props.deleteContact(index);
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1> ClientsideContactApplication</h1>
          <hr />

          <div>
            <h3> ADD Contact Form</h3>

            <input
              type="text"
              value={this.state.name}
              onChange={this.handleinput}
              className="form-control"
            />
            <br />
            <input type="Submit" className="btn btn-success" value="ADD" />
          </div>
        </form>
        <hr />
        {
          <ul className="list-group">
            {this.props.contacts.map((contact, i) => this.listView(contact, i))}
          </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index => dispatch(contactAction.deleteContact(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
