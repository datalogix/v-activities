---
layout: false
title: Forca
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const Hangman = defineAsyncComponent(() => import('../../').then(m => m.Hangman))
</script>

<ClientOnly>
  <Hangman
    statement="Adivinha a palavra... O tempo está passando!"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    :word="'Datalogix'"
  />
</ClientOnly>
