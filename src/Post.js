import React, { Component } from "react";
import { connect } from "react-redux";
class Post extends Component {
  render() {
    return (
      <div className="post">
        <h2 className="post_title">{this.props.post.title}</h2>
        <p className="post_message">{this.props.post.message}</p>
        <p className="post_tel">{this.props.post.tel}</p>

        <img src={require("./cat.jpeg")} className="reactImg" alt="?" />
        <div className="control-buttons">
          <button
            className="edit"
            onClick={() =>
              this.props.dispatch({ type: "EDIT_POST", id: this.props.post.id })
            }
          >
            <p className="editText">Редактировать</p>
          </button>
          <button
            className="delete"
            onClick={() =>
              this.props.dispatch({
                type: "DELETE_POST",
                id: this.props.post.id
              })
            }
          >
            <p className="deleteText">Удалить</p>
          </button>
        </div>
      </div>
    );
  }
}
export default connect()(Post);
