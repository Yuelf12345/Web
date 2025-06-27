import MessageBox from "./MessageBox.vue";
import { createApp } from "vue";
export default function useModal(msg: string) {
  const app = createApp(MessageBox, {
    msg,
    onClose: () => {
      app.unmount();
      document.body.removeChild(container);
    },
  });
  const container = document.createElement("div");
  document.body.appendChild(container);
  app.mount(container);
  return () => {
    app.unmount();
    document.body.removeChild(container);
  };
}
