import { Store } from "@/store/modules/auth"; // path to store file

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
