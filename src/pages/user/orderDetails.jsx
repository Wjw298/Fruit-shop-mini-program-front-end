import {Switch, Text, View} from "@tarojs/components";
import {getCurrentInstance} from '@tarojs/taro';
import {Component} from "react";
import {AtSwipeAction} from "taro-ui";

class OrderDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: '',
    }
  }

  $instance = getCurrentInstance()

  componentDidMount() {//只第一次打开页面渲染一次
    const order = JSON.parse(this.$instance.router.params.order)
    this.setState({
      order: order
    })
  }


  render() {
    const {order} = this.state
    return (
      <View>
        <View>{order.create_time}</View>
        <View>详细信息</View>
      </View>

    )
  }
}

export default OrderDetails
