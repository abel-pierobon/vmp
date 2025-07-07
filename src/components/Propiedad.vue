<script setup>
defineProps({
    propiedad: {
        type: Object,
    },
    price: {
        type: Function,
    },
});
</script>

<template>
    <v-col cols="12" md="4">
        <v-card>
            <!-- Carrusel de imágenes si hay varias -->
            <v-carousel
                v-if="Array.isArray(propiedad.imagenes) && propiedad.imagenes.length > 0"
                height="250"
                hide-delimiter-background
                show-arrows
                cycle
                color="primary"
            >
                <v-carousel-item
                    v-for="(img, idx) in propiedad.imagenes"
                    :key="idx"
                >
                    <v-img :src="img" height="250" cover />
                </v-carousel-item>
            </v-carousel>
            <!-- Imagen única si no hay array de imágenes -->
            <v-img
                v-else
                :src="propiedad.imagen"
                height="250"
                cover
            />
            <v-card-title class="font-weight-bold">
                {{ propiedad.titulo }}
            </v-card-title>
            <v-card-text class="text-truncate">
                {{ propiedad.descripcion }}
            </v-card-text>
            <v-card-text class="text-h5 font-weight-bold">
                Precio: {{ price(propiedad.precio) }}
            </v-card-text>
            <template v-slot:actions>
                <v-btn
                    block
                    color="info"
                    variant="flat"
                    :to="{ name: 'propiedad', params: { id: propiedad.id } }"
                >
                    Ver información
                </v-btn>
            </template>
        </v-card>
    </v-col>
</template>