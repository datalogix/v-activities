---
layout: false
title: Jogo da memória
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const MemoryGame = defineAsyncComponent(() => import('../../').then(m => m.MemoryGame))
</script>

<ClientOnly>
  <MemoryGame
    statement="Encontre os pares."
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :options="{
      'Video game': '/examples/memory-game/videogame.jpg',
      'Bandeira': '/examples/memory-game/bandeira.jpg',
      'Livro': '/examples/memory-game/livro.jpg',
      'Médico': '/examples/memory-game/medico.jpg',
      'Estudante': '/examples/memory-game/estudante.jpg',
      'Salada': '/examples/memory-game/salada.jpg'
    }"
  />
</ClientOnly>
