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
    statement="Preencha cada espaço com a letra pertinente até encontrar a combinação perfeita de acordo com as dicas!"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :items="[
      {
        x: 6,
        y: 0,
        type: 'vertical',
        position: 1,
        word: 'Datalogix',
        fixed: true
      },
      {
        x: 6,
        y: 0,
        type: 'horizontal',
        position: 1,
        word: 'Dia',
        tip: '1 - Contrário de NOITE'
      },
      {
        x: 2,
        y: 1,
        type: 'horizontal',
        position: 1,
        word: 'Primavera',
        tip: '2 - Estação do ano antes do verão'
      },
      {
        x: 4,
        y: 2,
        type: 'horizontal',
        position: 1,
        word: 'Tatu',
        tip: '3 - Animal muito comum no continente americano'
      },
      {
        x: 5,
        y: 3,
        type: 'horizontal',
        position: 1,
        word: 'Banguela',
        tip: '4 - Pessoa sem dentes'
      },
      {
        x: 6,
        y: 4,
        type: 'horizontal',
        position: 1,
        word: 'Lua',
        tip: '5 - Único satélite do planeta Terra'
      },
      {
        x: 3,
        y: 5,
        type: 'horizontal',
        position: 1,
        word: 'Ouro',
        tip: '6 - Metal precioso'
      },
      {
        x: 3,
        y: 6,
        type: 'horizontal',
        position: 1,
        word: 'Google',
        tip: '7 - Principal buscador da internet'
      },
      {
        x: 5,
        y: 7,
        type: 'horizontal',
        position: 1,
        word: 'Giz',
        tip: '8 - Utilizado para escrever na lousa escolar'
      },
      {
        x: 6,
        y: 8,
        type: 'horizontal',
        position: 1,
        word: 'Xuxa',
        tip: '9 - Apresentadora de programas infantis dos anos 90'
      }
    ]"
  />
</ClientOnly>
