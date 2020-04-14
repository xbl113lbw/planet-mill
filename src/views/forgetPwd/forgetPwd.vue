<template>
    <div id="forgetPwd">
        <div class="title">重置密码</div>
        <div class="form">
            <label>
                <input type="text" placeholder="请输入手机号码">
            </label>
            <label>
                <input type="text" placeholder="请输入验证码">
                <button>获取验证码</button>
            </label>
            <label>
                <input type="password" placeholder="请输入密码">
            </label>
            <label>
                <input type="password" placeholder="请再次输入密码">
            </label>
        </div>
        <button class="submit">重置密码</button>
    </div>
</template>

<script>
    export default {
        name: "forgetPwd"
    }
</script>

<style lang="scss" scoped>
    #forgetPwd {
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
                display: flex;
                align-items: center;
                justify-content: space-between;
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

                button {
                    padding: 10px 20px;
                    font-size: 24px;
                    font-weight: 600;
                    border-radius: 32px;
                    white-space: nowrap;
                    color: rgba(192, 81, 255, 1);
                    background: transparent;
                    border: 2px solid rgba(192, 81, 255, 1);
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
    }
</style>
