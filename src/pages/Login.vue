<!-- <script setup>
import { RouterView } from 'vue-router';
/* import { defineComponent, ref } from 'vue';
import {
  useMessage
} from 'naive-ui'; */

</script> -->
<script>

import { defineComponent, reactive, ref } from 'vue';
// import { FormInstance } from 'element-plus'
export default defineComponent({
   components: {
       
  },
  setup() {
const ruleFormRef = ref('')

const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
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
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error('Two inputs don\'t match!'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
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
        <div class="Sign flex flex-column">
          <div class="non-select jss1 css-1vbrzl8">
            <h3 class="css-1eezi6a">
              Blog
            </h3>
          </div>
          <div class="ka-wrapper">
              <div class="ka-content">
                  <div class="jss2 css-ykq3zm">
                   <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
     :label-position="labelPosition"
  >
  <h4 class="non-select jss3 css-1pyxybg">登录</h4>
     <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age" />
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
 
    <el-form-item>
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
<style scoped>
.flex-column {
    flex-direction: column;
}
.flex {
    display: flex;
}
#root, .App, body, html {
    height: 100%;
    width: 100%;
}
.App {
    display: flex;
    flex-direction: column;
}
.Sign {
    height: 100%;
    width: 100%;
    padding-top: 8rem;
    align-items: center;
    justify-content: center;
}
.jss1 {
    padding: 1rem 2.5rem;
}

.non-select {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.css-1vbrzl8 {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: none;
}
.css-1eezi6a {
    margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.167;
    letter-spacing: 0em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(63, 81, 181);
}
.ka-content, .ka-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.ka-wrapper {
    height: 100%;
}
.css-ykq3zm {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}

.css-1pyxybg {
    margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    color: rgb(63, 81, 181);
}
.jss2 {
    padding: 0.5rem 3rem 2rem 3rem;
    background-color: #fafafa;
}
.jss3 {
    margin: 2rem 0;
    text-align: center;
}
.jss4 {
    margin-bottom: 1.5rem;
}
.css-i44wyl {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    min-width: 0px;
    padding: 0px;
    margin: 0px;
    border: 0px;
    vertical-align: top;
}
.css-uadgdw.Mui-error {
    color: rgb(211, 47, 47);
}
.css-uadgdw {
    color: rgb(117, 117, 117);
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    padding: 0px;
    display: block;
    transform-origin: left top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 133%;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: translate(0px, -1.5px) scale(0.75);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

}
.css-sp68t1.Mui-error {
    color: rgb(211, 47, 47);
}
.css-135qv08 {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    color: rgb(0, 0, 0);
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
}
label + .css-135qv08 {
    margin-top: 16px;
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
</style>
