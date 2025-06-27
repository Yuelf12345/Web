<template>
    <div class="homebox">
        <div class="mapp" ref="mapRef"></div>
        <div class="content"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive, useTemplateRef, toRefs } from "vue";
declare global {
  interface Window {
    BMap: any;
  }
}
const BMap = window.BMap;
const mapRef = useTemplateRef('mapRef');
const map = ref();
const points = ref([{ lng: 116.405725, lat: 39.935362 }]);
const initMap = ():void => {
    map.value = new BMap.Map(mapRef.value);
    map.value.centerAndZoom(
        new BMap.Point(points.value[0].lng, points.value[0].lat),
        10
    );
    map.value.enableScrollWheelZoom(true);
    map.value.setMapStyleV2({
        styleId: "1fb853a740649182c004c7f05e3f1ac7",
    });
}

onMounted(() => {
    initMap();
});

onUnmounted(() => {
    map.value = null; // 销毁地图实例
});
</script>

<style scoped>
.homebox {
    width: 100%;
    height: 100%;
}

.mapp {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100px;
}

.content {
    height: 100%;
    display: flex;
}
</style>
