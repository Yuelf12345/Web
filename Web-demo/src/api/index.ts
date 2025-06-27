import request from "../utils/request";
export function login() {
  return request({
    url: "login",
    method: "POST",
    data: {
      username: "张三",
      password: "123",
    },
  });
}

export function apiTest() {
  return request({
    url: "apiTest",
    method: "POST",
    data: {
      username: "测试请求",
      password: "测试请求",
    },
  });
}

export function uploadFile(data: any) {
  return request({
    url: "upload/file",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function uploadChunk(data: any) {
  return request({
    url: "upload/chunk",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function uploadMerge(data: any) {
  return request({
    url: "upload/merge",
    method: "POST",
    data,
  });
}

export function requestProgress(data: any, onProgress: Function) {
  return request({
    url: "request/progress",
    method: "POST",
    data,
    onUploadProgress: (request: any) => {
      const progressEvent = request.event;
      if (progressEvent.lengthComputable) {
        const percentCompleted =
          (progressEvent.loaded / progressEvent.total) * 100;
        onProgress(percentCompleted);
      }
    },
  });
}

export function apiTest2(data:any) {
  return request({
    url: "api/prod-api/ozon/number/downloadPackageLabel",
    method: "POST",
    data:JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQzNDFiOTRiLTYzNDQtNGYyMC1iYTIzLTNmY2NjZGQ0NzQ3NiJ9.ihPSXHCOn_d-i-ZLvTWESAdayJQDHDjI2PGO6D1nuDjpztMqvFyf-qlz8WJkAdxO9PjlwBExd1MkfBeuLr4FBQ',
    }
  });
}