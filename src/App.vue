<script setup lang="ts">
import type { ActivityStoreParams } from './activities/Activity.vue'
import AssembleWord from './activities/AssembleWord/Index.vue'

const store = (params: ActivityStoreParams) => {
  console.log(params)
}
</script>

<template>
  <AssembleWord
    :words="['foo', 'bar']"
    word="ppic turie"
    image1="/robo.svg"
    image="/bg.jpeg"
    background="https://macmillanonlineplacementtest.com/images/bg.png"
    statement="Find the toys in the word search."
    text="<table><tr><td>fdfsdfds [foo]</td></tr><tr><td>fdfsdfds [bar|foo]</td></tr></table>"
    position="top"
    :options2="[
      {percentage: 10, label: 'teste1'},
      {percentage: 100, label: 'teste2'}
    ]"
    :options="{'teste1':'teste2','teste3':'teste4','teste5':'teste6'}"
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
        word: 'futebol',
        tip: 'Dica 2'
      }
    ]"
    @store="store"
  />
</template>

<style>
html, body {
  margin: 0;
}
</style>
