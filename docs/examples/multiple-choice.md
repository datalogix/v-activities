---
layout: false
title: Múltipla escolha
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const MultipleChoice = defineAsyncComponent(() => import('../../').then(m => m.MultipleChoice))
</script>

<ClientOnly>
  <MultipleChoice
    statement="Qual a empresa que desenvolveu essas atividades ?"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :options="[
      { label: 'Microsoft', percentage: 0 },
      { label: 'Facebook', percentage: 0 },
      { label: 'Datalogix', percentage: 100 },
      { label: 'Google', percentage: 0 }
    ]"
  />
</ClientOnly>
