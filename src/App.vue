<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
const auth = useAuthStore()
</script>

<template>
  <v-card elevation="3" max-width="1200" class=" mx-auto">
    <v-layout>
      <v-app-bar color="red-darken-4">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">

            <p class="text-h5 font-weight-semibold  rounded px-2 ">
              VMP
            </p>
            <P>Propiedades</P>
          </v-btn>
        </template>
        <template v-slot:append>
          <div v-if="auth.isAuth">
            <v-btn :to="{ name: 'admin-propiedades' }">Admin</v-btn>
            <v-btn @click="auth.logout">Cerrar Sesión</v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }">Inicio</v-btn>
            <!-- <v-btn :to="{name: 'nosotros'}">Nosotros</v-btn>
            <v-btn :to="{name: 'contacto'}">Contactanos</v-btn> -->
            <v-btn :to="{ name: 'login' }">IS</v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
