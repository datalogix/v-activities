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
    :options="{
      'Video game': '/examples/connect-the-dots/videogame.jpg',
      'Bandeira': '/examples/connect-the-dots/bandeira.jpg',
      'Livro': '/examples/connect-the-dots/livro.jpg',
      'Médico': '/examples/connect-the-dots/medico.jpg',
    }"
  />
</ClientOnly>
