<template>
  <!-- im usermain -->
  <!-- model绑定	表单数据对象	
      rules绑定	表单验证规则  -->
  <div class="usermain">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm.userData"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      :disabled="!isShow"
    >
      <!-- label标签文本 -->
      <!-- propmodel model(数据)的键名。它可以是一个路径数组(例如 ['a', 'b', 0])。
       在定义了 validate、resetFields 的方法时，该属性是必填的 -->
      <el-form-item label="账号" prop="useraccount">
        <el-input v-model="ruleForm.userData.useraccount" disabled />
      </el-form-item>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="ruleForm.userData.username" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.userData.password" />
      </el-form-item>

      <el-form-item
        prop="email"
        label="邮箱"
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
        <el-input v-model="ruleForm.userData.email" />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.userData.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="地区" prop="region">
        <el-select v-model="ruleForm.userData.region" placeholder="请选择所来自地区">
          <el-option label="北京" value="beijing" />
          <el-option label="上海" value="shanghai" />
          <el-option label="广州" value="guangzhou" />
          <el-option label="深圳" value="shenzheng" />
        </el-select>
      </el-form-item>

      <el-form-item label="生日">
        <el-col :span="11">
          <el-form-item prop="birth">
            <el-date-picker
              v-model="ruleForm.userData.birth"
              type="date"
              label="Pick a date"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="星座" prop="star">
        <el-select v-model="ruleForm.userData.star" placeholder="请选择星座">
          <el-option label="狮子" value="shizi" />
          <el-option label="白羊" value="baiyang" />
          <el-option label="射手" value="sheshou" />
          <el-option label="双子" value="shuangzi" />
          <el-option label="水瓶" value="shuiping" />
          <el-option label="处女" value="chunv" />
          <el-option label="魔蝎" value="moxie" />
          <el-option label="天蝎" value="tianxie" />
          <el-option label="天秤" value="tianchen" />
          <el-option label="双鱼" value="shuangyu" />
          <el-option label="巨蟹" value="juxie" />
          <el-option label="金牛" value="jinniu" />
        </el-select>
      </el-form-item>

      <el-form-item label="职业" prop="job">
        <el-input v-model="ruleForm.userData.job" />
      </el-form-item>

      <el-form-item label="个性签名" prop="usercharacter">
        <el-input v-model="ruleForm.userData.usercharacter" type="textarea" />
      </el-form-item>

      <div v-show="isShow">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <button @click="cancelSubmit" style="margin-left: 10px; background-color: skyblue">取消</button>
        </el-form-item>
      </div>
    </el-form>

    <div v-show="!isShow">
      <button @click="isShow = !isShow" style="background-color: skyblue">修改个人信息</button>
    </div>
  </div>
</template>

<script  setup>
import { reactive, ref, onMounted, getCurrentInstance, toRaw } from 'vue';
// import { inject } from 'vue';
import { router } from '@/router/index';
//引入类型
// import type { FormInstance, FormRules } from 'element-plus';
// 🔷用到piana完成组件间通信
import { useStore } from '@/models/index';
import { storeToRefs } from 'pinia';
const store = useStore('publicInfo');
// 利用pinia的storeToRefs函数，将state中的数据变为了响应式的
storeToRefs(store); //对象解构赋值

const formSize = ref('default');

// 声明变量ruleFormRef并设置为FormInstance类型，模板中的元素通过ref属性绑定ruleFromRef即可被获取到
// const ruleFormRef = ref<FormInstance>();
const ruleFormRef = ref('');

let isShow = ref(false);
let obj;
const { proxy } = getCurrentInstance(); //记得要加{ }
// 数据
let ruleForm = reactive({
  userData: {
    useraccount: '', //账号
    username: '', //昵称
    password: '', //密码
    email: '', //邮箱
    sex: '', //性别
    region: '', //地区
    birth: '', //生日
    star: '', //星座
    job: '', //职业
    usercharacter: '', //个性签名
  },
});

// 校验规则
// const rules = reactive<FormRules>({
const rules = reactive({
  useraccount: [{ required: true }],
  username: [
    { required: true, message: '请输入昵称', trigger: 'change' },
    // trigger	验证逻辑的触发方式	'blur' | 'change'
    { min: 1, max: 15, message: '昵称长度只允许1-15个', trigger: 'blur' },
  ],
  // 关于密码的校验规则，需要协商
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 1, max: 20, message: '密码长度只允许1-20个', trigger: 'blur' },
  ],
  sex: [
    {
      required: false,
      message: '请选择一个性别',
      trigger: 'change',
    },
  ],
  region: [
    {
      required: false,
      message: '请选择地区',
      trigger: 'change',
    },
  ],

  birth: [
    {
      type: 'date',
      required: false,
      message: '请选择一个日期',
      trigger: 'change',
    },
  ],
  star: [
    {
      required: false,
      message: '请选择一个星座',
      trigger: 'change',
    },
  ],
  job: [{ required: false, message: '请输入职业', trigger: 'change' }],
  usercharacter: [{ required: false, message: '请输入个性简介', trigger: 'change' }],
});

// 函数
// 表单校验函数
const submitForm = async (formEl) => {
  if (!formEl) return;
  // validate对整个表单的内容进行验证。接收一个回调函数，或返回 Promise。
  await formEl.validate((valid, fields) => {
    //校验成功
    if (valid) {
      // 将proxy对象转换为普通对象
      obj = toRaw(ruleForm.userData);
      if (obj.sex == '男') {
        obj.sex = 1;
      } else {
        obj.sex = 0;
      }
      console.log('111', obj);
      // 发请求，获得修改后的表单数据
      const changeuserinfo = proxy.$api.changeUserInfo(obj);
      console.log('@@@changeuserinfo', changeuserinfo); //返回一个promise对象
      changeuserinfo.then(
        (value) => {
          console.log('@@@', value.data.data);
          ruleForm.userData = value.data.data;
          if (value.data.data.sex == 1) {
            ruleForm.userData.sex = '男';
          } else {
            ruleForm.userData.sex = '女';
          }
          console.log('保存修改成功!');
          // 刷新页面
          location.reload(); //这种方法有空白页闪一下的问题出现，后续再解决
        },
        (reason) => {},
      );
      //在方法体中的调用方法，刷新路由
      // refresh();
      /* router.replace({
        name: 'userInfo',
        params: {
          id: 1,
        },
      }); */
    } else {
      //校验失败
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const cancelSubmit = () => {
  // 刷新页面
  location.reload();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

onMounted(() => {
  // console.log(proxy);
  /* const publicinfo = useStore('publicInfo'); //所指定【pinia】模块的proxy对象
  console.log('pinia的publicinfo模块下的state中的useraccount是' + publicinfo.useraccount);
  // 发送请求，获得初始数据
  const getuserinfo = proxy.$api.getUserInfo(publicinfo.useraccount); */
  const getuserinfo = proxy.$api.getUserInfo({ useraccount: localStorage.getItem('currentuser') });
  console.log('发送获取个人信息请求所返回的是', getuserinfo); //Promise对象
  getuserinfo.then(
    (value) => {
      //value是该Promise对象的结果值
      // console.log('拿到的value是',value);
      // value.data拿到所返回信息 value.data.data拿到具体用户信息
      // ruleForm = value.data.data;错误，这样就会ruleForm数据就会失去响应式
      // 🔺正确的做法是将数据作为ruleForm的一个对象属性来修改，这样就不会丢失响应式
      ruleForm.userData = value.data.data;
      if (value.data.data.sex == 1) {
        ruleForm.userData.sex = '男';
      } else {
        ruleForm.userData.sex = '女';
      }
      // 🔷修改pinia中的username(昵称)和usercharacter(个性签名)
      store.username = value.data.data.username;
      store.usercharacter = value.data.data.usercharacter;
    },
    (reason) => {},
  );
});
</script>



<style scoped>
.usermain {
  width: 600px;
  margin: auto;
  background-color: #fff;
}
</style>