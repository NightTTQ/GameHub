import { h, render } from "vue";
import type { AppContext, ComponentPublicInstance } from "vue";
import dialogConstructor from "@/components/utils/uploadProcess.vue";

const dialogInstance = new Map<
  ComponentPublicInstance<{ doClose: () => void }>,
  {
    options: any;
    callback: any;
    resolve: (res: any) => void;
    reject: (reason?: any) => void;
  }
>();

const initInstance = (
  props: any,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vnode = h(dialogConstructor, props);
  vnode.appContext = appContext;
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  return vnode.component;
};

const genContainer = () => {
  return document.createElement("div");
};

const showDialog = (options: any, appContext?: AppContext | null) => {
  const container = genContainer();
  // GC

  options.onAction = (action: any) => {};

  const instance = initInstance(options, container, appContext);
};

async function Dialog(
  options: any,
  appContext?: AppContext | null
): Promise<any> {
  return new Promise((resolve, reject) => {
    const vm = showDialog(options, appContext);
  });
}
Dialog.close = () => {
  dialogInstance.forEach((_, vm) => {
    vm.doClose();
  });
  dialogInstance.clear();
};

export default Dialog;
