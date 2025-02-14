import { randomUUID } from "node:crypto"
//unique universal id

export class DatabaseMemory{ 
    // # para ser uma chave privada
    #videos =  new Map()

    //set == naoaceita valores duplicados, map == como se fosse um obejto

    
    list(search){
        return Array.from(this.#videos.entries( ))
        .map((videoArray) =>{
            const id = videoArray[0]
            const data = videoArray[1]
            return{
                id,
                ...data,
            
                //transformei em dicionario e toda informaçao de data mandei num array so

            }
        })

            .filter(video => {
                if (search) {
                    return this.video.title.includes(search)
                }

                return true
            })
            //vai recerber cada um dos videos, se houver uma busca
            //vou retornar se tem ou nao aquele video 
            //vale resaltar que essa constante é opcional
           
        
        
        
        //antes era values agora com o entries ele retorna um araray com id
        //precisei mudar a estrutura para um array por que ele me devolve um values
    }



    create(video){
        const videoId= randomUUID()
        this.#videos.set(videoId,video)
    }


    update(id,video){
        this.#videos.set(id,video)
    }

    
    delete(id){
        this.#videos.delete(id)
    }


}