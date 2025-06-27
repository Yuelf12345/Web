import type { Plugin } from 'vite';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function getAllFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subFiles = await getAllFiles(fullPath);
          files.push(...subFiles);
        }
      } else {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`读取目录失败: ${dir}`, error);
  }
  
  return files;
}

export function fileCountPlugin(): Plugin {
  return {
    name: 'file-count',
    async buildStart() {
      const files = await getAllFiles(process.cwd());
      const fileTypes = files.reduce((acc, file) => {
        const ext = file.split('.').pop() || 'unknown';
        acc[ext] = (acc[ext] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('\n📊 项目文件统计:');
      console.log('----------------------------------------');
      Object.entries(fileTypes).forEach(([ext, count]) => {
        console.log(`${ext.padEnd(10)} : ${count} 个文件`);
      });
      console.log('----------------------------------------');
      console.log(`总计: ${files.length} 个文件\n`);
    }
  };
}