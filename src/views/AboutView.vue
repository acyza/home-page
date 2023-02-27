<!-- 路由信息
  1000
  /about
  关于
-->
<template>
  <CardComponent class="about">
    <h2>关于</h2>
    <MarkdownComponent url="doc/ABOUT.md" />
  </CardComponent>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import MarkdownComponent from "@/components/MarkdownComponent.vue";
</script>
