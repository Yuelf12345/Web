import { defineStore } from "pinia";

type AuthCode = "user" | "admin";

interface AuthState {
  user: "user" | "admin" | null;
  permissionList: AuthCode[];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    permissionList: [],
  }),
  actions: {
    login(user: "user" | "admin") {
      if (user === "user") {
        this.permissionList = ["user"];
      } else if (user === "admin") {
        this.permissionList = ["user", "admin"];
      }
      this.user = user;
    },
    logout() {
      this.permissionList = [];
      this.user = null;
    },
  },
});
