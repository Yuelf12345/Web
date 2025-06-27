<template>
  <div>
      <input type="file" ref="fileInput" @change="onFileSelected" />
      <button @click="upload">直接上传</button>
      <button @click="startUpload">切片上传</button>
  </div>
</template>

<script>
import {uploadFile, uploadChunk, uploadMerge } from "@/api";
import axios from 'axios';
export default {
  data() {
      return {
          file: null,
          chunkSize: 1 * 10 * 1024, // 每个分片1MB
          chunks: [],
      };
  },
  methods: {
      onFileSelected(event) {
          this.file = event.target.files[0];
          this.splitFile();
          console.log('this.chunks', this.chunks);
      },
      splitFile() {
          const blobSlice = File.prototype.slice;
          let start = 0;
          while (start < this.file.size) {
              const end = start + this.chunkSize >= this.file.size ? this.file.size : start + this.chunkSize;
              const chunk = this.file.slice(start, end);
              this.chunks.push(chunk);
              start = end;
          }
      },
      async startUpload() {
          for (let i = 0; i < this.chunks.length; i++) {
              await this.uploadChunk(i);
          }
          // 所有分片上传完毕，可以在此处触发合并请求
          this.mergeChunks();
      },
      async upload() {
          const formData = new FormData();
          formData.append('file', this.file);
          await uploadFile(formData)
      },
      async uploadChunk(index) {
          const formData = new FormData();
          formData.append('chunk', this.chunks[index]);
          formData.append('filename', this.file.name);
          formData.append('chunkIndex', index);
          formData.append('totalChunks', this.chunks.length);

          try {
              await uploadChunk(formData)
              console.log(`Chunk ${index} uploaded.`);
          } catch (error) {
              console.error(`Error uploading chunk ${index}:`, error);
          }
      },
      async mergeChunks() {
          try {
              const response = await uploadMerge({
                  filename: this.file.name,
                  totalChunks: this.chunks.length,
              })
              console.log(response.data.message);
              // 可以在这里处理合并成功的反馈，比如显示提示信息给用户
          } catch (error) {
              console.error('Error merging chunks:', error);
              // 错误处理
          }
      },
  },
};
</script>