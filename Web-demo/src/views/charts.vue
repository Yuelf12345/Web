<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div>charts</div>
                <div class="chart-btns">
                    <p @click="getIsActive('DAY')" :class="[isactive == 'DAY' ? 'chart-btn' : '']">
                        日
                    </p>
                    <p @click="getIsActive('WEEK')" :class="[isactive == 'WEEK' ? 'chart-btn' : '']">
                        周
                    </p>
                    <p @click="getIsActive('MONTH')" :class="[isactive == 'MONTH' ? 'chart-btn' : '']">
                        月
                    </p>
                </div>
                <div ref="chartRef" class="echart" />
            </el-col>
            <el-col :span="12">
                <div>charts</div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { onMounted, ref, watch, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
const isactive = ref('DAY')
const getIsActive = (val) => {
    isactive.value = val
}

// echarts
onMounted(async () => {
    initChart();
})
onUnmounted(() => {
    chartInstance.dispose()
})
const chartRef = ref(null)
let chartInstance
// 模拟每周体重数据
const weightData = [
    { week: '1', weight: 60, targetWeight: 60 },
    { week: '2', weight: 64.5, targetWeight: 65 },
    { week: '3', weight: 70.8, targetWeight: 68 },
    { week: '4', weight: 71.2, targetWeight: 65 },
    { week: '5', weight: 60, targetWeight: 60 },
    { week: '6', weight: 71.8, targetWeight: 60 },
    { week: '7', weight: 72, targetWeight: 62 }
]

// 横坐标数据
const xData = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周']
const yData = []
// 准备配置项
const chartOption = {
    title: {
        text: ''
    },
    tooltip: {},
    xAxis: {
        type: 'category',
        name: '周',
        data: xData,
        axisLabel: {
            rotate: 40 // 旋转x轴标签，防止重叠
        }
    },
    yAxis: {
        type: 'value',
        name: '体重(kg)',
        // min: 45,
    },
    legend: {
        data: [{
            name: '测量体重'
        }, {
            name: '目标体重'
        }],
    },
    series: [{
        name: '测量体重',
        data: weightData.map(item => item.weight),
        type: 'line',
        smooth: true, // 是否平滑曲线
        lineStyle: {
            color: '#5470c6'
        },
        // areaStyle: { } // 可以设置区域填充颜色
    }, {
        name: '目标体重',
        data: weightData.map(item => item.targetWeight),
        type: 'line',
        smooth: true, // 是否平滑曲线
        lineStyle: {
            color: '#E6A23C'
        },
        // areaStyle: {  }
    }]
}
const initChart = () => {
    chartInstance = echarts.init(chartRef.value)
    // 使用刚指定的配置项和数据显示图表。
    chartInstance.setOption(chartOption)
}
</script>
<style lang="scss">
.chart-btns{
    width:200px;
    height:40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #eee;
    border-radius: 15px;
    p{
        padding: 3px 18px;
        line-height: 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .chart-btn{
        color: #409EFF;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
}
.echart{
    width: 500px;
    height: 500px;
}
</style>