import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async(args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    //start loading
    api.dispatch(startLoading());
    await sleep();

    const result = await customBaseQuery(args, api, extraOptions);
    //stop loading
    api.dispatch(stopLoading());

    if(result.error) {
        const {status, data} = result.error;
        console.log(result.error);
        
        switch (status) {
            case 400:
                    toast.error(data.title);
                break;
            case 401:
                    toast.error(data.title);
                break;
            default:
                break;
        }
    }

    return result;
}