<template>
  <div class="container" v-html="markdown.render(markdownContent)"></div>
</template>

<style scoped>
.container {
  overflow: scroll;
}
</style>

<script lang="ts" setup>
import { ref, watch, defineProps } from "vue";
import markdownIt from "markdown-it";
import useLoading from "../utils/useLoading";
const props = defineProps({
  url: String,
  data: String,
});
const isLoading = useLoading();
const markdown = new markdownIt();
const markdownContent = ref("");

let abortController: AbortController;
let previousUrl: string | undefined = undefined;

async function requestData(url: string) {
  const response = await fetch(url, {
    signal: abortController.signal,
  });
  if (response.ok) return await response.text();
  throw "Request Markdown Content Error";
}
watch(
  [props],
  () => {
    if (props.url === previousUrl) return;
    abortController?.abort();
    abortController = new AbortController();
    if (props.data) markdownContent.value = props.data;
    else if (props.url) {
      const request = requestData(props.url);
      request
        .then((val) => {
          isLoading?.done();
          markdownContent.value = val;
          previousUrl = undefined;
        })
        .catch(() => {
          previousUrl = undefined;
        });
    }
  },
  {
    immediate: true,
  }
);
</script>
