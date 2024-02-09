---
layout: false
title: Reconhecimento de fala
---

<script setup>
import { defineAsyncComponent } from 'vue'
import '../../dist/style.css'

const SpeechRecognition = defineAsyncComponent(() => import('../../').then(m => m.SpeechRecognition))
</script>

<ClientOnly>
  <SpeechRecognition
    statement="Fale o nome dessa ativiade?"
    :background="`/examples/bgs/bg${Math.floor(Math.random() * 4) + 1}.jpg`"
    text="Reconhecimento de fala"
    lang="pt-BR"
  />
</ClientOnly>
