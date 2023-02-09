---
layout: false
title: Preencha os espaços em branco
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const FillInTheBlanks = defineAsyncComponent(() => import('../../').then(m => m.FillInTheBlanks))
</script>

<ClientOnly>
  Em breve
</ClientOnly>
