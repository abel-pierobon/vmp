<script setup>
import usePropiedades from '@/composables/usePropiedades'
import Propiedad from '../components/Propiedad.vue'
import { propertyPrice } from '../helpers'
import { ref } from 'vue'

const {
  alberca,
  cochera,
  habitacionesMin,
  tipo,
  operacion,
  expensas,
  filteredItem,
  DeleteFilter
} = usePropiedades()

const filtros = ref(false)
</script>

<template>
  <main>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

    <!-- Botón para mostrar/ocultar filtros -->
    <div class="text-center mb-4">
      <v-btn @click="filtros = !filtros" color="info">
        {{ filtros ? 'Ocultar Filtros' : 'Mostrar Filtros' }}
      </v-btn>
    </div>

    <!-- Filtros -->
    <v-expand-transition>

      <v-card flat class="pa-6 mb-6 " v-if="filtros">

        <v-row>
          <v-col cols="12" sm="3">
            <v-select :items="['', 'casa', 'departamento']" label="Tipo" v-model="tipo" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select :items="['', 'venta', 'alquiler']" label="Operación" v-model="operacion" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field label="Mín. Habitaciones" type="number" v-model="habitacionesMin" />
          </v-col>
          <v-row>
            <v-col cols="12" sm="3">
              <v-checkbox label="Piscina" v-model="alberca" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-checkbox label="Cochera" v-model="cochera" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-checkbox label="Expensas" v-model="expensas" />
            </v-col>
          </v-row>
          <v-btn class="mb-4" color="red" variant="text" @click="DeleteFilter">
            Limpiar Filtros
          </v-btn>


        </v-row>
      </v-card>
    </v-expand-transition>

    <!-- Propiedades -->
    <v-card flat class="py-10">
      <v-row>
        <Propiedad v-for="propiedad in filteredItem" :key="propiedad.id" :propiedad="propiedad"
          :price="propertyPrice" />
      </v-row>
    </v-card>
  </main>
</template>
