<!--
 * @title: 右上角的个人信息 
 * @Autor: li yu mo
 * @Date: 2025-04-14 17:51:21
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-28 17:50:35
 * @FilePath: \ahla-tkxt-web\src\layout\Header\userPage\index.vue
-->
<template>
  <div class="user_class">
    <div class="user_l">
      <div class="areaName" v-if="route.path !== '/index'">
        <img src="@/assets/image/global/kuangIcon.png" /> {{ kqname }}
      </div>
    </div>
    <div class="user_r">
      <img class="userImg" src="@/assets/image/global/user.png" />
      <div class="userInfo">
        <div>{{ AuthUser }}</div>
        <el-icon @click="userInfoText" class="userInfo_text"><ArrowDown /></el-icon>
      </div>
    </div>
    <div class="userInfo_dialog" v-if="infoDialog">
      <li>数据管理</li>
      <li @click="userInfo">用户信息</li>
      <li @click="changePw">修改密码</li>
      <li @click="quit">退出登录</li>
    </div>
    <!-- 用户信息 -->
    <div class="showDataInfo dialog" v-if="showDataInfo">
      <div class="header">
        <div>用户信息</div>
        <div class="close" @click="cancel_user"></div>
      </div>
      <div class="content">
        <el-form ref="userRef" :model="user_form" :rules="user_rules" label-width="120px">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="user_form.username" maxlength="30" disabled />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="user_form.phone" maxlength="11" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="人员姓名" prop="nickname">
            <el-input v-model="user_form.nickname" maxlength="30" placeholder="请输入人员姓名" />
          </el-form-item>
          <!-- <el-form-item label="用户密码" prop="password">
            <el-input
              v-model="user_form.password"
              placeholder="请输入用户密码"
              type="password"
              maxlength="20"
              show-password
            />
          </el-form-item> -->
          <el-form-item label="用户性别">
            <el-radio-group v-model="user_form.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="dialog_footer">
            <el-button @click="cancel_user">取 消</el-button>
            <el-button type="primary" @click="submitForm_user">确 定</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="showChangePw dialog" v-if="showChangePw">
      <div class="header">
        <div>修改密码</div>
        <div class="close" @click="cancelPw"></div>
      </div>
      <div class="content">
        <el-form ref="pwRef" :model="pw_form" :rules="pw_rules" label-width="120px">
          <el-form-item label="原登录密码" prop="oldPassword">
            <el-input
              v-model="pw_form.oldPassword"
              placeholder="请输入原登录密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="新登录密码" prop="newPassword">
            <el-input
              v-model="pw_form.newPassword"
              placeholder="请输入新登录密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPw">
            <el-input
              v-model="pw_form.confirmPw"
              placeholder="请确认新密码"
              type="password"
              show-password
            />
          </el-form-item>
          <div class="dialog_footer">
            <el-button @click="cancelPw">取 消</el-button>
            <el-button type="primary" @click="submitForm_password">确 定</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 退出登入 -->
    <div class="quit dialog" v-if="showQuit">
      <div class="header">
        <div>提示</div>
        <div class="close" @click="cancelQuit"></div>
      </div>
      <div class="content">
        <img src="@/assets/image/global/userPage/plaint.png" />
        <div>将要退出登录，是否确定？</div>
      </div>
      <div class="dialog_footer">
        <el-button @click="cancelQuit">取 消</el-button>
        <el-button type="primary" @click="quit_submitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { authUser, authUserPage, updatePassword } from '@/api'
import { useGlobalStore } from '@/stores/index'
import '@/utils/md5'
const { proxy } = getCurrentInstance()
const router = useRouter()
const infoDialog = ref(false) //个人弹窗
const showDataInfo = ref(false) //用户信息
const showChangePw = ref(false) //修改密码
const showQuit = ref(false) //退出登入
const AuthUser = ref('') //用户名称
const userId = ref('') //用户Id

const route = useRoute()
const store = useGlobalStore()
// 获取矿区名称
const kqname = computed(() => store.kqData.kqname)
const pw_form = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPw: undefined,
})
const user_form = reactive({
  nickname: undefined,
  username: undefined,

  phone: undefined,
  sex: undefined,
})
const equalToNew = (rule, value, callback) => {
  if (pw_form.oldPassword == value) {
    callback(new Error('两次输入的密码一致'))
  } else {
    callback()
  }
}
const equalToPw = (rule, value, callback) => {
  if (pw_form.newPassword !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 用户信息
const user_rules = ref({
  nickname: [
    { required: true, message: '人员姓名不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '人员姓名长度必须介于 2 和 20 之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '用户密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
})
// 修改密码
const pw_rules = ref({
  oldPassword: [{ required: true, message: '原登入密码不能为空', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '新登入密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { required: true, validator: equalToNew, trigger: 'blur' },
  ],
  confirmPw: [
    { required: true, message: '确认新密码不能为空', trigger: 'blur' },
    { required: true, validator: equalToPw, trigger: 'blur' },
  ],
})
// 打开个人弹窗
const userInfoText = () => {
  infoDialog.value = !infoDialog.value
}
// 用户信息
const userInfo = () => {
  showDataInfo.value = true
  showChangePw.value = false
  showQuit.value = false
  userList()
}
// 关闭用户信息弹窗
const cancel_user = () => {
  showDataInfo.value = false
  user_form.nickname = undefined

  user_form.phone = undefined
  user_form.sex = undefined
}
// 修改用户信息
const submitForm_user = () => {
  proxy.$refs['userRef'].validate(async (valid) => {
    if (valid) {
      const params = {
        ...user_form,
        id: userId.value,
      }
      const res = await authUser(params)
      if (res.code === 200) {
        ElMessage.success('修改成功')
        cancel_user()
      }
    }
  })
}
// 打开修改密码弹窗
const changePw = () => {
  showChangePw.value = true
  showDataInfo.value = false
  showQuit.value = false
}
// 关闭修改密码弹窗
const cancelPw = () => {
  showChangePw.value = false
  pw_form.oldPassword = undefined
  pw_form.newPassword = undefined
  pw_form.confirmPw = undefined
}
// 修改密码功能
const submitForm_password = () => {
  proxy.$refs['pwRef'].validate(async (valid) => {
    if (valid) {
      const params = {
        oldPassword: md5(JSON.parse(JSON.stringify(pw_form.oldPassword))),
        newPassword: md5(JSON.parse(JSON.stringify(pw_form.newPassword))),
        userId: userId.value,
      }
      const res = await updatePassword(params)
      if (res.code === 200) {
        ElMessage.success('修改成功')
        cancelPw()
      }
    }
  })
}
// 退出登入弹窗
const quit = () => {
  showQuit.value = true
  showDataInfo.value = false
  showChangePw.value = false
}
// 关闭退出登入弹窗
const cancelQuit = () => {
  showQuit.value = false
}
// 退出登入方法
const quit_submitForm = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('auth')
  router.replace('/login')
}
//用户列表
const userList = async () => {
  const params = {
    username: AuthUser.value,
  }
  const res = await authUserPage(params)
  userId.value = res.data.list[0].id
  user_form.nickname = res.data.list[0].nickname
  user_form.username = res.data.list[0].username
  user_form.phone = res.data.list[0].phone
  user_form.sex = res.data.list[0].sex
}
//
onMounted(async () => {
  const auth = localStorage.getItem('auth')
  AuthUser.value = auth
  //用户列表
  userList()
})
</script>

<style lang="scss" scoped>
.user_class {
  width: 50%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
  .user_l {
    .areaName {
      font-family: 'YouSheBiaoTiHei';
      font-size: 16px;
      img {
        width: 27px;
        height: 29px;
        vertical-align: bottom;
      }
    }
  }
  .user_r {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .userImg {
      width: 25px;
      height: 25px;
      vertical-align: bottom;
    }
    .userInfo {
      display: flex;
      align-items: flex-end;
      cursor: pointer;
      margin-left: 12px;
    }
    .userInfo_text {
      margin-left: 5px;
    }
  }
}
.userInfo_dialog {
  pointer-events: all;
  width: 100px;
  height: 150px;
  background: url('@/assets/image/global/userPage/content_bg.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 40px;
  right: 23px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  li {
    cursor: pointer;
  }
}
// 相同信息
.dialog {
  height: 382px;
  width: 731px;
  position: fixed;
  top: 300px;
  left: 592px;
  background: url('@/assets/image/global/userPage/info_bg.png') no-repeat;
  background-size: 100% 100%;
  .header {
    margin: 12px;
    display: flex;
    justify-content: space-between;
    div:nth-child(1) {
      font-family: 'AlibabaPuHuiTi_2_85_Bold';
      font-size: 24px;
      text-shadow: 0 0 5px #008edf, 0 0 10px #008edf, 0 0 10px #008edf, 0 0 10px #008edf;
    }
    .close {
      width: 27px;
      height: 27px;
      background: url('@/assets/image/global/userPage/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .content {
    color: #606266;
    .el-form-item {
      margin-bottom: 22px;
    }
    :deep(.el-form-item__label) {
      font-size: 18px;
      color: #fff;
      line-height: 30px;
    }
    :deep(.el-form-item__content) {
      line-height: 30px;
    }
    .el-input {
      height: 30px;
      font-size: 14px;
    }
    :deep(.el-input__inner) {
      width: 568px;
      height: 33px;
      line-height: 33px;
      border: none;
      font-family: 'AlibabaPuHuiTi_2_35_Thin';
      font-size: 14px;
      color: #fff;
      background: url('@/assets/image/global/userPage/input.png') no-repeat;
      background-size: 100% 100% !important;
      padding-left: 20px;
      padding-right: 30px;
      box-sizing: border-box;
    }
    :deep(.el-input__wrapper) {
      background: transparent;
      box-shadow: none;
    }
    :deep(.el-input__suffix) {
      position: relative;
      left: -30px;
    }
    :deep(.el-form-item__error) {
      left: 20px;
    }
  }
  // 弹框底部按钮样式
  .dialog_footer {
    margin-top: 2px;
    float: right;
    :deep(.el-button) {
      border: none;
      width: 80px;
      height: 31px;
      padding: 0;
      border-radius: 0;
      background: url('@/assets/image/global/userPage/unselected.png') no-repeat;
      background-size: 100% 100% !important;
      span {
        font-family: 'Alibaba-PuHuiTi-R';
        font-size: 14px;
        color: #fff;
      }
      &:hover {
        background: url('@/assets/image/global/userPage/selected.png') no-repeat;
        background-size: 100% 100% !important;
      }
    }
  }
}
// 用户信息
.showDataInfo {
  .content {
    margin-top: 40px;
    padding: 10px 20px;
  }
  .dialog_footer {
    margin-right: 18px;
  }
}
// 修改密码
.showChangePw {
  .content {
    padding: 30px 20px;
    margin-top: 40px;
  }
  .dialog_footer {
    margin: 8px 0 0 18px;
  }
}
// 退出登入
.quit {
  width: 552px;
  height: 223px;
  top: 400px;
  left: 700px;
  background: url('@/assets/image/global/userPage/puti_bg.png') no-repeat;
  .content {
    height: 124px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 22px;
    div {
      margin-left: 20px;
    }
  }
  .dialog_footer {
    margin-right: 15px;
  }
}
</style>
