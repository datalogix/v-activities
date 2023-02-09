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
    statement="Foo2s"
    background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
    :words="['Datalogix']"
  />
</ClientOnly>
