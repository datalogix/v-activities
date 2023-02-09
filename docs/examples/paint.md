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
    statement="Foo2s"
    background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
    image="https://macmillanonlineplacementtest.com/images/bg.png"
  />
</ClientOnly>
