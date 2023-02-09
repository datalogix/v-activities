---
layout: false
title: Arraste e solte
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const DragAndDrop = defineAsyncComponent(() => import('../../').then(m => m.DragAndDrop))
</script>

<ClientOnly>
  Em breve
</ClientOnly>
