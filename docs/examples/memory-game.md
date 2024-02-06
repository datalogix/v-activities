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
    :items="[
      { value: 'Video game', related: '/examples/memory-game/videogame.jpg' },
      { value: 'Bandeira', related: '/examples/memory-game/bandeira.jpg' },
      { value: 'Livro', related: '/examples/memory-game/livro.jpg' },
      { value: 'Médico', related: '/examples/memory-game/medico.jpg' },
      { value: 'Estudante', related: '/examples/memory-game/estudante.jpg' },
      { value: 'Salada', related: '/examples/memory-game/salada.jpg' }
    ]"
  />
</ClientOnly>
