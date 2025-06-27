<template>
    <div>
        <el-button @click="handleAddDownLoadPdf">PrintPDF</el-button>
    </div>
</template>
<script setup>
import { PDFDocument } from "pdf-lib";
console.log(PDFDocument);
const handleAddDownLoadPdf = async () => {
    const downloadPromises = [];
    for (let index = 0; index < 3; index++) {
        downloadPromises.push(
            fetch("https://xxx.pdf", {
                method: "GET",
            }).then((response) => response.arrayBuffer())
        );
    }
    Promise.all(downloadPromises).then(async (documents) => {
        const mergedPdf = await PDFDocument.create();

        // 加载每个 PDF 文件并将其页面复制到新的 PDF 文档中
        for (const pdfBytes of documents) {
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(
                pdfDoc,
                pdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        // 保存合并后的 PDF 文件
        const mergedPdfBytes = await mergedPdf.save();

        // 创建一个 Blob 对象
        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

        // 创建一个下载链接
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    });
};
</script>
