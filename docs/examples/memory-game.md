---
layout: false
---

<script setup>
import { MemoryGame } from '../../'
import '../../dist/style.css'
</script>

<MemoryGame
  statement="Foo2s"
  background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
  :options="{
    teste1: 'teste2',
    teste3: 'teste4',
    teste5: 'teste6',
    teste55: 'teste65',
    teste655: 'teste665',
    tes1te55: 'test35e65'
  }"
/>
