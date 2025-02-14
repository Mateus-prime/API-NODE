import { randomUUID } from "node:crypto"
import { sql } from './db.js'
//unique universal id

export class DatabasePostgres{ 
    // # para ser uma chave privada
    //#videos =  new Map()

    //set == naoaceita valores duplicados, map == como se fosse um obejto

    
    async list(search){

        let videos
        if (search){ 
            videos= await sql`select *from videos where title ilike"%${search}%"`
        }
        else { 
            videos= await sql`select *from videos`
        }

        return videos

        //usaremos o await para esperar a ação acabar e tenho que usar o async para isso funcionar




      //  return Array.from(this.#videos.entries( ))
        //.map((videoArray) =>{
         //   const id = videoArray[0]
           // const data = videoArray[1]
            //return{
             //   id,
              //  ...data,
            
                //transformei em dicionario e toda informaçao de data mandei num array so

           // }
//        })
//
//            .filter(video => {
 //               if (search) {
//                    return this.video.title.includes(search)
//                }
//
//                return true
//            })
            //vai recerber cada um dos videos, se houver uma busca
            //vou retornar se tem ou nao aquele video 
            //vale resaltar que essa constante é opcional
           
        
        
        
        //antes era values agora com o entries ele retorna um araray com id
        //precisei mudar a estrutura para um array por que ele me devolve um values
    }



    async create(video){
        const videoId= randomUUID()
        const {title,description,duration} = video
        await sql`insert into videos(id, title, description, duration) VALUES (${videoId},${title},${description}, ${duration})`
        
        //const videoId= randomUUID()
        //this.#videos.set(videoId,video)
    }


    async update(id,video){
        const {title,description,duration} = video
        await sql`update videos set title =  ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
        //this.#videos.set(id,video)
    }

    
    async delete(id){
        await sql`delete from videos where id = ${id}`
        //this.#videos.delete(id)
    }


}