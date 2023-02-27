<template>
  <div class="card">
    <slot />
    <div class="update-time" v-if="updateTime">
      最后修改时间：{{ dayjs(updateTime).format("YYYY-MM-DD") }}
    </div>
  </div>
</template>
<style scoped>
.card {
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px #b2b2b2;
  transition: 300ms linear;
  position: relative;
}
.card:hover {
  box-shadow: 1px 1px 5px 1px #b2b2b2;
  --hover: #;
}
.update-time {
  right: 10px;
  bottom: 10px;
  position: absolute;
  font-size: 10pt;
  color: #5b5b5b;
}
</style>
<script lang="ts" setup>
import { defineProps } from "vue";
import dayjs from "dayjs";

defineProps({
  updateTime: String,
});
</script>
