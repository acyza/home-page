<template>
  <template v-if="loadingComponent">
    <component :is="loadingComponent" v-show="!isLoading" />
  </template>
  <div v-if="!loadingComponent || isLoading" class="container">
    <div id="loading">
      <svg class="loading" view-box="0 0 100 100">
        <circle cx="50" cy="50" r="45"></circle>
      </svg>
    </div>
    <span class="tip" v-if="timeout">
      GithubPage国内网速不稳定，如果长时间未加载出内容可以尝试刷新页面
    </span>
    <span class="tip" v-else>loading...</span>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 300px;
  background-color: #ffffffc4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.loading {
  width: 100px;
  height: 100px;
  fill: none;
  * {
    animation: loading 1s infinite;
    stroke: #fbc000;
    stroke-width: 10px;
    stroke-dashoffset: 60;
    stroke-dasharray: 0 282;
  }
}
.tip {
  font-size: 20pt;
  margin-top: 6px;
  color: #fbc000;
}
@keyframes loading {
  0% {
    stroke-dasharray: 0 282;
  }
  50% {
    stroke-dasharray: 282 0;
    stroke-dashoffset: 60;
  }
  100% {
    stroke-dashoffset: -222;
  }
}
</style>

<script lang="ts" setup>
import { defineProps, watch, ref, shallowRef, unref } from "vue";
import type { Component } from "vue";
import { useLoadingContainer } from "../utils/useLoading";

type getComponent = () => Promise<{ default: Component }>;

const isLoading = useLoadingContainer();

const props = defineProps<{
  component: getComponent;
}>();

const loadingComponent = shallowRef<Component>();
const timeout = ref(false);
let timeoutId: any;

let cancel: Function | undefined;

watch(
  [props],
  () => {
    let isCancel = false;
    onLoading();
    if (cancel) cancel();
    cancel = () => {
      isCancel = true;
    };
    loadingComponent.value = undefined;
    if (props.component) {
      onLoading();
      props
        .component()
        .then((val) => {
          if (isCancel) return;
          loadingComponent.value = val.default;
        })
        .catch(() => {
          if (isCancel) return;
          onError();
        });
    }
  },
  {
    immediate: true,
  }
);

watch([loadingComponent, isLoading], () => {
  if (unref(loadingComponent) && !unref(isLoading)) onFinish();
});

function onLoading() {
  isLoading.value = false;
  if (timeoutId !== undefined) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    timeout.value = true;
  }, 3000);
}

function onError() {
  console.error("loading error");
}

function onFinish() {
  if (timeoutId !== undefined) clearTimeout(timeoutId);
  timeout.value = false;
}
</script>
