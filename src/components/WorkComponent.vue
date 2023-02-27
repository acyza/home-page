<template>
  <div class="root">
    <ContainerBaseComponent
      class="list"
      update-time-prop="updateTime"
      :data="info"
      v-slot="{ name }: any"
    >
      <div class="content">
        <img class="screenshot" :src="`/doc/work/${name}/screenshot.png`" />
        <div class="info">
          <a
            class="link"
            :href="`/preview.html#/doc/work/${name}/index.html`"
            target="_blank"
          >
            {{ name }}
          </a>
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
type infoType = {
  name: string;
  updateTime: string;
};

const info = ref<infoType[]>([]);
let isloading = useLoading(true);

async function requestInfo() {
  const response = await fetch("doc/workInfo.json");
  if (!response.ok) throw "request workInfo error";
  const text = await response.text();
  isloading?.done();
  const _info: infoType[] = JSON.parse(text);
  _info.sort(
    (a, b) =>
      new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
  );
  info.value = _info;
}
requestInfo().catch(console.error);
</script>
