import { apiUrl } from "../shared/constants";
import useSWR from "swr";

const fetcher = (...args: any) => fetch(args).then(res => res.json());

export const sendMessageToLlm = (message: string) => {
    const {data: resData, error: isErrorRes, isLoading: isLoadingRes} = useSWR(`${apiUrl}/ask?q=${message}`, fetcher);

    return {
        resData,
        isErrorRes,
        isLoadingRes
    };
}