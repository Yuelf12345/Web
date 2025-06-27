import type { Plugin } from 'vite';

export function testPlugin(): Plugin {
  return {
    name: 'test-plug',
    apply: 'serve', // 或 'build' 指定插件在哪个阶段执行
    buildStart() {
      console.log('\n🚀 开始构建...');
    },
    transform(code, id, options) {
      console.log('test-plug',id);
      return null;
    },
    handleHotUpdate(){
      console.log('test-plug handleHotUpdate');
    }
  };
}