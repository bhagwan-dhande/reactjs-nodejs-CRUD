import axios from 'axios';
import {Redirect} from 'react-router-dom';
import * as GeneralFunctions from '../src/utils/GeneralFunctions'
export const serverRequest = async (obj) => {
    let headers = {};
    let authorization = localStorage.getItem("authorization");
    if (authorization) headers["Authorization"] = authorization;
    try {
        if (obj.params) {
            for (let param in obj.params) {
                if (
                    typeof obj.params[param] === "undefined" ||
                    obj.params[param] === null
                ) {
                    delete obj.params[param];
                }
            }
        }
        const response = await axios.create({
            baseURL: process.env.REACT_APP_SERVER_URL,
            headers: headers,
        })(obj);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                GeneralFunctions.clearFullLocalStorage();
                <Redirect to="login" />
            }
            if (error.response.data && error.response.data.message) {
                throw Error(error.response.data.message);
            }
        } else {
            throw Error("Server error.");
        }
        throw Error("Internet error.");
    }
};
