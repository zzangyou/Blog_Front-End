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

      <el-form-item label="账号" prop="userid">
        <el-input v-model="ruleForm.userid" />
      </el-form-item>

      <!-- <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item> -->

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

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
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
          <el-form-item prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              type="date"
              label="Pick a date"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <!-- <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>

        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              v-model="ruleForm.date2"
              label="Pick a time"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-form-item>
        </el-col> -->
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
      <!-- 
      <el-form-item label="Instant delivery" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>

      <el-form-item label="Activity type" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->

      <el-form-item label="个性简介" prop="introduction">
        <el-input v-model="ruleForm.introduction" type="textarea" />
      </el-form-item>

      <div v-if="isShow">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </div>
      <!-- 为什么不用v-if不替换就会闪退？？？ -->
      <div v-if="!isShow">
        <button @click="isShow = !isShow">修改</button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
//引入类型
import type { FormInstance, FormRules } from 'element-plus';

const formSize = ref('default');

// 声明变量ruleFormRef并设置为FormInstance类型，模板中的元素通过ref属性绑定ruleFromRef即可被获取到
const ruleFormRef = ref<FormInstance>();
/* onMounted(() => {
  console.log('###', ruleFormRef);
}); */
const isShow = ref(false);
// 数据
const ruleForm = reactive({
  username: '', //昵称
  userid: '', //账号
  // password: '', //密码
  email: '', //邮箱
  gender: '', //性别
  region: '', //地区
  birthday: '', //生日
  // date2: '',
  star: '', //星座
  // delivery: false,
  // type: [],
  introduction: '', //个性简介
});

// 校验规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入昵称', trigger: 'change' },
    // trigger	验证逻辑的触发方式	'blur' | 'change'
    { min: 1, max: 8, message: '昵称长度只允许1-8个', trigger: 'blur' },
  ],
  userid: [
    { required: true, message: '请输入账号', trigger: 'change' },
    { min: 1, max: 8, message: '账号长度只允许1-8个', trigger: 'blur' },
  ],
  /* password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 1, max: 8, message: '账号长度只允许1-8个', trigger: 'blur' },
  ], */
  gender: [
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

  birthday: [
    {
      type: 'date',
      required: false,
      message: '请选择一个日期',
      trigger: 'change',
    },
  ],
  /* date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ], */
  /*  star: [
    {
      required: false,
      message: '请选择一个星座',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ], */

  introduction: [{ required: false, message: '请输入个性简介', trigger: 'blur' }],
});

// 表单校验函数
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    //校验成功
    if (valid) {
      console.log('submit!');
    } else {
      //校验失败
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<style scoped>
.usermain {
  width: 600px;
  margin: auto;
  background-color: #fff;
}
</style>