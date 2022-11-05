<!-- <script setup>
import { RouterView } from 'vue-router';
/* import { defineComponent, ref } from 'vue';
import {
  useMessage
} from 'naive-ui'; */

</script> -->
<script>

import { defineComponent, reactive, ref } from 'vue';

import 'animate.css'
// import { FormInstance } from 'element-plus'
export default defineComponent({
   components: {
    
  },
  setup() {
const ruleFormRef = ref('')
// 账号验证
const checkAge = (rule, value, callback) => {
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
// 密码验证
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

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})
// 表单验证规则
const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})
// 表单提交触发事件
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 登陆成功后，存储token
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// 清空表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const labelPosition = ref('top')
return{
    checkAge,
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
        <div class="Sign flex">
          <div class="imgdiv flex">
            <h3 class="blog animate__animated animate__bounceIn" >Hello! Friend</h3>
            <router-link style="margin-right: 0.5rem;" class="css-1uop71e" active-class="active" to="/register">
             <button  class="css-qqvxpj toregbtn" style="color:#3F51B5">注册</button></router-link>
               <img src="../assets/images/111122.png" alt="" class="img">
          </div>
          <div class="ka-wrapper animate__animated animate__backInDown">
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
        <h4 class="non-select jss3 css-1pyxybg">登录</h4>
        <el-form-item label="账号" prop="age">
      <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
         <Avatar />
       </el-icon>
          </span>
         <el-input v-model.number="ruleForm.age"  class="inputDeep" size="large" >
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
 
    <el-form-item style="margin-top:10px">
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button>
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

.logo-box{
  padding: 2px 0 0 0;
}
.Sign {
    position: absolute;
    left: 20rem;
    /* height: 100%; */
    /* width: 100%; */
    padding-top: 7rem;
    align-items: center;
    justify-content: center;
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
  left:5.3rem;
  color: #fff;
  font-size: 2.7rem;
  z-index: 1;
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
.toregbtn{
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
