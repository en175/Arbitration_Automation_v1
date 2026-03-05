<template>
  <div class="middle-panel" style="background: #F2F3F5; overflow: hidden; display: flex; flex-direction: column;">
    <TimelineBar />
    
    <div style="padding: 12px 24px; border-bottom: 1px solid var(--color-divider); background: #fff; display: flex; justify-content: flex-end;">
       <button class="wb-btn wb-btn-primary" style="font-size: 13px;">✨ 智能校对</button>
    </div>

    <!-- 纸张 -->
    <div style="flex: 1; overflow-y: auto; padding: 20px;">
      <div class="wb-paper">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 40px;">仲裁裁决书</h1>
        <p style="text-indent: 2em; line-height: 2;">
          本案现已审理终结。仲裁庭现对本案的事实认定及裁决意见陈述如下：
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          关于货款金额的认定，仲裁庭核对了申请人提交的《购销合同》及《发货单》。虽然被申请人主张货物存在质量瑕疵，但并未在合同约定的验收期内提出异议。
        </p>
        <p class="wb-highlight" style="text-indent: 2em; line-height: 2;">
          综上，仲裁庭对申请人主张的货款 1,200,000.00 元予以支持。
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          关于违约金的调整，被申请人提出的标准调整请求，仲裁庭经查明合同约定的标准（日万分之五）符合行业惯例，且被申请人违约行为显著。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TimelineBar from './TimelineBar.vue';
</script>
