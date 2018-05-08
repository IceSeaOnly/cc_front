import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid,Feedback,DatePicker } from '@icedesign/base';
import axios from 'axios';
const Toast = Feedback.toast;
const { Row, Col } = Grid;

export default class Step2ItemForm extends Component {
  static displayName = 'ItemForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      contract:{}
    };
  }

  componentDidMount(){
    var thiz = this;
    axios.get('/user/listMyContract?id='+thiz.props.getContractId())
      .then(function (response) {
        thiz.setState({contract:response.data.data});
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
      console.log(value);
      if (error) {
        return;
      }

      this.state.contract.val = value.val;
      this.state.contract.endTimeTs = value.endTimeTs;
      this.state.contract.remark = value.remark;

      axios.post('/user/detailContract', this.state.contract)
      .then(function (response) {
        if(response.data.status == 'SUCCESS'){
          thiz.props.onSubmit();
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
          <h3 style={styles.formTitle}>录入合约</h3>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              NAS总量：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="val">
                <Input
                  required
                  placeholder="请输入整数个要转移的NAS总量"
                  message="NAS总量必须填写"
                  style={{ width: '100%' }}
                />
              </IceFormBinder>
              <IceFormError name="val" />
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              到期时间：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="endTimeTs" valueFormatter={(date, strValue) => {
                  return date == null ? 0 : date.getTime();
                }}>
                <DatePicker name="endTimeTs" showTime />
              </IceFormBinder>
              <IceFormError name="endTimeTs" />
            </Col>
          </Row>
          <Row>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              合约描述：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="remark">
                <Input multiple style={{ width: '100%' }} />
              </IceFormBinder>
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
