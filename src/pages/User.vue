<template>
  <!-- im usermain -->
  <!-- model绑定	表单数据对象	
      rules绑定	表单验证规则  -->
  <div class="usermain">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
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
      <el-form-item label="昵称" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>

      <el-form-item label="账号" prop="useraccount">
        <el-input v-model="ruleForm.useraccount" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
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
        <el-input v-model="ruleForm.email" />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="地区" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择所来自地区">
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
              v-model="ruleForm.birth"
              type="date"
              label="Pick a date"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="星座" prop="star">
        <el-select v-model="ruleForm.star" placeholder="请选择星座">
          <el-option label="狮子" value="shizi" />
          <el-option label="白羊" value="baiyang" />
          <el-option label="射手" value="sheshou" />
          <el-option label="双子" value="shuangzi" />
          <el-option label="水瓶" value="shuiping" />
          <el-option label="处女" value="chunv" />
          <el-option label="魔蝎" value="moxie" />
          <el-option label="天蝎" value="tianxie" />
          <el-option label="天秤" value="tianchen" />
          <el-option label="双鱼" value="sheshou" />
          <el-option label="巨蟹" value="juxie" />
          <el-option label="金牛" value="jinniu" />
        </el-select>
      </el-form-item>

      <el-form-item label="职业" prop="job">
        <el-input v-model="ruleForm.job" />
      </el-form-item>

      <el-form-item label="个性简介" prop="character">
        <el-input v-model="ruleForm.character" type="textarea" />
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
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';
//引入类型
// import type { FormInstance, FormRules } from 'element-plus';

const formSize = ref('default');

// 声明变量ruleFormRef并设置为FormInstance类型，模板中的元素通过ref属性绑定ruleFromRef即可被获取到
// const ruleFormRef = ref<FormInstance>();
const ruleFormRef = ref('');

let isShow = ref(false);
const { proxy } = getCurrentInstance(); //记得要加{ }
// 数据
const ruleForm = reactive({
  username: '', //昵称
  useraccount: '', //账号
  password: '', //密码
  email: '', //邮箱
  sex: '', //性别
  region: '', //地区
  birth: '', //生日
  star: '', //星座
  job: '', //职业
  character: '', //个性简介
});

// 校验规则
// const rules = reactive<FormRules>({
const rules = reactive({
  username: [
    { required: false, message: '请输入昵称', trigger: 'change' },
    // trigger	验证逻辑的触发方式	'blur' | 'change'
    { min: 1, max: 8, message: '昵称长度只允许1-8个', trigger: 'blur' },
  ],
  useraccount: [
    { required: true, message: '请输入账号', trigger: 'change' },
    { min: 1, max: 8, message: '账号长度只允许1-8个', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 1, max: 8, message: '账号长度只允许1-8个', trigger: 'blur' },
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
  character: [{ required: false, message: '请输入个性简介', trigger: 'change' }],
});

// 函数
// 表单校验函数
const submitForm = async (formEl) => {
  if (!formEl) return;
  // validate对整个表单的内容进行验证。接收一个回调函数，或返回 Promise。
  await formEl.validate((valid, fields) => {
    //校验成功
    if (valid) {
      console.log('保存修改成功!');
      // 发请求
      const userInfo = proxy.$api.changeUserInfo(ruleForm);
      console.log('@@@', userInfo); //返回一个promise对象
      userInfo.then(
        (value) => {
          console.log('@@@', value.data);
          // ruleForm = value.data.data;
        },
        (reason) => {},
      );
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

const cancelSubmit = () => {};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

onMounted(() => {
  console.log(proxy);
  // 发送请求，获得初始数据
  proxy.$api.changeUserInfo(ruleForm);
});
</script>



<style scoped>
.usermain {
  width: 600px;
  margin: auto;
  background-color: #fff;
}
</style>