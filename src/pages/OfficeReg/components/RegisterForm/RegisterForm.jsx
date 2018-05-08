/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Button, Checkbox, Grid,Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './RegisterForm.scss';
import axios from 'axios';
const Toast = Feedback.toast;
const { Row, Col } = Grid;

export default class RegisterForm extends Component {
  static displayName = 'RegisterForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: undefined,
        pass: undefined,
        rePasswd: undefined,
        checkbox: false,
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (values && values !== stateValues.pass) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        Toast.error('输入有误!');
        return;
      }
      

      axios.post('/login/officeReg', values)
      .then(function (response) {
        if(response.data.status=='SUCCESS'){
          Toast.success('注册成功');
          window.location.href="/#/officeLogin";
        }else{
          Toast.error(response.data.msg);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });



    });
  };

  render() {
    return (
      <div className="register-form">
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>机构注册</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <Row style={styles.formItem}>
                <Col>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="account" required message="必填">
                    <Input maxLength={20} placeholder="账户,不支持中文" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="name" required message="必填">
                    <Input maxLength={20} placeholder="机构名称" />
                  </IceFormBinder>
                </Col>
                <Col>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="pass"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请输入密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="pass" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="rePasswd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox>记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  注 册
                </Button>
              </Row>

              <Row className="tips" style={styles.tips}>
                <a href="/#/officeLogin" style={styles.link}>
                  立即登录
                </a>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '5px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
