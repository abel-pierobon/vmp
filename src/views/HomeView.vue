<script setup>
import usePropiedades from '@/composables/usePropiedades';
import Propiedad from '../components/Propiedad.vue'
import {propertyPrice }from '../helpers'
import { ref } from 'vue';
const {alberca, filteredItem} =usePropiedades()
const filtros=ref(false)

</script>

<template>
  <main>
    <h1 class=" text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

    <v-card flat class=" py-10">
      <v-card-title class=" text-h5">
        Busqueda de propiedades
      </v-card-title>
      <v-btn @click="filtros=!filtros" class="my-5 bg-blue">Filtrar</v-btn>
      <v-select label="N° de Habitaciones" v-model="habitaciones" v-if="filtros">
        <v-option value="monoambiente">Monoanmbiente</v-option>
        <v-option value="2">2</v-option>
        <v-option value="3">3</v-option>
        <v-option value="4 o mas">Mas de 3</v-option>
      </v-select>
      <v-checkbox label=" Alberca" v-model='alberca' v-if="filtros"/>
      <v-row>
        <propiedad 
          v-for="propiedad in filteredItem"
          :key="propiedad.id"
          :propiedad="propiedad"
          :price="propertyPrice"
        />
      </v-row>
    </v-card>
  </main>
</template>
