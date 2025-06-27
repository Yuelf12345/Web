import { Plugin } from 'vite';

export function removeConsolePlugin(): Plugin {
  return {
    name: 'remove-console-plugin',
    transform(code, id) {
      if (process.env.NODE_ENV === 'pre') {
        console.log('remove-console-plugin');
        // 使用正则表达式移除所有的 console.xxx 调用
        const transformedCode = code.replace(/console\..*?$$.*?$$/sg, '');
        return {
          code: transformedCode,
          map: null, // 如果需要 sourceMap 支持，可以生成对应的 map
        };
      }
      return null;
    },
  };
}