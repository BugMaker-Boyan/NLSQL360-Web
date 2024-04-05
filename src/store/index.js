 import { defineStore } from "pinia"


 export const useUserData = defineStore("user", {
    state: () => {
        return {
            username: undefined,
            access_token: undefined,
            token_type: undefined,
            email: undefined,
            llm_api_config_baseurl: undefined,
            llm_api_config_key: undefined
        }
    }
 })