---
layout: false
---

<script setup>
import { Crossword } from '../../'
import '../../dist/style.css'
</script>

<Crossword
  statement="Foo2s"
  background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
  :items="[
    {
      x: 0,
      y: 0,
      type: 'vertical',
      position: 1,
      word: 'futebol',
      tip: 'Dica 1'
    },
    {
      x: 0,
      y: 0,
      type: 'horizontal',
      position: 1,
      word: 'fute-bol',
      tip: 'Dica 2'
    }
  ]"
/>
