import {Component} from "react";
import {Button, Input, Text, View,Label} from "@tarojs/components";
import {AtInput} from "taro-ui";
import Taro from "@tarojs/taro";



class gotoInsert extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      address: '',
      label:'',
      name:'',
      phone:'',
      token:''
    }
  }

  componentDidMount() {//只第一次打开页面渲染一次
    let token
    Taro.getStorage({
      key: 'user',
      success: function (res) {
        token=res.data.data.msg;
      }
    })
    setTimeout(() => {
      this.setState({
        token:token,
      })
    }, 1000);
  }

  inputAddress=(address)=>{
    this.setState({
      address:address.detail.value
    })
  }
  inputLabel=(label)=>{
    this.setState({
      label:label.detail.value
    })
  }
  inputName=(name)=>{
    this.setState({
      name:name.detail.value
    })
  }
  inputPhone=(phone)=>{
    this.setState({
      phone:phone.detail.value
    })
  }
  tiJiao=()=>{
    let code;
    const {address,label,name,phone,token}=this.state
    console.log("value:"+address+label+name+phone);
    wx.login({
      success:res=>{
        console.log("code: ",res.code)
        Taro.request({
          url: "http://localhost:8090/address/insertAddress",
          data: {
            address_openId:res.code,
            address_address:address,
            address_label:label,
            address_nickname:name,
            address_phone:phone,
          },
          method:"POST",
          header: {
            "content-type": "application/json",
            token: token
          },
        }).then(res=>{
          if(res.data>0){
            Taro.navigateTo({
              url: './index'
            }).then()
          }else{
          }
        })
      }
    })


  }

render(){
  const {address,label,name,phone}=this.state

  return(
    <View>
      <Label>输入地址</Label>
      <Input onInput={this.inputAddress.bind(address)}/>
      <Label>输入标签</Label>
      <Input onInput={this.inputLabel.bind(label)}/>
      <Label>输入姓名</Label>
      <Input onInput={this.inputName.bind(name)}/>
      <Label>输入电话</Label>
      <Input onInput={this.inputPhone.bind(phone)} maxlength='11'/>
      <Button onClick={this.tiJiao}>保存</Button>
    </View>
  )
}
}
export default gotoInsert;
