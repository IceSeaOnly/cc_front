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

export default class Step4ItemForm extends Component {
  static displayName = 'ItemForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      contract:{},
      btnDisabled:true,
      checkEnvSuccess:false,
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

      this.state.contract.tx = value.tx;

      axios.post('/user/detailTx', this.state.contract)
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

  makeDeal = ()=>{
    this.checkNebpay(function(){
      if(!this.state.checkEnvSuccess){
        return;
      }

      console.log("********* call smart contract \"sendTransaction\" *****************")
        var func = "apply"
        var args = "[\"" + this.state.contract.uuid + "\",\"" + this.state.contract.endTimeTs + "\"]"

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : this.state.contract.smartContractAddrsss,
                "value" : this.state.contract.val,
                "contract" : {
                    "function" : func,
                    "args" : args
                }
            },
            "method": "neb_sendTransaction"
        }, "*");

        this.setState({btnDisabled:false});
    })
  }

  checkNebpay(func) {
      console.log("check nebpay")
      try{
          // var NebPay = require("./src/html/lib/nebPay.js");
          this.setState({'checkEnvSuccess':true},func);
      }catch(e){
          console.log(e);
          Toast.show({
          type: "error",
          content: "未检测到Chrome扩展插件，请先安装! https://github.com/ChengOrangeJu/WebExtensionWallet",
          afterClose: () => console.log("Closed the toast")
        });
      }
  }

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
          <h3 style={styles.formTitle}>向合约付款</h3>
          <Button onClick={this.makeDeal}  type="primary" disabled={!this.state.btnDisabled}>
                开始交易
          </Button>

          <h3 style={styles.formTitle}>录入交易Hash</h3>
          <Row>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              交易hash：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="tx">
                <Input multiple style={{ width: '100%' }} />
              </IceFormBinder>
            </Col>
          </Row>
          <Row>
            <Col offset={3} style={styles.btns}>
              <Button onClick={this.submit} type="primary" disabled={this.state.btnDisabled}>
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
