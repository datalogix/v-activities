---
layout: false
title: Dissertativa
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const Essay = defineAsyncComponent(() => import('../../').then(m => m.Essay))
</script>

<ClientOnly>
  <Essay
    statement="Faça uma dissertação sobre a Educação no Brasil."
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
  />
</ClientOnly>
