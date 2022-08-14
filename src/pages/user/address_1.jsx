import {Component} from "react";
import {Button, Input, Label, View} from "@tarojs/components";
import Taro, {getCurrentInstance} from "@tarojs/taro";
import './address_1.css';
import {AtButton} from "taro-ui";


class Address_1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      add: '',
      address_id:'',
      address_openId:'',
      address_address:'',
      address_label:'',
      address_nickname:'',
      address_phone:''
    }
  }

  $instance = getCurrentInstance()
  componentDidMount() {//只第一次打开页面渲染一次
    let that = this
    const add = JSON.parse(this.$instance.router.params.add)
    this.setState({
      add: add,
      address_id:add.address_id,
      address_address:add.address_address,
      address_label:add.address_label,
      address_nickname:add.address_nickname,
      address_phone:add.address_phone
    })
    let token
    Taro.getStorage({
      key: 'user',
      success: function (res) {
        token = res.data.data.msg;
        that.setState({
          token: token,
        })
      }
    })
  }

  updateAddress=(address)=>{
    this.setState({
      address_address:address.detail.value
    })
  }
  updateLabel=(label)=>{
    this.setState({
      address_label:label.detail.value
    })
  }
  updateNickname=(nickname)=>{
    this.setState({
      address_nickname:nickname.detail.value
    })
  }
  updatePhone=(phone)=>{
    this.setState({
      address_phone:phone.detail.value
    })
  }

  xiugai=()=>{
    const {address_id,address_address,address_label,address_nickname,address_phone,token} = this.state
    let code;
    wx.login({
      success:res=>{
        Taro.request({
          url: "http://localhost:8090/address/updateAddress",
          data: {
            address_id:address_id,
            address_openId:res.code,
            address_address:address_address,
            address_label:address_label,
            address_nickname:address_nickname,
            address_phone:address_phone,
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
          }
        })
      }
    })
  }
  delete=()=>{
    const{address_id,token}= this.state;
    let code
    wx.login({
      success:res=>{
        Taro.request({
          url: "http://localhost:8090/address/deleteAddress",
          data: {
            address_id:address_id,
            address_openId:res.code,
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
          }
        })
      }
    })
  }



  render() {
    const {address_address,address_label,address_nickname,address_phone} = this.state
    return(
      <View>
       {/* <Label className='blue'>修改地址</Label>*/}

        <AtButton className='blue'>修改标签</AtButton>
        <Input className='white'  placeholder={address_label} onInput={this.updateLabel.bind(address_label)}/>
        <AtButton className='blue'>修改昵称</AtButton>
        <Input className='white'  placeholder={address_nickname} onInput={this.updateNickname.bind(address_nickname)}/>
        <AtButton className='blue'>修改电话</AtButton>
        <Input className='white'  placeholder={address_phone} onInput={this.updatePhone.bind(address_phone)}/>

        <AtButton className='xiugai' onClick={this.xiugai}>完成修改</AtButton>
        <AtButton className='shanchu' onCLick={this.delete}>删除地址</AtButton>

      </View>
    )
  }

}
export default Address_1;
