import { collection,doc,deleteDoc } from "firebase/firestore"
import { computed, ref } from "vue"
import { useFirestore,useCollection, useFirebaseStorage } from "vuefire"
import { ref as storageRef,deleteObject } from "firebase/storage"


export default function usePropiedades(){

    const alberca=ref(false)

    const storage= useFirebaseStorage()
    const db=useFirestore()
    const propiedadesCollection=useCollection(collection(db,'propiedades'))

    async function deleteItem (id,urlImage){
        if (confirm('Deseas eliminar la propiedad')){
            const docRef= doc(db,'propiedades', id)
            const imageRef=storageRef(storage,urlImage)

            // aca se pueden ejecutar las dos promesas al mismo tiempo 
            // await deleteDoc(docRef)
            // await deleteObject(imageRef)
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
            
        }
        
    }

    const filteredItem=computed(()=>{
        return alberca.value? 
            propiedadesCollection.value.filter(propiedad=>propiedad.alberca) :
            propiedadesCollection.value
    })
    
    return{
        alberca,
        propiedadesCollection,
        filteredItem,
        deleteItem
    }
}