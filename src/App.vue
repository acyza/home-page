<script setup lang="ts">
import { ref } from "vue";
import type { Directive } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import Config from "./router/config";
import info from "../info";

const activeTarget = ref<HTMLSpanElement>();
const hoverTarget = ref<HTMLSpanElement>();
const vItem: Directive<HTMLSpanElement, boolean> = {
  updated(el, bind) {
    if (bind.value) activeTarget.value = el;
  },
};

const header = ref<HTMLHeadElement>();

function getRoutePath() {
  return location.href.match(/(?<=router=)[^&]*/)?.[0];
}

const toPath = getRoutePath();
if (typeof toPath === "string")
  useRouter().push({
    path: toPath,
  });
</script>

<template>
  <div
    :style="{
      height:
        header && header.offsetHeight ? `${header.offsetHeight}px` : undefined,
    }"
  ></div>
  <header ref="header">
    <div class="wrapper">
      <img src="./assets/logo.svg" class="logo" />
      <nav>
        <RouterLink
          v-for="(item, index) of Config"
          :key="index"
          :to="item.path.replace(/\/\:.*$/, '')"
          v-slot="{ isActive }"
        >
          <span
            v-item="isActive"
            @mouseenter="hoverTarget = $event.target as any"
            @mouseleave="hoverTarget = undefined"
            :class="{ navIsActive: isActive }"
          >
            {{ item.name }}
          </span>
        </RouterLink>
        <div
          class="underline"
          :style="{
            left: `${(hoverTarget || activeTarget)?.offsetLeft}px`,
            width: `${(hoverTarget || activeTarget)?.offsetWidth}px`,
          }"
        ></div>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer>&copy;{{ info.username }} 2023</footer>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 600px;
  z-index: 1000;
}
.logo {
  width: 30px;
  height: 30px;
  margin: 0 30px;
}
.wrapper {
  width: 100%;
  background-color: #484848d2;
  display: flex;
  align-items: center;
}
nav {
  position: relative;
  * {
    --hover-color: #87afff;
    color: #fff;
    font-size: 16pt;
    text-decoration: none;
    padding: 5px;
    margin: 3px;
    line-height: 30px;
    display: inline-block;
    box-sizing: content-box;
  }
}
.navIsActive {
  --color: #87afff;
  color: var(--color);
}
.underline {
  height: 2px;
  background-color: var(--hover-color);
  position: absolute;
  padding: 0;
  margin: 0;
  bottom: 0;
  transition: 300ms;
}
footer {
  text-align: center;
  background-color: #858585;
  font-size: 12pt;
  padding: 6px;
  color: #2a2a2a;
}
</style>
