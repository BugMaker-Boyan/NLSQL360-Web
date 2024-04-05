import service from "./request.js"
import { useUserData } from '../store/index'

const userData = useUserData()

/**
 * User API
 */

const userRegister = async (username, password, email) => {
    const data = new URLSearchParams()
    data.append("username", username)
    data.append("password", password)
    data.append("email", email)
    
    return service.post("/user/", data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}


const userLogin = async (username, password) => {
    const data = new URLSearchParams()
    data.append("username", username)
    data.append("password", password)
    
    return service.post("/auth/token", data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

const getUserInfo = async () => {
    return service.get("/user/", {
        headers: {
            'Accept': 'application/json',
            'Authorization': userData.token_type + " " + userData.access_token
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}


const modifyUserEmail = async (user_email) => {
    return service.put("/user/email", {"user_email": user_email}, {
        headers: {
            'Accept': 'application/json',
            'Authorization': userData.token_type + " " + userData.access_token,
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

const modifyUserLLMAPIConfig = async (api_baseurl, api_key) => {
    return service.put("/user/llm_api_config", {"llm_api_config_baseurl": api_baseurl, "llm_api_config_key": api_key}, {
        headers: {
            'Accept': 'application/json',
            'Authorization': userData.token_type + " " + userData.access_token,
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

const modifyUserPassword = async (user_password) => {
    return service.put("/user/password", {"user_password": user_password}, {
        headers: {
            'Accept': 'application/json',
            'Authorization': userData.token_type + " " + userData.access_token,
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

export { userRegister, userLogin, getUserInfo, modifyUserEmail, modifyUserLLMAPIConfig, modifyUserPassword }
