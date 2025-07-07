<script>
export default {
    name: 'Contacto',
    data() {
        return {
            nombre: '',
            email: '',
            mensaje: '',
            enviado: false
        };
    },
    methods: {
        enviarFormulario() {
            // Aquí podrías enviar los datos a un servidor
            this.enviado = true;
            // Limpiar formulario
            this.nombre = '';
            this.email = '';
            this.mensaje = '';
        }
    }
};
</script>
<template>
    <div class="contacto">
        <h1>Contacto</h1>
        <form @submit.prevent="enviarFormulario">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="nombre" required />
            </div>
            <div>
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" v-model="mensaje" required></textarea>
            </div>
            <button type="submit">Enviar</button>
        </form>
        <div v-if="enviado" class="mensaje-exito">
            ¡Gracias por contactarnos!
        </div>
    </div>
</template>



<style scoped>
.contacto {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}
.contacto label {
    display: block;
    margin-bottom: 0.5rem;
}
.contacto input,
.contacto textarea {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
}
.mensaje-exito {
    margin-top: 1rem;
    color: green;
}
</style>