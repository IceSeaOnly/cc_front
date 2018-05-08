import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid,Feedback } from '@icedesign/base';
import axios from 'axios';
const Toast = Feedback.toast;
const { Row, Col } = Grid;

export default class ItemForm extends Component {
  static displayName = 'ItemForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
    };
  }

  componentDidMount() {
    var thiz = this;
    axios.get('/user/listOffice')
      .then(function (response) {
        thiz.setState({dataSource:response.data.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  submit = () => {
    var thiz = this;
    this.formRef.validateAll((error, value) => {
      if (error) {
        return;
      }

      axios.post('/user/applyContract', value)
      .then(function (response) {
        if(response.data.status == 'SUCCESS'){
          thiz.props.onSubmit(response.data.data.id);
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
      <IceFormBinderWrapper
        ref={(formRef) => {
          this.formRef = formRef;
        }}
        value={this.state.value}
        onChange={this.onFormChange}
      >
        <div>
          <h3 style={styles.formTitle}>选择机构</h3>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              我的地址：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="from">
                <Input
                  required
                  placeholder="转出资金的地址"
                  message="转出资金的地址必须填写"
                  style={{ width: '100%' }}
                />
              </IceFormBinder>
              <IceFormError name="from" />
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              选择机构：
            </Col>
            <Col s="12" l="16">
              <IceFormBinder name="officeId">
                <Select
                  className="next-form-text-align"
                  required
                  style={{ width: '30%' }}
                  message="请选择机构"
                  dataSource={this.state.dataSource}
                />
              </IceFormBinder>
              <IceFormError name="officeId" />
            </Col>
          </Row>
          <Row>
            <Col offset={3} style={styles.btns}>
              <Button onClick={this.submit} type="primary">
                下一步
              </Button>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    marginTop: '25px',
    marginBottom: '25px',
  },
};
