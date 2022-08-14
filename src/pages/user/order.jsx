import {Text, View} from "@tarojs/components";
import {Component} from 'react'
import Taro from "@tarojs/taro";
import {getCurrentInstance} from '@tarojs/taro';
import {AtListItem} from "taro-ui";


class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  $instance = getCurrentInstance()

  componentDidMount() {//只第一次打开页面渲染一次
    const orders = JSON.parse(this.$instance.router.params.orders)
    this.setState({
      orders: orders
    })
  }
  gotoOrderDetails=(order)=>{
    Taro.navigateTo({
      url: './orderDetails?order=' + JSON.stringify(order)
    }).then()
  }

  render() {
    const {orders} = this.state
    const orderList = orders.map((order, index) => {
      return (
        <View>{
          order.status===3||order.status===4
          ?<AtListItem
            arrow='right'
            note={order.order_details}
            title={order.statusS}
            extraText={order.order_appraise}
            onClick={e => {
              e.stopPropagation;
              this.gotoOrderDetails(order)}}/>
            :<View></View>
        }</View>
      )
    })
    return (
      <View>订单列表</View>,
        orderList
    )
  }

}

export default Order;
