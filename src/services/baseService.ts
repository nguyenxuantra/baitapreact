import { Axios } from "axios";


export class baseService{
    baseApi = new Axios({
        baseURL: import.meta.env.VITE_API_URL
    })
}