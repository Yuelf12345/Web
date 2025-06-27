<template>
  <div>
    <el-button type="primary" @click="request()">request</el-button>
    <el-button @click="abort()">abort</el-button>
    <el-button type="primary" @click="request1()">request1</el-button>
    <el-button @click="abort1()">abort1</el-button>
  </div>
</template>

<script lang="ts" setup>
const controller = new AbortController();
const request = async () => {
  const request = new Request("https://example.org/get", {
    signal: controller.signal,
  });
  const response = await fetch(request);
  const text = await response.text();
  console.log(text);
};
const abort = () => {
  controller.abort();
};

// axios
import axios from "axios";
const cancelSource = axios.CancelToken.source();
const controller1 = new AbortController();
const request1 = async () => {
  const signal = controller1.signal;
  axios
    .get("https://api.example.com/data", {
      cancelToken: cancelSource.token,
      signal,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request was cancelled");
      } else {
        console.error(error);
      }
    });
};
const abort1 = () => {
  controller.abort();
  cancelSource.cancel("Request cancelled");
};
</script>
