

import * as axios from "../axios";

export function findHospital(url,params){
    return axios.get(url,params);
}
