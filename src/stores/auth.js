import { defineStore } from 'pinia';
import {useFirebaseAuth} from 'vuefire'
import {signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth'
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';



export const useAuthStore= defineStore('auth', () =>{

    const auth = useFirebaseAuth()
    const authUser=ref(null)
    const router=useRouter()

    const errorCodes={
        'auth/invalid-credential':'Usuario y/o contraseña inválida'
    }
    const errorMsg=ref('')
    onMounted(()=>{
        onAuthStateChanged(auth, (user) =>{
            if (user){
                authUser.value= user
            }
        })
    })
    

    const login =({email,password}) =>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                const user=userCredential.user
                authUser.value= user
                router.push({name:'admin-propiedades'})
            })
            .catch( error=>{
                errorMsg.value=errorCodes[error.code]
            })
    }

    const logout=()=>{
        signOut(auth).then(()=>{
            authUser.value=null
            router.push({name:'login'})
        }).catch(error =>{
            console.log(error)
        })
    }
    const hasError=computed(() =>{
        return errorMsg.value
    })
    const isAuth= computed(() =>{
        return authUser.value
    })

    return {
        login,
        hasError,
        errorMsg,
        isAuth,
        logout
    }
})