import { Component } from 'react'
import {View, Text, Button} from '@tarojs/components'
import TabBar from "../common/tabBar";
import Taro from "@tarojs/taro";



class Order extends Component {
  gotoCart=()=>{
    Taro.navigateTo({
      url: './Cart'
    }).then(r => {
      console.log("跳转成功: ",r);
    })
  };
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {}

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <View><Text>Hello,查看订单</Text></View>
        <TabBar tabBarCurrent={2} />
        <Button onClick={this.gotoCart}>跳转</Button>
      </View>
    )
  }
}

export default Order

