<template>
    <div id="login">
        <div class="title">欢迎来到 cosmicplanet</div>
        <div class="form">
            <label>
                <input type="text" placeholder="请输入手机号码">
            </label>
            <label>
                <input type="password" placeholder="请输入密码">
            </label>
        </div>
        <button class="submit">登录</button>
        <div class="btnBox">
            <router-link to="/forgetPwd">忘记密码</router-link>
            <router-link to="/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style lang="scss" scoped>
    #login {
        min-height: 100vh;
        padding: 200px 80px 0;
        background: #2C244A;

        .title {
            margin-bottom: 170px;
            font-size: 60px;
            font-weight: bold;
            color: rgba(255, 255, 255, .6);
        }

        .form {
            margin-bottom: 170px;

            label {
                display: block;
                border-bottom: 1px solid rgba(255, 255, 255, .6);

                input {
                    width: 100%;
                    padding: 34px 0;
                    display: block;
                    font-size: 28px;
                    font-weight: 400;
                    color: #fff;
                    background: #2C244A;
                    outline: none;
                    border: none;
                }
            }
        }

        .submit {
            width: 100%;
            height: 85px;
            margin-bottom: 30px;
            font-size: 30px;
            font-weight: 500;
            border-radius: 5px;
            color: #fff;
            background: linear-gradient(90deg, rgba(167, 63, 226, 1) 0%, rgba(126, 42, 242, 1) 56%, rgba(97, 29, 232, 1) 100%);
        }

        .btnBox {
            display: flex;
            align-items: center;
            justify-content: space-between;

            a {
                font-size: 24px;
                font-weight: 500;
                color: #fff;

                &:first-child {
                    text-decoration: underline;
                }

                &:last-child {
                    color: #C051FF;
                }
            }
        }
    }
</style>
