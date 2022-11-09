<script>

import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from '@/models/index'
import { getCurrentInstance } from '@vue/runtime-core';
// import { FormInstance } from 'element-plus'
export default defineComponent({
   components: {

  },
  setup() {
const ruleFormRef = ref('')
const {proxy}=getCurrentInstance()
const router =useRouter()
// 账号验证
const checkUseraccount = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字'))
    } else {
       var reg=new RegExp(/^.{5,20}$/)
      if (!reg.test(value.toString())) {
      
        callback(new Error('用户账号长度应为5至20字符'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 发送邮箱验证码
const sendVerificationCode =()=>{
    
     let code = '';
      //设置长度，这里看需求，我这里设置了6
      let codeLength = 6;
      //设置随机字符
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      //循环codeLength 我设置的4就是循环4次
      for (let i = 0; i < codeLength; i++) {
          //设置随机数范围,这设置为0 ~ 36
          let index = Math.floor(Math.random() * 9);
          //字符串拼接 将每次随机的字符 进行拼接
          code += random[index];
      }
      //将拼接好的字符串赋值给展示的code
      proxy.code = code;
    //  调用发送邮箱验证码接口
    async()=>{
        
    }
  }


const ruleForm = reactive({
  pass: '',
  checkPass: '',
  useraccount: '',
  email:'',
  checkVerificationCode:''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur',required: true}],
  checkPass: [{ validator: validatePass2, trigger: 'blur',required: true, }],
  useraccount: [{ validator: checkUseraccount, trigger: 'blur',required: true }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const labelPosition = ref('top')
return{
    checkUseraccount,
    validatePass,
    validatePass2,
    rules,
    submitForm,
    resetForm,
    ruleForm,
    labelPosition


}
  }
});
</script>
<template>

<div id="root">
   <div class="App" style="min-height: 754px;">
       <div class="Sign flex" style="padding-top:4rem">
         <div class="imgdiv flex">
           <h3 class="blog animate__animated animate__bounceIn">Welcome Home</h3>
                <router-link style="margin-right: 0.5rem;" class="css-1uop71e" active-class="active" to="/login">
            <button  class="css-qqvxpj tologinbtn" style="color:#3F51B5">登录</button></router-link>
              <img src="../assets/images/111122.png" alt="" class="img">
              
         </div>
         <div class="ka-wrapper  animate__animated animate__backInUp">
             <div class="ka-content">
                 <div class="jss2 css-ykq3zm">
                  <el-form
                      ref="ruleFormRef"
                      :model="ruleForm"
                      status-icon
                      :rules="rules"
                      label-width="120px"
                      class="demo-ruleForm flex flex-column"
                       :label-position="labelPosition" >
    <h4 class="non-select jss3 css-1pyxybg">注册</h4>
           <el-form-item label="账号" prop="useraccount">
      <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
         <Avatar />
       </el-icon>
          </span>
         <el-input v-model.number="ruleForm.useraccount"  :prefix-icon="Search" class="inputDeep" size="large" >
         </el-input>
      </div>
       </el-form-item>
       <el-form-item label="密码" prop="pass">
               <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
         <Lock />
       </el-icon>
          </span>
         <el-input v-model="ruleForm.pass" type="password" autocomplete="off" class="inputDeep" />
      </div>

       </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
                   <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
         <Unlock />
       </el-icon>
          </span>
           <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off" class="inputDeep"
      />
      </div>
    </el-form-item>
        <el-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
             <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
          <Promotion />
       </el-icon>
          </span>
       <el-input v-model="ruleForm.email" class="inputDeep" />
       
      </div>
     
    </el-form-item>
            <el-form-item label="验证码" prop="checkVerificationCode">
                   <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
         <ChatDotSquare />
       </el-icon>
          </span>
           <el-input
        v-model="ruleForm.checkVerificationCode"
        type="text"
        autocomplete="off" class="inputDeep VertificationCode" 
      />     
       <el-button text type="primary" @click="sendVerificationCode">发送验证码</el-button>
      </div>
    </el-form-item>
     <el-form-item style="margin-top:10px">
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
      </el-form>
      <pre>{{ JSON.stringify(model, null, 2) }}
          </pre>
                  </div>
              </div>
          </div>
        </div>
        </div>
</div>
</template>
<style lang="scss" scoped>

.Sign {
    position: absolute;
    left: 20rem;
    /* height: 100%; */
    /* width: 100%; */
    padding-top: 7rem;
    align-items: center;
    justify-content: center;
}
.logo-box{
  padding: 2px 0 0 0;
}
.logo{
  margin: 0 4px;
}
button:hover{
  background: #ecf0f2;
}
:deep .el-form-item__content{
  justify-content: space-between;
}
:deep .el-form{
width: 15rem;
}
.imgdiv{
  /* height: 100%; */
left: 480px;
top: 247px;
/* width: 405px; */
opacity: 1;
border-radius: 10px;
box-shadow: 0px 10px 30px 0px rgba(135, 186, 210, 0.4);
}
.img{
  height: 486px;
  opacity: 0.95;
  margin-left: -10px;
}
.blog{
  position: absolute;
  top: 16rem;
  left:3.2rem;
  color: #fff;
  z-index: 1;
  font-size: 2.7rem;
  font-family: Roboto, Helvetica, Arial, sans-serif;

}
.tologinbtn{
  position: absolute;
  z-index: 1;
  top: 22rem;
  left: 9.8rem;
  font-weight: bold;
}
.inputDeep {
  :deep(.el-input__wrapper) {
    padding: 1px 10px;
    margin-top: -11px;
    background-color: #fafafa;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    .el-input__inner {
      cursor: default !important;
      margin-bottom: -10px;
      height: 45px;
    }
  }
}
.border{
  padding-bottom: -5px;
  border: transparent;
  border-bottom: 2.5px solid #212f80;
}
</style>
