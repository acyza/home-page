<!--路由信息
  2
  /blog/:path*
  博客
-->
<template>
  <div class="root">
    <CardComponent v-if="$route.params.path">
      <span ref="contentRef" v-html="content"></span>
    </CardComponent>
    <ContainerBaseComponent
      class="list"
      v-else
      :data="info"
      update-time-prop="updateTime"
      v-slot="{ path, title }: any"
    >
      <a
        class="link"
        href="javascript:void(0)"
        @click="
          $router.push({
            path: `/blog/${path}`,
          })
        "
        v-html="renderMd(title, `/doc/blog/${path}/..`)"
      ></a>
    </ContainerBaseComponent>
  </div>
</template>

<style lang="scss" scoped>
.list {
  width: 500px;
}
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import useLoading from "@/utils/useLoading";
import { useRouter } from "vue-router";
import ContainerBaseComponent from "@/components/ContainerBaseComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import renderMd from "@/markdownItIntance";

type infoType = {
  path: string;
  title: string;
  updateTime: string;
};

const isLoading = useLoading(false);
const router = useRouter();
const info = ref<infoType[]>([]);
async function requestInfo() {
  isLoading?.loading();
  const response = await fetch("doc/blogInfo.json");
  if (!response.ok) throw "request blogInfo error";
  const text = await response.text();
  const _info: infoType[] = JSON.parse(text);
  _info.sort((a, b) => {
    return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
  });
  info.value = _info;
  isLoading?.done();
}
requestInfo().catch(console.error);

//blog detail
const content = ref();
const contentRef = ref<HTMLSpanElement>();
let abortController: AbortController | undefined = undefined;

router.afterEach(async (to) => {
  content.value = "";
  abortController?.abort();
  abortController = new AbortController();
  if (!to.params.path) return;
  isLoading?.loading();
  const path = `/doc/blog/${
    typeof to.params.path === "string"
      ? to.params.path
      : to.params.path?.join("/")
  }`;
  const response = await fetch(path, {
    signal: abortController.signal,
  });
  content.value = renderMd(await response.text(), path + "/..");
  await nextTick();
  const links = contentRef.value?.querySelectorAll("a");
  for (const link of links || [])
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (!/^[^/]+:\/\/[^/]+\/doc\/.*/.test(link.href)) {
        open(link.href, "_target");
        return;
      }
      router.push({
        path: link.href.replace(/^[^/]+:\/\/[^/]+\/doc/, ""),
      });
    });
  isLoading?.done();
});
</script>
