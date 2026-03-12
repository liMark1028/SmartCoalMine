<!--
 * @title: 登入页面
 * @Autor: li yu mo
 * @Date: 2025-04-18 13:19:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-29 17:29:30
 * @FilePath: \ahla-tkxt-web\src\views\login\index.vue
-->

<template>
  <div class="loginMain">
    <div class="theme">
      <h1>智能巡检安全管理系统</h1>
      <div class="title"></div>
      <div class="inputDiv">
        <div>
          <img src="@/assets/Image/Login/username.png" class="img1" />
          <span>用 户 名：</span>
          <input v-model="username" type="text" />
        </div>
        <div>
          <img src="@/assets/Image/Login/password.png" class="img2" />
          <span>密 &nbsp; &nbsp; &nbsp;码：</span>
          <input v-model="password" type="password" @keyup.enter="loginButton" />
        </div>
        <button class="loginButton" @click="loginButton">登录</button>
      </div>
    </div>
    <div class="gridding"></div>
    <div class="round"></div>
  </div>
</template>

<script setup>
import { login } from '@/api'
import '@/utils/md5'
const router = useRouter()
const username = ref('') // 用户名
const password = ref('') // 密码

/**
 * @description: 登录方法
 * @return {*}
 * @Date: 2025-4-18 11:57:18
 * @author: li yu mo
 */
const loginButton = async () => {
  // 判断用户名 / 密码是否为空
  if (username.value === null || username.value === '') {
    ElMessage.error('请输入用户名')
    return
  }
  if (password.value === null || password.value === '') {
    ElMessage.error('请输入密码')
    return
  }
  // 对用户名进行正则验证 (用户名只能为字母或数字，以字母开头，长度为 5 - 20)
  // const patrnUser = /^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/
  // if (!patrnUser.test(username.value)) {
  //   ElMessage.error('用户名必须要以字母开头，只能输入5-20位，可以为数字或字母')
  //   return
  // }
  // 在注册时需要判断输入的密码长度为 20 位以下
  // if (password.value.length > 20) {
  //   ElMessage.error('请输入正确的用户名或密码')
  //   return
  // }
  // 调用登录接口
  password.value = md5(JSON.parse(JSON.stringify(password.value)))

  const res = await login(username.value, password.value)
  if (res.code === 200) {
    ElMessage.success('登录成功')
    // 存储 token 到本地
    localStorage.setItem('token', res.data)
    localStorage.setItem('auth', username.value)
    router.replace('/mainWindow')
  } else if (res.code === 500) {
    ElMessage.error('用户名或密码错误')
  } else {
    ElMessage.error('系统异常，请稍后重试')
  }
}
</script>

<style lang="scss" scoped>
.loginMain {
  width: 100%;
  height: 100%;
  background: url('@/assets/Image/Login/background1.png');
  background-size: 100% 100%;

  .theme {
    width: 1496px;
    height: 614px;
    background: url('@/assets/Image/Login/theme.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    h1 {
      text-align: center;
      color: #fff;
      margin-top: 80px;
      font-size: 55px;
      font-family: 'fangsong';
    }

    .title {
      width: 214px;
      height: 4px;
      background: url('@/assets/Image/Login/title.png');
      background-size: 100% 100%;
      margin: auto;
    }
  }

  .gridding {
    width: 1912px;
    height: 213px;
    background: url('@/assets/Image/Login/gridding.png');
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .round {
    width: 462px;
    height: 14px;
    background: url('@/assets/Image/Login/round.png');
    background-size: 100% 100%;
    position: absolute;
    left: 730px;
    top: 180px;
  }

  .inputDiv {
    position: absolute;
    top: 85px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 0;
    width: 510px;
    height: 280px;

    div {
      width: 496px;
      height: 50px;
      background: url('@/assets/Image/Login/username_password.png');
      background-size: 100% 100%;
      margin-bottom: 20px;

      .img1 {
        width: 22px;
        height: 24px;
        margin: 10px 10px 0 20px;
      }

      .img2 {
        width: 17px;
        height: 19px;
        margin: 13px 13px 0 20px;
      }

      span {
        display: inline-block;
        font-size: 18px;
        width: 90px;
        color: #029fda;
      }

      input {
        width: 281px;
        height: 32px;
        border: 0px;
        box-sizing: border-box;
        font-size: 18px;
        outline: none;
        background: rgba(0, 0, 0, 0);
        color: #fff;
      }
    }

    .loginButton {
      width: 496px;
      height: 56px;
      font-size: 27px;
      cursor: pointer;
      background: url('@/assets/Image/Login/login.png');
      background-size: 100% 100%;
      color: #fff;
      margin-top: 20px;
      border: 0;
    }
  }
}
</style>
