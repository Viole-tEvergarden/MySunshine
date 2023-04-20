import axios from 'axios'

declare module 'axios' {
  interface IAxios {
    code: string
    msg: string
    [prop: string]: string;
  }
  export interface AxiosResponse<T = any> extends IAxios { }
}