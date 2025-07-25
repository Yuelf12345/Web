// 触发指令
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  // pauseTracking() 暂停依赖搜集
  console.log(name);
  // resetTracking() 恢复依赖搜集
}

// createAppAPI
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    const app = {
      use() {
        return app;
      },
      mixin() {
        return app;
      },
      component() {
        return app;
      },
      directive() {
        return app;
      },
      mount() {},
      onUnmount() {},
      unmount() {},
      provide() {
        return app;
      },
      runWithContext() {},
    };
    return app;
  };
}

let renderer;
let rendererOptions; //包含平台相关的 DOM 操作方法（如 insert、remove、patchProp 等）
// 渲染器
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

function createRenderer(options) {
  const { insert, patchProp, createElement } = options;

  // 创建逻辑
  const mountElement = (
    vnode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized
  ) => {
    const { props, dirs } = vnode;
    let el;
    // 创建元素
    el = vnode.el = createElement(vnode.type);

    // 触发生命周期钩子
    dirs && invokeDirectiveHook(vnode, null, parentComponent, "beforeCreate");
    // 处理props
    if (props) {
      patchProp(el, "value", null, vnode.props.value);
    }
    dirs && invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    // 挂载元素
    insert(el, container, anchor);
    dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
  };
  // 更新逻辑
  const patchElement = (
    n1,
    n2,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized
  ) => {
    const el = (n2.el = n1.el); // 复用旧节点的DOM元素
    let { dynamicChildren, dirs } = n2;
    dirs && invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    // 动态子节点处理
    if (dynamicChildren) {
      for (let i = 0; i < dynamicChildren.length; i++) {
        const oldVNode = n1.dynamicChildren[i];
        const newVNode = dynamicChildren[i];
        patch(oldVNode, newVNode, oldVNode.el, null, parentComponent);
      }
    } else {
      // patchChildren(n1, n2, el, null, parentComponent)
      const { patchFlag } = n2;
      if (patchFlag & (1 << 7)) {
        // 有key 的子节点
        patchKeyedChildren(
          n1, // 旧节点
          n2, // 新节点
          container, // 父DOM容器
          anchor, // 插入位置的锚点
          parentComponent, // 父组件实例
          parentSuspense, // 父组件的 Suspense上下文
          namespace, // SVG/MathML命名空间
          slotScopeIds, //作用域插槽ID
          optimized // 是否启用优化模式 是否跳过全量 diff
        );
      } else if (patchFlag & (1 << 8)) {
        // 没有key 的子节点
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };

  // anchor 用于控制新节点的插入位置 默认为 null追加到容器末尾
  const patch = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized
  ) => {
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(n1, n2);
    }
  };

  const unmount = (
    vnode,
    parentComponent,
    parentSuspense,
    doRemove = false,
    optimized = false
  ) => {
    invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
  };

  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        // 卸载逻辑
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container);
    }
    container._vnode = vnode;
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate),
  };
}

const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const proxy = mount(container, false, resolveRootNamespace(container));
    return proxy;
  };
  return app;
};
