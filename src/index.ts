import Fastify from 'fastify'
import FastifyWS from 'fastify-websocket'
import FastifyStatic from 'fastify-static'
import path from 'path'
import { interpret } from 'xstate'
import { GameMachine } from './machine'


// Machine instance with internal state
const gameService = interpret(GameMachine)
  .onTransition((state) => {
    console.log('==========' + "\n")
    console.log(state.value, '=', state.context)
  })
  .start();


gameService.send('JOIN', {playerId: 3})
gameService.send('CHOOSE_TEAM', {team: 0, playerId: 3})
gameService.send('JOIN', {playerId: 4})
gameService.send('CHOOSE_TEAM', {team: 1, playerId: 4})
gameService.send('JOIN', {playerId: 5})
gameService.send('CHOOSE_TEAM', {team: 1, playerId: 5})
gameService.send('JOIN', {playerId: 6})
gameService.send('CHOOSE_TEAM', {team: 0, playerId: 6})
gameService.send('START')


/*
const fastify = Fastify({ logger: true })
fastify.register(FastifyWS)
fastify.register(FastifyStatic, {
  root: path.join(path.dirname(__dirname), 'public'),
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/ws', { websocket: true }, (connection, req) => {
  connection.socket.on('message', message => {
    if (message.toLocaleString() === 'hello') {
      connection.socket.send('hi from server')
    }
  })
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
*/
