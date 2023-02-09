---
layout: false
title: Palavra cruzada
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const Crossword = defineAsyncComponent(() => import('../../').then(m => m.Crossword))
</script>

<ClientOnly>
  <Crossword
    statement="Foo2s"
    background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
    :items="[
      {
        x: 0,
        y: 0,
        type: 'vertical',
        position: 1,
        word: 'futebol',
        tip: 'Dica 1'
      },
      {
        x: 0,
        y: 0,
        type: 'horizontal',
        position: 1,
        word: 'fute-bol',
        tip: 'Dica 2'
      }
    ]"
  />
</ClientOnly>
