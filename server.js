//import { createServer } from 'node:http';

//const server = createServer((request,response) => {
//    response.write("oi")
//    return response.end()
    
//})


//server.listen(3333)

//route parameter parametro dentro da rota

//import { DatabaseMemory } from './database-memory.js'   
import { DatabasePostgres } from './database-postgres.js';
import { fastify}  from 'fastify'

const server = fastify()

const database = new DatabasePostgres()

//request body, toda vez que utilizar post e put eu posso enviar uym corpo para a requisição, no caso vou ennviar os dados

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
    // essa  devolução com esse numero significa que algo foi criado com sucesso
})

server.get('/videos',async (request) => {
    const search = request.query.search
    

    //dentro do meu request eu quero buscar meu query
    const videos = await database.list(search)
    console.log(videos)
    return videos
    
})


server.put('/videos/:id', async (request,reply) => {
    const videoId = request.params.id
    // dentro de parms consigo acessar todos os parametros que vem dentro das rotas
    const { title, description,duration } = request.body
    await database.update(videoId, {
        title,
        description,
        duration,

    })
    return reply.status(204)//uma ação que teve sucesso mas nao tem conteudo
})

server.delete('/videos/:id', async(request,reply) => {
    const videoId= request.params.id
    await database.delete(videoId)
    return reply.status(204).send()
    
    //deleta 
})






server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
    //port:3333
    //ao inves de usar a porta local vou usar a variavel para 

})

