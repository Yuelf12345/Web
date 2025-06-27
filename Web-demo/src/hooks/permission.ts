import { useAuthStore } from '@/store/auth';

const permission = {
  mounted(el: HTMLElement, binding:{value: string[]}) {
    const authStore = useAuthStore();
    if(!binding.value.includes(authStore.user!)){
      el.remove();
    }
  },
}

export default permission;