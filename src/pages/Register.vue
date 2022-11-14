/* eslint-disable vue/no-parsing-error */
<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/models/index';
import { getCurrentInstance } from '@vue/runtime-core';
import { ElMessageBox } from 'element-plus';
// import { FormInstance } from 'element-plus'
export default defineComponent({
  components: {},
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
      }, 1000);
    };
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
// 清空表单数据
const resetFields=()=>{
ruleForm.pass='',
ruleForm.useraccount='',
ruleForm.checkPass='',
ruleForm.email='',
ruleForm.checkVerificationCode=''
}
const isActive=ref(true)
const count=ref(0)
// 发送邮箱验证码
const sendVerificationCode =()=>{
    let reg =/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if(reg.test(proxy.ruleForm.email)){
      let proxyCode = '';

      //设置长度，这里看需求，我这里设置了6
      let codeLength = 6;
      //设置随机字符
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      //循环codeLength 我设置的6就是循环6次
      for (let i = 0; i < codeLength; i++) {

          //设置随机数范围,这设置为0 ~ 36
          let index = Math.floor(Math.random() * 9);
          //字符串拼接 将每次随机的字符 进行拼接
          proxyCode += random[index];
      }
      console.log(proxyCode);
      //将拼接好的字符串赋值给展示的code
      proxy.proxyCode = proxyCode;
    //  调用发送邮箱验证码接口
        proxy.$api.sendcaptcha(ruleForm.email,proxy.proxyCode).then(res=>{
          console.log(res);
      if(res.data.code===100000){
        //  发送验证码后进入倒计时 使用了节流的方法
       const timer=null;
       const TIME_COUNT = 60;
       if (!proxy.timer) {
        proxy.count = TIME_COUNT;
        proxy.isActive = false;
        proxy.timer = setInterval(() => {
          if (proxy.count > 0 && proxy.count <= TIME_COUNT) {
            proxy.count--;
          } else {
            proxy.isActive = true;
            clearInterval(proxy.timer);
            proxy.timer = null;
          }
        }, 1000);
        
    }else{
       ElMessage({ message: '已发送验证码,请稍后再试',type: 'warning',})  
        }
    }
        }).catch(err=>{
         ElMessage.error({ message: err})
        })
        
  }else{
     ElMessage({ message: '系统异常，请稍后再试',type: 'warning',})
     return false;
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  useraccount: '',
  email:'',
  checkVerificationCode:'',
  username:''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur',required: true}],
  checkPass: [{ validator: validatePass2, trigger: 'blur',required: true, }],
  useraccount: [{ validator: checkUseraccount, trigger: 'blur',required: true }]
})
// 表单提交触发事件
const submitForm = () => {    
     proxy.$api.register(ruleForm).then(res=>{
      if(res.data.code===100000){
        console.log(res.data);
        if(ruleForm.checkVerificationCode===proxy.proxyCode){
      // 注册后跳转路由
      router.push({
        path: '/login'
      })
      ElMessage({ message: '注册成功',type: 'success',})
        }else{
            ElMessage({ message: '验证码错误',type: 'warning',})
        }

    }else if(res.data.code===100002){
        ElMessage.error({ message: '该账号已被注册，请更改账号内容'})
        return false
    }
     else {
      resetFields()
       ElMessage({ message: '注册失败,请稍后再试',type: 'warning',})
      return false
    }}
     )
     }


// 清空表单
const resetForm = () => {
   resetFields()
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
    labelPosition,
    sendVerificationCode,
    isActive,
    count
}
  }
});
</script>
<template>

<div id="root">
   <div class="App" style="min-height: 754px;">
       <div class="Sign flex" style="padding-top:1.5rem">
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
         <el-input v-model.number="ruleForm.useraccount"   class="inputDeep" size="large" >
         </el-input>
      </div>
       </el-form-item>
        <el-form-item label="用户名" prop="username" :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度应为3-10个字符', trigger: 'blur' } ]">
      <div class="flex border">
            <span style="margin-right:5px;text-align:center">
         <el-icon :size="20" :color="color" >
         <User/>
       </el-icon>
          </span>
         <el-input v-model="ruleForm.username"  class="inputDeep" size="large" >
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
          message: '请输入邮箱',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱',
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
       <el-button text type="primary" @click="sendVerificationCode">
       <span v-show="isActive">发送验证码</span>
       <span v-show="!isActive">{{count}}s</span>
       </el-button>
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
.logo-box {
  padding: 2px 0 0 0;
}
.logo {
  margin: 0 4px;
}
button:hover {
  background: #ecf0f2;
}
:deep .el-form-item__content {
  justify-content: space-between;
}
:deep .el-form {
  width: 15rem;
}
.imgdiv {
  /* height: 100%; */
  left: 480px;
  top: 247px;
  /* width: 405px; */
  opacity: 1;
  border-radius: 10px;
  box-shadow: 0px 10px 30px 0px rgba(135, 186, 210, 0.4);
}
.img {
  height: 486px;
  opacity: 0.95;
  margin-left: -10px;
}
.blog {
  position: absolute;
  top: 16rem;
  left: 3.2rem;
  color: #fff;
  z-index: 1;
  font-size: 2.7rem;
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
.tologinbtn {
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
.border {
  padding-bottom: -5px;
  border: transparent;
  border-bottom: 2.5px solid #212f80;
}
</style>
