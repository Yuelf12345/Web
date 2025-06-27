import type { Plugin } from 'vite';

export function buildTimePlugin(): Plugin {
  let startTime: number;
  
  return {
    name: 'build-time',
    buildStart() {
      startTime = Date.now();
      console.log('\n🚀 开始构建...');
    },
    buildEnd() {
      const endTime = Date.now();
      const buildTime = endTime - startTime;
      console.log(`✨ 构建完成! 总用时: ${buildTime}ms\n`);
    },
    closeBundle() {
      const endTime = Date.now();
      const buildTime = endTime - startTime;
      console.log(`✨ 构建完成! 总用时: ${buildTime}ms\n`);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
          const duration = Date.now() - start;
          console.log(`${req.method} ${req.url} - ${duration}ms`);
        });
        next();
      });
    }
  };
}