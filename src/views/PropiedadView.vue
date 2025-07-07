<script setup>
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import useLocationMap from '@/composables/useLocacionMap';
import { propertyPrice } from '../helpers'
import { watch } from 'vue';

const { zoom, center } = useLocationMap()

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

watch(propiedad, (propiedad) => {
    center.value = propiedad.ubicacion
})
</script>

<template>
    <v-card flat="">
        <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
            {{ propiedad?.titulo }}
        </v-card-title>
        
        <!-- Carrusel de imágenes -->
        <v-carousel
            v-if="propiedad?.imagenes && propiedad.imagenes.length"
            height="550"
            hide-delimiter-background
            show-arrows
            cycle
        >
            <v-carousel-item
                v-for="(img, idx) in propiedad.imagenes"
                :key="idx"
            >
                <v-img :src="img" height="550" cover />
            </v-carousel-item>
        </v-carousel>
        <!-- Si no hay imágenes, muestra una sola imagen si existe -->
        <v-img
            v-else-if="propiedad?.imagen"
            :src="propiedad.imagen"
            height="550"
            cover
        />

        <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
            <v-card-text>
                Precio: 
                <span class="font-weight-bold"> {{ propertyPrice(propiedad?.precio) }}</span>
            </v-card-text>
            <v-card-text>
                Baños: 
                <span class="font-weight-bold"> {{ propiedad?.wc }}</span>
            </v-card-text>
            <v-card-text>
                Estacionamiento: 
                <span class="font-weight-bold"> {{ propiedad?.estacionamiento }}</span>
            </v-card-text>
            <v-card-text>
                Habitaciones: 
                <span class="font-weight-bold"> {{ propiedad?.habitaciones }}</span>
            </v-card-text>
        </div>
        <v-row>
            <v-col cols="12" md="8">
                <div class="text-pre-wrap py-10">
                    {{ propiedad?.descripcion }}
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <div class="py-10" style="height: 400px;">
                    <LMap ref="map" 
                        v-model:zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false"
                    >
                        <LMarker 
                            :lat-lng="center"
                        >
                            <LPopup>
                                {{ propiedad?.titulo }}
                            </LPopup>
                        </LMarker>
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>
<style>
.text-pre-wrap{
    white-space: pre-wrap;
}
</style>