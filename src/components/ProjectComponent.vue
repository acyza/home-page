<template>
  <div class="root">
    <ContainerBaseComponent
      class="list"
      :data="info"
      v-slot="{ name, link, img }: any"
    >
      <div class="content">
        <img class="screenshot" :src="`/img/${img}`" />
        <div class="info">
          <a class="link" :href="link" target="_blank">{{ name }}</a>
        </div>
      </div>
    </ContainerBaseComponent>
  </div>
</template>

<style lang="scss" scoped>
.root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list {
  width: 500px;
}
.screenshot {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 1px 1px #d1d1d1;
  display: inline-block;
}
.content {
  display: flex;
  align-items: center;
}
.info {
  padding-left: 20px;
  font-size: 20pt;
}
</style>

<script lang="ts" setup>
import { ref } from "vue";
import ContainerBaseComponent from "./ContainerBaseComponent.vue";
import useLoading from "@/utils/useLoading";
const info = ref([]);
const isLoading = useLoading();
async function requestInfo() {
  const response = await fetch("doc/projects.json");
  if (!response.ok) throw "request projectInfo error";
  const text = await response.text();
  isLoading?.done();
  info.value = JSON.parse(text);
}
requestInfo().catch(console.error);
</script>
