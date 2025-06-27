import {
  createRouter,
  createWebHistory,
  Router,
  RouterView,
  RouteRecordRaw,
} from "vue-router";
import { defineComponent, h } from 'vue';

const Layout = () => import("@/layout/index.vue");

// Define RouterViewWrapper component first
const RouterViewWrapper = defineComponent({
  name: 'RouterViewWrapper',
  setup() {
    return () => h(RouterView);
  }
});

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test.vue"),
  },
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/homepage.vue"),
      },
      {
        path: "/capture",
        name: "Capture",
        component: () => import("@/views/capture.vue"),
      },
      {
        path: "/messagebox",
        name: "Messagebox",
        component: () => import("@/views/messagebox.vue"),
      },
      {
        path: "/messagebox2",
        name: "Messagebox2",
        component: () => import("@/views/messagebox2.vue"),
      },
      {
        path: "/abort",
        name: "Abort",
        component: () => import("@/views/abort.vue"),
      },
      {
        path: "/lottie",
        name: "Lottie",
        component: () => import("@/views/lottie.vue"),
      },
      {
        path: "/three",
        name: "Three",
        component: () => import("@/views/three.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login.vue"),
      },
      {
        path: "/charts",
        name: "Charts",
        component: () => import("@/views/charts.vue"),
      },
      {
        path: "/map",
        name: "Map",
        component: () => import("@/views/map.vue"),
      },
      {
        path: "/worker",
        name: "Worker",
        component: () => import("@/views/worker.vue"),
      },
      {
        path: "/useAsyncSetup",
        name: "useAsyncSetup",
        component: () => import("@/views/useAsyncSetup.vue"),
      },
      {
        path: "/yHtml",
        name: "yHtml",
        component: () => import("@/views/yHtml.vue"),
      },
      {
        path: "/ParentComponent",
        name: "ParentComponent",
        component: () => import("@/views/ParentComponent.vue"),
      },
      {
        path: "/Permission",
        name: "Permission",
        component: RouterViewWrapper,
        children: [
          {
            path: "login",
            name: "login",
            component: () => import("@/views/permission/login.vue"),
            meta: { 
              permission: ["*"]
             },
          },
          {
            path: "user",
            name: "user",
            component: () => import("@/views/permission/user.vue"),
            meta: { 
              permission: ["user","admin"]
             },
          },
          {
            path: "admin",
            name: "admin",
            component: () => import("@/views/permission/admin.vue"),
            meta: { 
              permission: ["admin"]
             },
          },
        ],
      },
      {
        path:"/jsx",
        name:"jsx",
         component: RouterViewWrapper,
         children:[
          {
            path: "jsx",
            name: "jsx",
            component: () => import("@/views/Jsx/index.tsx"),
          }
        ]
      }
    ],
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
