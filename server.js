  
import { DatabasePostgres } from './database-postgres.js';
import { fastify}  from 'fastify'

const server = fastify()

const database = new DatabasePostgres()


server.post('/videos', async (request,reply) => { 
    console.log('chegou nessa linha',request.body)
    const { title, description,duration } = request.body
    console.log('chegou nessa linha2')

    await database.create({
        title: title,
        description: description,
        duration: duration,
       
    })
    
    console.log('chegou nesse caralho')

    return reply.status(201).send()

})

server.get('/videos',async (request) => {
    const search = request.query.search
    


    const videos = await database.list(search)
    console.log(videos)
    return videos
    
})


server.put('/videos/:id', async (request,reply) => {
    const videoId = request.params.id
    
    const { title, description,duration } = request.body
    await database.update(videoId, {
        title,
        description,
        duration,

    })
    return reply.status(204)
})

server.delete('/videos/:id', async(request,reply) => {
    const videoId= request.params.id
    await database.delete(videoId)
    return reply.status(204).send()
    

})






server.listen({
    host: '0.0.0.0.',
    port: process.env.PORT ?? 3333


})

