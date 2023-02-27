import { ref, provide, inject } from "vue";
import type { Ref } from "vue";

const useLoadingKey = Symbol("useLoadingKey");
type loadingState = {
  [key: symbol]: boolean;
  count: number;
  isLoading: Ref<boolean>;
};

export function useLoadingContainer(state: boolean = false) {
  const isLoading = ref<boolean>(state);
  provide(useLoadingKey, {
    count: 0,
    isLoading,
  });
  return isLoading;
}

export default function useLoading(state: boolean = true) {
  const loadingState = inject<loadingState>(useLoadingKey);
  if (!loadingState) return;
  const localStateKey = Symbol("localStateKey");
  const loading = () => {
    if (!loadingState[localStateKey]) {
      loadingState[localStateKey] = true;
      loadingState.count++;
      loadingState.isLoading.value = true;
    }
  };
  const done = () => {
    if (loadingState[localStateKey]) {
      delete loadingState[localStateKey];
      loadingState.count--;
      if (loadingState.count === 0) loadingState.isLoading.value = false;
    }
  };
  if (state) loading();
  return {
    loading,
    done,
  };
}
