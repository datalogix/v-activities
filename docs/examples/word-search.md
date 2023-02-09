---
layout: false
title: Caça palavra
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const WordSearch = defineAsyncComponent(() => import('../../').then(m => m.WordSearch))
</script>

<ClientOnly>
  <WordSearch
    statement="Encontre as palavras no quadro abaixo:"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :words="['Datalogix', 'Educação', 'Jogos', 'Aprender']"
  />
</ClientOnly>
