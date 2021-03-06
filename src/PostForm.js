import React, { Component } from "react";
import { connect } from "react-redux";
import helpLogo from "./rectangle-13-copy-141.svg";
import NumberFormat from "react-number-format";
import successLogo from "./rectangle-13-copy-6.svg";
import errorLogo from "./rectangle-13-copy-146.svg";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerError: "",
      headerValidationState: "",
      headerTouched: false,
      telTouched: false,
      telValidationState: "",
      telError: "",
      msgTouched: false,
      msgValidationState: "",
      msgError: "",
      headerValid: false,
      telValid: false,
      msgValid: false,
      submitDisabled: true,

      telInput: ""
    };
    this.baseState = this.state;
  }
  handleSubmit = e => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message = this.getMessage.value;
    const tel = this.getTel.value;
    const data = {
      id: new Date(),
      title,
      message,
      tel,
      editing: false
    };
    this.props.dispatch({
      type: "ADD_POST",
      data
    });
    this.getTitle.value = "";
    this.getMessage.value = "";
    this.getTel.value = "";

    this.setState(this.baseState);
  };

  canSubmit = () => {
    console.log("canSubmit", this.state.submitDisabled);
    const { headerValid, msgValid, telValid } = this.state;
    console.log(
      "headervalid",
      this.state.headerValid,
      "msgValid",
      this.state.msgValid,
      "telvalid",
      this.state.telValid
    );
    headerValid && msgValid && telValid
      ? this.setState({
          submitDisabled: false
        })
      : this.setState({ submitDisabled: true });
  };

  handleHeaderChange = e => {
    console.log(this.state.headerTouched, this.state.telTouched);
    console.log("inputChange", e.target.name, e.target.value);
    this.setState({ headerValidationState: e.target.value }, () => {
      this.validateHeader();
    });
  };
  handleTelChange = e => {
    console.log("inputChange", e.target.name, e.target.value);
    this.setState({ telInput: this.getTel.value });
    this.setState({ telValidationState: e.target.value }, () => {
      console.log("state", this.state.telValidationState);
      this.validateTel();
    });
  };
  handleMsgChange = e => {
    console.log("inputChange", e.target.name, e.target.value);

    this.setState({ msgValidationState: e.target.value }, () => {
      console.log("state", this.state.msgValidationState);
      this.validateMsg();
    });
  };

  validateHeader = e => {
    const { headerValidationState } = this.state;
    this.setState({ headerTouched: true });
    if (
      this.state.headerValidationState.length > 0 &&
      this.state.headerValidationState.length <= 140
    ) {
      this.setState(
        {
          headerError: (
            <div>
              <img src={successLogo} className="help-1" alt="?" />
              <p className="helper headerHelper success">Заполнено</p>
            </div>
          ),
          headerValid: true
        },
        this.canSubmit
      );
    } else {
      this.setState(
        {
          headerError:
            headerValidationState.length > 140 ? (
              <div>
                <img src={errorLogo} className="help-1" alt="?" />
                <p className="helper headerHelper error">
                  Не более 140 символов
                </p>
              </div>
            ) : (
              <div>
                <img src={errorLogo} className="help-1" alt="?" />
                <p className="helper headerHelper  error">Заполните поле</p>
              </div>
            ),
          headerValid: false
        },
        this.canSubmit
      );
    }
    console.log(this.state.headerValid);
    console.log("can submit", this.state.canSubmit);
  };

  validateMsg = e => {
    const { msgValidationState } = this.state;
    this.setState({ msgTouched: true });
    if (msgValidationState.length > 300) {
      this.setState(
        {
          msgError: (
            <div>
              <img src={errorLogo} className="help-2" alt="?" />
              <p className="helper textHelper error">Не более 300 символов</p>
            </div>
          ),
          msgValid: false
        },
        this.canSubmit
      );
    } else {
      this.setState({
        msgError: (
          <div>
            <img src={successLogo} className="help-2" alt="?" />
            <p className="helper textHelper success">Заполнено</p>
          </div>
        ),
        msgValid: true
      });
    }
  };

  validateTel = e => {
    const { telValidationState } = this.state;
    const regexp = /^(\+7|7|8)?[\s]?\(?[489][0-9]{2}\)?[\s]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2}$/;
    const notFilled = /[_]/;

    this.setState({ telTouched: true });

    if (
      this.state.telValidationState.length < 1 ||
      notFilled.test(this.state.telValidationState)
    ) {
      this.setState({
        telError: (
          <div>
            <img src={errorLogo} className="help-3" alt="?" />
            <p className="helper telHelper error">Заполните поле</p>
          </div>
        ),
        telValid: false
      });
    } else {
      this.setState(
        {
          telError: regexp.test(telValidationState) ? (
            <div>
              <img src={successLogo} className="help-3" alt="?" />
              <p className="helper telHelper success">Заполнено</p>
            </div>
          ) : (
            <div>
              <img src={errorLogo} className="help-3" alt="?" />
              <p className="helper telHelper error">Неверный формат</p>
            </div>
          ),
          telValid: regexp.test(telValidationState)
        },
        regexp.test(telValidationState) ? this.canSubmit : null
      );
    }
  };

  render() {
    return (
      <div className="post-container" style={{ height: "630px" }}>
        <h1 className="post_heading">Подать объявление</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          {this.state.headerTouched ? (
            ""
          ) : (
            <div>
              <img src={helpLogo} className="help-copy help-1" alt="?" />
              <p className="helper headerHelper">
                Обязательное поле <br /> Не более 140 символов
              </p>
            </div>
          )}

          <label className="label headingLabel">Заголовок</label>
          <input
            className={
              "Rectangle-926-Copy-3 headingInput " +
              (!this.state.headerValid && this.state.headerTouched
                ? "errorBorder "
                : "")
            }
            type="text"
            ref={input => (this.getTitle = input)}
            onChange={e => this.handleHeaderChange(e)}
            onBlur={this.validateHeader}
            name="header"
          />

          <div className="">{this.state.headerError}</div>

          {this.state.msgTouched ? (
            ""
          ) : (
            <div>
              <img src={helpLogo} className="help-copy help-2" alt="?" />
              <p className="helper textHelper">Не более 300 символов</p>
            </div>
          )}

          <label className="label textLabel">Текст объявления</label>
          <textarea
            className={
              "Rectangle-926-Copy-6 textInput " +
              (!this.state.msgValid && this.state.msgTouched
                ? "errorBorder "
                : "")
            }
            type="text"
            onChange={e => this.handleMsgChange(e)}
            onBlur={this.validateMsg}
            ref={input => (this.getMessage = input)}
          />
          <div className="">{this.state.msgError}</div>

          {this.state.telTouched ? (
            ""
          ) : (
            <div>
              <img src={helpLogo} className="help-copy help-3" alt="?" />
              <p className="helper telHelper">Обязательное поле</p>
            </div>
          )}

          <label className="label telLabel">Телефон</label>
          <NumberFormat
            className={
              "Rectangle-926-Copy-3 telInput " +
              (!this.state.telValid && this.state.telTouched
                ? "errorBorder "
                : "")
            }
            format="+7 (###) ###-##-##"
            mask="_"
            placeholder="+7 (___) ___ - __ - __"
            getInputRef={input => (this.getTel = input)}
            //onChange={e => this.handleTelChange(e)}
            onBlur={e => this.handleTelChange(e)}
            name="tel"
            id="tel"
            value={this.state.telInput}
          />
          <div className="">{this.state.telError}</div>

          <button className="BG" disabled={this.state.submitDisabled}>
            <p className="bgText">Подать</p>
          </button>
        </form>
      </div>
    );
  }
}
export default connect()(PostForm);
