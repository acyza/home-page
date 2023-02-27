<!-- 路由信息
  0
  /
  主页
-->
<script setup lang="ts">
import info from "../../info";
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped>
.root {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.root > * {
  opacity: 0;
  animation: showInfo 1s forwards;
}
span {
  font-size: 20pt;
  font-weight: 900;
  padding: 10px;
  color: #565656;
}

span:nth-child(1) {
  animation-delay: 300ms;
}

span:nth-child(2) {
  animation-delay: 1s;
}

.root > div {
  animation-delay: 1700ms;
}
.links > * {
  display: inline-block;
  padding: 10px 50px;
  margin: 10px 20px;
  font-weight: 500;
  border: 1px solid #7b7b7b65;
  border-radius: 5px;
  text-decoration: none;
  color: #000;
  transition: 300ms;
}

.links > *:hover {
  border-color: #008cff;
  color: #008cff;
}

@keyframes showInfo {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <div class="root">
    <span>你好，我是{{ info.username }}</span>
    <span>一名{{ info.job }}</span>
    <div class="links">
      <RouterLink to="work">作品</RouterLink>
      <RouterLink to="blog">博客</RouterLink>
      <br />
      <RouterLink to="project">项目</RouterLink>
      <RouterLink to="about">关于</RouterLink>
    </div>
  </div>
</template>
