<!-- <script setup>
import { RouterView } from 'vue-router';
/* import { defineComponent, ref } from 'vue';
import {
  useMessage
} from 'naive-ui'; */

</script> -->
<script>
import { defineComponent, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { PersonCircle,LockClosed } from '@vicons/ionicons5'
export default defineComponent({
   components: {
    // eslint-disable-next-line vue/no-unused-components
  PersonCircle,
  LockClosed
  },
  setup() {
   const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      userid: null,
      password: null,
      
    });
    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.password && modelRef.value.password.startsWith(value) && modelRef.value.password.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }

    const rules = {
      userid: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('需要填写账户');
            } 
            return true;
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input']
        }
      ]
    };
    return {
      PersonCircle,
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
        }
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('验证成功');
          } else {
            console.log(errors);
            message.error('验证失败');
          }
        });
      }
    };
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
                    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-column">
                     <h4 class="non-select jss3 css-1pyxybg">注册</h4>
    <n-form-item path="userid" label="账号">
      <span class="logo-box">
          <n-icon size="30" :depth="3" class="logo">
    <PersonCircle />
  </n-icon>
      </span>
       <n-popover trigger="hover" :overlap="overlap" placement="bottom-end">
    <template #trigger>
      <n-input  v-model:value="model.userid" @keydown.enter.prevent on-focus="changeInput"/>
    </template>
    <span>请填写此字段</span>
  </n-popover>
      

    </n-form-item>
    <n-form-item path="password" label="密码">
            <span class="logo-box">
          <n-icon size="27" :depth="3" class="logo">
    <LockClosed />
  </n-icon>
      </span>
       <n-popover trigger="hover" :overlap="overlap" placement="bottom-end">
    <template #trigger>
<n-input
        v-model:value="model.password"
        type="password"
        @input="handlePasswordInput"
        @keydown.enter.prevent
      />
    </template>
    <span>请填写此字段</span>
  </n-popover>
      
    </n-form-item>
    <n-form-item
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="重复密码"
    >
      <span class="logo-box">
          <n-icon size="27" :depth="3" class="logo">
    <LockClosed />
  </n-icon>
      </span>
      <n-input
        v-model:value="model.reenteredPassword"
        :disabled="!model.password"
        type="password"
        @keydown.enter.prevent
      />
    </n-form-item>
    <div class="flex flex-column flex-center">
      <div class="flex" style="margin-bottom: 1rem;">
<router-link style="margin-right: 0.5rem;" class="css-1uop71e" active-class="active" to="/login">
<button class="css-qqvxpj" style="color:#3F51B5">返回登录</button></router-link>
<router-link style="margin-right: 0.5rem;margin-left: 1.7rem;" class="css-1uop71e" active-class="active" to="/">
<button class="css-r8ryou" style="color:#fff;background-color: #3F51B5;margin-left: .575rem;">注册</button>
</router-link>
    </div>
    </div>
    

  </n-form>

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
