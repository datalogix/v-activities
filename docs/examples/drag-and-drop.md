---
layout: false
---

<script setup>
import { DragAndDrop } from '../../'
import '../../dist/style.css'
</script>

<DragAndDrop
  statement="Foo2s"
  background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
  :items="[
    {
      html: `
        Pedro Guimarães ainda não havia se [pronunciado] oficialmente sobre o caso até a última atualização desta reportagem.
        O colunista do g1 Valdo Cruz informou <b>que</b> a expectativa entre [integrantes]<br>do governo é que Pedro Guimarães deixe o cargo ainda nesta quarta-feira.
      `
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: `
        Pedro Guimarães ainda não havia se [pronunciado] oficialmente sobre o caso até a última atualização desta reportagem.
        O colunista do g1 Valdo Cruz informou <b>que</b> a expectativa entre [integrantes]<br>do governo é que Pedro Guimarães deixe o cargo ainda nesta quarta-feira.
      `
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: 'https://macmillanonlineplacementtest.com/images/bg.png'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: 'x [teste1]'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: '[teste2]'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: '[teste3]'
    }
  ]"
/>