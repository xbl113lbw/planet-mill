<template>
    <div id="forgetPwd">
        <div class="title">重置密码</div>
        <div class="form">
            <label>
                <input type="text" placeholder="请输入手机号码" v-model="phone">
            </label>
            <label>
                <input type="text" placeholder="请输入验证码" v-model="verification_code">
                <button id="getCodeBtn" @click="getCode">{{btnText}}</button>
            </label>
            <label>
                <input type="password" placeholder="请输入密码" v-model="password">
            </label>
            <label>
                <input type="password" placeholder="请再次输入密码" v-model="re_password">
            </label>
        </div>
        <button class="submit" @click="submit">重置密码</button>
    </div>
</template>

<script>
    export default {
        name: "forgetPwd",
        data() {
            return {
                phone: "",
                password: "",
                re_password: "",
                verification_key: "",
                verification_code: "",
                codeFlag: true,
                btnText: "获取验证码"
            }
        },
        methods: {
            // 获取验证码
            getCode() {
                if (!this.codeFlag) {
                    return;
                }
                if (!this.phone) {
                    this.$toast("请输入手机号或邮箱");
                    return;
                }
                this.codeFlag = false;
                let params = {
                    phone: this.phone,
                };
                let t;
                this.ajax.post("v1/verification_codes", params).then((res) => {
                    if (res.data.code === 200) {
                        this.$toast("发送成功");
                        this.verification_key = res.data.data.key;
                        let num = 60;
                        t = setInterval(() => {
                            this.btnText = `${num}秒`;
                            num--;
                            if (num <= 0) {
                                this.codeFlag = true;
                                this.btnText = "获取验证码";
                                clearInterval(t);
                            }
                        }, 1000);
                    } else {
                        clearInterval(t);
                        this.codeFlag = true;
                        this.btnText = "获取验证码";
                    }
                })
            },
            submit() {
                if (!this.password) {
                    this.$toast("请输入密码");
                    return;
                }
                if (!this.re_password && this.re_password !== this.password) {
                    this.$toast("两次密码不一致");
                    return;
                }
                if (!this.verification_code) {
                    this.$toast("请输入验证码");
                    return;
                }
                let obj = {
                    phone: this.phone,
                    password: this.password,
                    re_password: this.re_password,
                    verification_key: this.verification_key,
                    verification_code: this.verification_code,
                };
                this.ajax.post("v1/reset", obj).then((res) => {
                    if (res.data.code === 200) {
                        this.$router.push({path: "/login"});
                    }
                })
            }
        }
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
