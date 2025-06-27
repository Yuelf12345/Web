<template>
    <div>
        <input type="file" @change="handleFileChange" />
        <button @click="captureFrame">截取帧</button>
        <video ref="videoPlayer" @loadedmetadata="onloadedmetadata" controls></video>
        <canvas ref="canvas" style="display:none;"></canvas>
        <img :src="firstImage" alt="Video Cover" v-if="firstImage" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const firstImage = ref<string>('');
const videoPlayer = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let shouldCapture = ref<boolean>(true);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target || !target.files) {
        alert('文件选择失败，请重试！');
        return;
    }
    const file = target.files[0];
    console.log('file', file);
    if (!file.type.startsWith('video/')) {
        alert('请选择一个视频文件！');
        return;
    }

    const url = URL.createObjectURL(file);
    videoPlayer.value!.src = url;

    // 确保video元素加载后再尝试截取帧
    console.log('videoPlayer', videoPlayer.value);
    videoPlayer.value!.oncanplay = onloadedmetadata;
};

const onloadedmetadata = () => {
    if (!shouldCapture.value) return;
    if (videoPlayer.value && canvas.value) {
        canvas.value.width = videoPlayer.value.videoWidth;
        canvas.value.height = videoPlayer.value.videoHeight;

        const ctx = canvas.value.getContext('2d');
        videoPlayer.value.currentTime = 0.01;
        ctx!.drawImage(videoPlayer.value, 0, 0, canvas.value.width, canvas.value.height);
        const dataURL = canvas.value.toDataURL('image/jpeg');
        firstImage.value = dataURL;
        setTimeout(() => {
            videoPlayer.value!.oncanplay = null
        }, 500);
    }
};

const captureFrame = () => {
    if (videoPlayer.value && canvas.value) {
        canvas.value.width = videoPlayer.value.videoWidth;
        canvas.value.height = videoPlayer.value.videoHeight;

        const ctx = canvas.value.getContext('2d');
        videoPlayer.value.currentTime = 0.01;
        ctx!.drawImage(videoPlayer.value, 0, 0, canvas.value.width, canvas.value.height);
        const dataURL = canvas.value.toDataURL('image/jpeg');
        firstImage.value = dataURL;
    }
}
</script>