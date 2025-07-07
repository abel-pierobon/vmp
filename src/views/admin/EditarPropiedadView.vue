<script setup>
import { doc, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';

import { useField, useForm } from 'vee-validate'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import useImages from '@/composables/useImages'
import useLocacionMap from '@/composables/useLocacionMap'
import { validationSchema } from '@/validation/propiedadSchema'
import { watch } from 'vue';

const items = [1, 2, 3, 4, 5]

// Usar el composable modificado para múltiples imágenes
const { urls, uploadImages, images, removeImage } = useImages()
const { zoom, center, pin } = useLocacionMap()

// const { handleSubmit } = useForm({ validationSchema });
const { handleSubmit } = useForm();
const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const estacionamiento = useField('estacionamiento')
const descripcion = useField('descripcion')
const alberca = useField('alberca')

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

// Para inicializar las imágenes actuales
watch(propiedad, (prop) => {
    if (!prop) return;
    titulo.value.value = prop.titulo
    precio.value.value = prop.precio
    habitaciones.value.value = prop.habitaciones
    wc.value.value = prop.wc
    estacionamiento.value.value = prop.estacionamiento
    descripcion.value.value = prop.descripcion
    alberca.value.value = prop.alberca
    center.value = prop.ubicacion
    // Inicializa las imágenes actuales en el composable
    if (Array.isArray(prop.imagenes)) {
        urls.value = [...prop.imagenes]
    } else if (prop.imagen) {
        urls.value = [prop.imagen]
    }
}, { immediate: true })

const submit = handleSubmit(async values => {
    console.log('Submit ejecutado', values)
    try {
        const { imagen, ...rest } = values
        const data = {
            ...rest,
            imagenes: urls.value,
            ubicacion: center.value
        }
        console.log('Datos a guardar:', data)
        await updateDoc(docRef, data)
        router.push({ name: 'admin-propiedades' })
    } catch (error) {
        console.error('Error al guardar en Firestore:', error)
        alert('Hubo un error al guardar los cambios.')
    }
})
</script>

<template>
    <v-card max-width="800" flat class="mx-auto my-10">
        <v-card-title class="mt-5">
            <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
        </v-card-title>
        <v-card-subtitle>
            <p class="text-h5">Edita los detalles de la propiedad</p>
        </v-card-subtitle>

        <v-form class="mt-10" @submit.prevent="submit">
            <v-text-field v-model="titulo.value.value" :error-messages="titulo.errorMessage.value" label="Titulo"
                class="mb-5"></v-text-field>

            <v-file-input v-model="imagen.value.value" :error-messages="imagen.errorMessage.value" accept="image/jpeg"
                prepend-icon="mdi-camera" label="Fotografías" class="mb-5" @change="uploadImages" multiple
                show-size></v-file-input>

            <div class="my-5">
                <p class="font-weight-bold">Imágenes actuales:</p>
                <v-row dense>
                    <v-col v-for="(img, idx) in images" :key="idx" cols="4" class="d-flex align-center">
                        <div style="position:relative; width:100%;">
                            <v-img :src="img" height="100" cover />
                            <v-btn icon color="red" size="x-small"
                                style="position:absolute;top:8px;right:8px;z-index:2;" @click.stop="removeImage(idx)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <v-text-field v-model="precio.value.value" :error-messages="precio.errorMessage.value" label="Precio"
                class="mb-5"></v-text-field>

            <v-row>
                <v-col cols="12" md="4">
                    <v-select label="Habitaciones" class="mb-5" :items="items" v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="WC" class="mb-5" :items="items" v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="Lugares Estacionamiento" class="mb-5" :items="items"
                        v-model="estacionamiento.value.value" :error-messages="estacionamiento.errorMessage.value" />
                </v-col>
            </v-row>

            <v-textarea v-model="descripcion.value.value" :error-messages="descripcion.errorMessage.value"
                label="Descripción" class="mb-5"></v-textarea>

            <v-checkbox v-model="alberca.value.value" label="Alberca"></v-checkbox>

            <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
            <div class="pb-10">
                <div style="height:600px">
                    <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
                        <LMarker :lat-lng="center" draggable @moveend="pin" />
                        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
                    </LMap>
                </div>
            </div>

            <v-btn color="pink-accent-3" block type="submit">
                Guardar Cambios
            </v-btn>
        </v-form>
    </v-card>
</template>