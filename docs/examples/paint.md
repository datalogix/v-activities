---
layout: false
title: Colorir
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const Paint = defineAsyncComponent(() => import('../../').then(m => m.Paint))
</script>

<ClientOnly>
  <Paint
    statement="Pinte o robô com suas cores favoritas!"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    image="https://i.pinimg.com/736x/78/a8/17/78a817074b4c74d51fbc026196981d4e.jpg"
  />
</ClientOnly>
