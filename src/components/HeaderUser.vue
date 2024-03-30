<script setup>
import { ElNotification } from 'element-plus';
import { ref } from 'vue'

const dialogLoginVisible = ref(false)
const dialogRegisterVisible = ref(false)

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

const handleCommand = (command) => {
    switch (command) {
        case "login":
            dialogLoginVisible.value = true
            break
        case "register":
            dialogRegisterVisible.value = true
            break
        case "exit":
            console.log("exit")
            break
        default:
            break
    }
}

const loginSubmit = () => {
    ElNotification({
        title: "Login Success",
        message: "This is a success message",
        type: "success"
    })
}

const registerSubmit = () => {
    ElNotification({
        title: "Register error",
        message: "This is a error message",
        type: "error"
    })
}

const userInfo = ref("None")

</script>

<template>
    <el-dropdown @command="handleCommand">
        <span class="icon-span">
            <el-icon size="25px" color="#ddd"><UserFilled /></el-icon>
            <el-icon size="25px" color="#ddd"><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="login">Login</el-dropdown-item>
                <el-dropdown-item command="register">Register</el-dropdown-item>
                <el-dropdown-item command="exit">Exit</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

    <span>User: {{ userInfo }}</span>
    
    <el-dialog v-model="dialogLoginVisible" title="User Login" width="300px" draggable>
        <el-form :model="loginFormData" label-position="top" label-width="auto">
            <el-form-item label="Username">
                <el-input v-model="loginFormData.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="loginFormData.password" show-password></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="loginSubmit">Login</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="dialogRegisterVisible" title="User Register" width="300px" draggable>
        <el-form :model="registerFormData" label-position="top" label-width="auto">
            <el-form-item label="Username">
                <el-input v-model="registerFormData.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="registerFormData.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password">
                <el-input v-model="registerFormData.confirmPassword" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="registerSubmit">Register</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped>

.icon-span {
    margin-right: 15px;
}

</style>