import { Store as authStore } from "@/store/modules/auth";
import { Store as editionStore } from "@/store/modules/edition";

export type Store = authStore & editionStore;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
