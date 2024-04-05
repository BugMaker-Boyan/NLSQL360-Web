<script setup>
import { ElNotification } from 'element-plus';
import { ref } from 'vue'
import { userRegister, userLogin, getUserInfo, modifyUserEmail, modifyUserLLMAPIConfig, modifyUserPassword } from '../request/userapi'
import { useUserData } from '../store/index'

const userData = useUserData()

const dialogLoginVisible = ref(false)
const dialogRegisterVisible = ref(false)
const dialogInfoVisible = ref(false)
const dialogModifyPwdVisible = ref(false)

const loginFormData = ref({
    username: "",
    password: ""
})

const registerFormData = ref({
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
})

const userInfoFormData = ref({
    username: userData.username,
    email: userData.email,
    llm_api_config_baseurl: userData.llm_api_config_baseurl,
    llm_api_config_key: userData.llm_api_config_key
})

const userPasswordFormData = ref({
    username: userData.username,
    newPassword: ""
})

const hasLogin = ref(false)

const handleCommand = (command) => {
    switch (command) {
        case "login":
            dialogLoginVisible.value = true
            break
        case "register":
            dialogRegisterVisible.value = true
            break
        case "exit":
            userData.$patch({
                username: undefined,
                access_token: undefined,
                token_type: undefined
            })
            hasLogin.value = false
            ElNotification({
                title: "Notify",
                message: "Exit Success",
                type: "success",
                position: 'bottom-right',
            })
            break
        case "info":
            dialogInfoVisible.value = true
            updateGlobalUserData()
            break
        case "modifypwd":
            dialogModifyPwdVisible.value = true
            break
        default:
            break
    }
}

const loginSubmit = () => {
    userLogin(loginFormData.value.username, loginFormData.value.password).then(
        data => {
            userData.$patch({
                access_token: data.access_token,
                token_type: data.token_type
            })
            updateGlobalUserData()
            dialogLoginVisible.value = false
            hasLogin.value = true
            ElNotification({
                title: "Notify",
                message: "Login Success",
                type: "success",
                position: 'bottom-right',
            })
        }
    ).catch(
        error => {
            ElNotification({
                title: "Register error",
                message: error.response.data.detail,
                type: "error",
                position: 'bottom-right',
            })
        }
    )
}

const registerSubmit = () => {
    userRegister(registerFormData.value.username,
        registerFormData.value.password,
        registerFormData.value.email).then(data => {
            ElNotification({
                title: "Notify",
                message: "Register Success",
                type: "success",
                position: 'bottom-right',
            })
        }).catch(error => {
            ElNotification({
                title: "Notify",
                message: error.response.data.detail,
                type: "error",
                position: 'bottom-right',
            })
        })
}

const updateGlobalUserData = () => {
    getUserInfo().then(
        data => {
            userData.$patch({
                username: data.username,
                email: data.email,
                llm_api_config_baseurl: data.llm_api_config_baseurl,
                llm_api_config_key: data.llm_api_config_key
            })

            // we also need to update relative form data
            userInfoFormData.value.username = userData.username
            userInfoFormData.value.email = userData.email
            userInfoFormData.value.llm_api_config_baseurl = userData.llm_api_config_baseurl
            userInfoFormData.value.llm_api_config_key = userData.llm_api_config_key

            userPasswordFormData.value.username = userData.username
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

const modifyPassword = () => {
    modifyUserPassword(userPasswordFormData.value.newPassword).then(
        data => {
            ElNotification({
                title: "Notify",
                message: "Modify Password Success",
                type: "success",
                position: 'bottom-right',
            })
        }
    ).then(
        error => {
            ElNotification({
                title: "Notify",
                message: "Modify Password Error",
                type: "error",
                position: 'bottom-right',
            })
        }
    )
}

const modifyUserInfo = () => {
    modifyUserEmail(userInfoFormData.value.email).then(
        data => {
            modifyUserLLMAPIConfig(userInfoFormData.value.llm_api_config_baseurl, userInfoFormData.value.llm_api_config_key).then(
                data => {
                    updateGlobalUserData()
                    ElNotification({
                        title: "Notify",
                        message: "Modify User Info Success",
                        type: "success",
                        position: 'bottom-right',
                    })
                }
            )
        }
    ).catch(
        error => {
            ElNotification({
                title: "Notify",
                message: "Modify User Info Error",
                type: "error",
                position: 'bottom-right',
            })
        }
    )
}


</script>

<template>
    <el-dropdown @command="handleCommand">
        <span class="icon-span">
            <el-icon size="25px" color="#ddd">
                <UserFilled />
            </el-icon>
            <el-icon size="25px" color="#ddd">
                <CaretBottom />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu v-if="hasLogin">
                <el-dropdown-item command="info">Modify Info</el-dropdown-item>
                <el-dropdown-item command="modifypwd">Modify Password</el-dropdown-item>
                <el-dropdown-item command="exit">Exit</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu v-else>
                <el-dropdown-item command="login">Login</el-dropdown-item>
                <el-dropdown-item command="register">Register</el-dropdown-item>
                <el-dropdown-item command="exit">Exit</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

    <span v-if="userData.username">Username: {{ userData.username }}</span>

    <el-dialog v-model="dialogLoginVisible" title="User Login" width="400px" draggable center>
        <el-form :model="loginFormData" label-position="right" label-width="auto" @submit.prevent>
            <el-form-item label="Username">
                <el-input v-model="loginFormData.username" clearable placeholder="Input your username">
                    <template #prefix>
                        <el-icon><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="loginFormData.password" show-password clearable placeholder="Input your password">
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-row justify="center">
            <el-col :span="6">
                <el-button type="primary" @click="loginSubmit">Login</el-button>
            </el-col>
            <el-col :span="6"><el-button @click="dialogLoginVisible = false">Cancel</el-button></el-col>
        </el-row>
    </el-dialog>

    <el-dialog v-model="dialogRegisterVisible" title="User Register" width="400px" draggable center>
        <el-form :model="registerFormData" label-position="right" label-width="auto" @submit.prevent>
            <el-form-item label="Username">
                <el-input v-model="registerFormData.username" clearable placeholder="Input your username">
                    <template #prefix>
                        <el-icon><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="registerFormData.password" show-password clearable placeholder="Input your password">
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Confirm Password">
                <el-input v-model="registerFormData.confirmPassword" show-password clearable placeholder="Confirm your password">
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="registerFormData.email" show-password clearable placeholder="Confirm your password">
                    <template #prefix>
                        <el-icon><Notification /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-row justify="center">
            <el-col :span="6"><el-button type="primary" @click="registerSubmit">Register</el-button></el-col>
            <el-col :span="6"><el-button @click="dialogRegisterVisible = false">Cancel</el-button></el-col>
        </el-row>
    </el-dialog>

    <el-dialog v-model="dialogInfoVisible" title="User Info" width="400px" draggable center>
        <el-form :model="userInfoFormData" label-position="right" label-width="auto" @submit.prevent>
            <el-form-item label="Username">
                <el-input v-model="userInfoFormData.username" disabled>
                    <template #prefix>
                        <el-icon><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="userInfoFormData.email" clearable placeholder="Input your email">
                    <template #prefix>
                        <el-icon><Notification /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="LLM API Baseurl">
                <el-input v-model="userInfoFormData.llm_api_config_baseurl" clearable placeholder="Input your LLM API baseurl">
                    <template #prefix>
                        <el-icon><Link /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="LLM API Key">
                <el-input v-model="userInfoFormData.llm_api_config_key" clearable placeholder="Input your LLM API Key">
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-row justify="center">
            <el-col :span="6"><el-button type="primary" @click="modifyUserInfo">Modify</el-button></el-col>
            <el-col :span="6"><el-button type="default" @click="dialogInfoVisible = false">Cancel</el-button></el-col>
        </el-row>
    </el-dialog>

    <el-dialog v-model="dialogModifyPwdVisible" title="Modify Password" width="400px" draggable center>
        <el-form :model="userPasswordFormData" label-position="right" label-width="auto" @submit.prevent>
            <el-form-item label="Username">
                <el-input v-model="userPasswordFormData.username" disabled>
                    <template #prefix>
                        <el-icon><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="New Password">
                <el-input v-model="userPasswordFormData.newPassword" clearable placeholder="Input new password">
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-row justify="center">
            <el-col :span="6"><el-button type="primary" @click="modifyPassword">Modify</el-button></el-col>
            <el-col :span="6"><el-button type="default" @click="dialogModifyPwdVisible = false">Cancel</el-button></el-col>
        </el-row>
    </el-dialog>
</template>

<style scoped>
.icon-span {
    margin-right: 15px;
}
</style>../request/user_api