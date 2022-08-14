import {Component} from "react";
import {Text, View, Input, Button, Label} from "@tarojs/components";
import {getCurrentInstance} from "@tarojs/taro";
import {AtButton, AtList, AtListItem, AtSwipeAction} from "taro-ui"
import './address.css';
import Taro from "@tarojs/taro";

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: [],
    }
  }

  $instance = getCurrentInstance()

  componentDidMount() {//只第一次打开页面渲染一次
    const address = JSON.parse(this.$instance.router.params.address)
    this.setState({
      address: address
    })
  }

  handleClick = (add) => {
    Taro.navigateTo({
      url: './address_1?add=' + JSON.stringify(add)
    }).then()
  }
  gotoInsert=()=>{
    Taro.navigateTo({
      url: './gotoInsert'
    }).then()
  }

  render() {
    const {address} = this.state
    const content = address.map((add, index) => {
      return (
        <View>
          <AtListItem title={add.address_label} extraText={add.address_address} onClick={e => {
            e.stopPropagation;
            this.handleClick(add)
          }}/>
        </View>
      )
    })
    return (
      <View>
        我的地址
        {content}
        <View class="btn">
          <AtButton className='down' onClick={this.gotoInsert}>新增地址</AtButton>
        </View>
      </View>
    )
  }


}

export default Address;
