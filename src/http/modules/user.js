

import * as axios from "../axios";

export function findOrderByPay_type(url,params){
  return axios.get(url,params);
}
