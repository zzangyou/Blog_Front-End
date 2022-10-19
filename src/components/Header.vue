<script setup></script>
<template>
  <div class="header">
    <NPageHeader>
      <!-- 是个Demo，可以随意更改，更改后请把这行多余的代码删掉 -->
      <template #title>
        <a href="#" style="text-decoration: none; color: inherit">Anyway.FM</a>
      </template>
      <template #subtitle> 让你的听觉更懂视觉 </template>
      <template #avatar>
        <NAvatar src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg" />
      </template>
      <template #extra>
        <NSpace>
          <NButton>催更</NButton>
        </NSpace>
      </template>
    </NPageHeader>
  </div>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
}
</style>
