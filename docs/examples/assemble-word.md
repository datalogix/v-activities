---
layout: false
title: Montar palavra
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const AssembleWord = defineAsyncComponent(() => import('../../').then(m => m.AssembleWord))
</script>

<ClientOnly>
  <AssembleWord
    statement="Complete a palavra abaixo de forma correta!"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :word="'Datalogix'"
  />
</ClientOnly>
