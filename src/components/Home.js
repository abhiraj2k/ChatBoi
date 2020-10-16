import React, { Component } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
// Actions
import {
  getRealTimeUsers,
  updateMessage,
  getReatTimeConversations,
} from "../actions";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export class Home extends Component {
  // State
  state = {
    chatStarted: "",
    chatUser: "",
    message: "",
    userUid: "",
    show: false,
    displayUser: new Set(),
    usersList: [],
  };
  // Lifecycle Methods
  componentDidMount() {
    this.unsubscribe = this.props
      .getRealTimeUsers(this.props.auth.uid)
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((err) => console.log(err));
  }
  componentWillUnmount() {
    console.log(this.unsubscribe);
    this.unsubscribe
      .then((f) => {
        f();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Initiate Chat
  initiateChat = (user) => {
    this.setState({ chatStarted: true });
    this.setState({ chatUser: `${user.firstName} ${user.lastName}` });
    this.setState({ userUid: user.uid });
    this.props.getReatTimeConversations({
      uid_1: this.props.auth.uid,
      uid_2: user.uid,
    });
  };
  user = (props) => {
    const { user, onClick } = props;
    return (
      <div onClick={() => onClick(user)} className="user">
        <div className="user-avatar">
          <img
            src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/1024/batman-icon.png"
            alt=""
          />
        </div>
        <div className="user-name">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div className="online">{user.isOnline ? "online" : null}</div>
        </div>
      </div>
    );
  };

  //Handling sent message
  onMessageSubmit = (e) => {
    const messageObject = {
      user_uid_1: this.props.auth.uid,
      user_uid_2: this.state.userUid,
      message: this.state.message,
    };
    if (this.state.message !== "") {
      this.props
        .updateMessage(messageObject)
        .then(this.setState({ message: "" }));
    }
  };
  // Modal Close handle
  handleClose = () => {
    this.setState({ show: false });
  };
  // Modal Show Handle
  handleShow = () => {
    this.setState({ show: true });
  };
  // Modal Click handle
  handleModalClick = async (user) => {
    this.setState(
      (prevState) => ({
        displayUser: new Set(prevState.displayUser).add(user),
      }),
      () => {
        const usersList = Array.from(this.state.displayUser);
        this.setState({ usersList: usersList });
      }
    );
    this.handleClose();
  };
  // Switch Responsive
  handleResponsive = () => {
    document
      .querySelector(".users-list-container")
      .classList.toggle("responsive");
  };
  render() {
    return (
      <div className="home-container">
        <i className="fa fa-bars fa-2x" onClick={this.handleResponsive}></i>

        {/* Left Menu */}
        <div className="users-list-container">
          <div className="users-list">
            {this.props.user.users.length > 0
              ? this.state.usersList.map((user) => (
                  <this.user
                    onClick={this.initiateChat}
                    key={user.uid}
                    user={user}
                  />
                ))
              : null}
          </div>
          <div className="add-user" onClick={this.handleShow}>
            +
          </div>
        </div>
        <div className="chat-screen">
          <div className="chat-content">
            <div className="display-name">
              {this.state.chatStarted ? this.state.chatUser : null}
            </div>

            {/* Conversaiton */}
            {this.state.chatStarted
              ? this.props.user.conversations.map((conv) => (
                  <div key={conv.createdAt} className="message-section">
                    <div
                      className={
                        conv.user_uid_1 === this.props.auth.uid
                          ? "message-sent"
                          : "message-recieved"
                      }
                    >
                      <p>
                        {conv.message}
                        <br />
                        <span className="timestamp">12:00</span>
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
          {this.state.chatStarted ? (
            <div className="chat-controls">
              <textarea
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
              />
              <button onClick={this.onMessageSubmit}>Send</button>
            </div>
          ) : null}
        </div>

        {/* Modal */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            {this.props.user.users.map((user) => (
              <Row
                key={user.uid}
                className="modal-list"
                onClick={() => this.handleModalClick(user)}
              >
                <Col className="modal-img" md={2}>
                  <img
                    src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/1024/batman-icon.png"
                    alt=""
                  />
                </Col>
                <Col md={10} className="modal-name">
                  {user.firstName} {user.lastName}
                </Col>
              </Row>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
// Map State To Props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getRealTimeUsers,
  updateMessage,
  getReatTimeConversations,
})(Home);
