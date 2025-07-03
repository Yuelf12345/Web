<template>
  <div>
    <el-input v-model="msg"></el-input>
    <el-button @click="downloadPDF">生成PDF条码</el-button>
    <!-- 隐藏的画布用于生成条码 -->
    <canvas id="barcodeCanvas" style="display:none;"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PDFDocument, rgb } from 'pdf-lib'
import JsBarcode from 'jsbarcode'
import fontkit from '@pdf-lib/fontkit'
const msg = ref('3-250622-00001')
const downloadPDF = async () => {
  try {
    // 1. 生成条形码
    const canvas = document.getElementById('barcodeCanvas') as HTMLCanvasElement
    JsBarcode(canvas, msg.value, { format: "CODE128", height: 60 })

    // 2. 初始化 PDF 并加载字体
    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)
    
    // 3. 加载中文字体（从本地或 CDN）
    const fontUrl = '/fonts/SIMHEI.TTF' // 本地路径
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
    const customFont = await pdfDoc.embedFont(fontBytes)

    // 4. 添加页面和内容
    const page = pdfDoc.addPage([300, 200])
    const barcodeImage = await pdfDoc.embedPng(canvas.toDataURL('image/png'))
    page.drawImage(barcodeImage, { x: 50, y: 60, width: 200, height: 80 })
    // 5. 写入中文（使用嵌入字体）
    page.drawText('型号: G75 Pro密林绿', {
      x: 50,
      y: 140,
      size: 14,
      font: customFont,
      color: rgb(0, 0, 0)
    })
    // 6. 下载 PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '产品条码.pdf'
    link.click()
  } catch (error) {
    console.error('生成失败:', error)
    alert('生成失败，请检查控制台')
  }
}
</script>