<template>
  <div>
    <YHtml :content="htmlString" />
  </div>
</template>

<script>
import YHtml from '@/components/YHtml.vue';

export default {
  components: {
    YHtml
  },
  data() {
    return {
      htmlString: '<p>这是一个 <strong>安全</strong> 的 HTML 内容。</p>'
    };
  }
};
</script>