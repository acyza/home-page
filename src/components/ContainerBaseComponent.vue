<template>
  <div class="root">
    <div class="container">
      <CardComponent
        v-for="(_data, index) of data"
        :key="index"
        :update-time="
          typeof _data === 'object' && updateTimeProp
            ? (_data as any)[updateTimeProp] : undefined"
      >
        <slot
          v-bind="
            typeof _data == 'string'
              ? { toString: () => _data.toString() }
              : _data
          "
        />
      </CardComponent>
    </div>
    <a class="more" href="more" v-if="props.more">more</a>
  </div>
</template>
<style scoped>
.root {
  display: flex;
}
.more {
  text-decoration: none;
  color: #fff;
}
.container {
  width: 100%;
}
</style>

<script lang="ts" setup>
import { defineProps } from "vue";
import CardComponent from "./CardComponent.vue";
const props = defineProps({
  more: String,
  data: Array,
  updateTimeProp: String,
});
</script>
