import router from "@/router";
import { useAuthStore } from "@/store/auth";
type Permission = [string];

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const p = to.meta.permission as Permission;
  if (
    p &&
    !p.includes("*") &&
    !p.includes(authStore.user as string)
  ) {
    router.push("/Permission/login");
  } else {
    next();
  }
});
