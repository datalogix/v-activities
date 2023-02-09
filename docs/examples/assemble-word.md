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
    statement="Foo2s"
    background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
    :word="'Datalogix'"
  />
</ClientOnly>
