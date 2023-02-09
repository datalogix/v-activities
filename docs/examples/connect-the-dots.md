---
layout: false
title: Ligue os pontos
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const ConnectTheDots = defineAsyncComponent(() => import('../../').then(m => m.ConnectTheDots))
</script>

<ClientOnly>
  <ConnectTheDots
    statement="Foo2s"
    background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
    :options="{
      teste5: 'teste6',
      teste55: 'testfgdsfe65',
      teste655: 'testgfdsgsdgde665',
      tes1te55: 'testgfdsgdfsgfds35e65'
    }"
  />
</ClientOnly>
