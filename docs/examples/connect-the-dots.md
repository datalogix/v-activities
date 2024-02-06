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
    statement="Ligue as imagens entre as colunas corretamente!"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :items="[
      { value: 'Video game', related: '/examples/connect-the-dots/videogame.jpg' },
      { value: 'Bandeira', related: '/examples/connect-the-dots/bandeira.jpg' },
      { value: 'Livro', related: '/examples/connect-the-dots/livro.jpg' },
      { value: 'Médico', related: '/examples/connect-the-dots/medico.jpg' },
    ]"
  />
</ClientOnly>
