require("dotenv").config();
const redis = require("redis");


const client = redis.createClient({
    port: 6379,
    host: process.env.REDIS_HOST
})

client.on('connect', () => {
    console.log('Client connected to redis')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use');
})

client.on('end', () => {
    console.log('Client has been disconnected from redis');
})

process.on('SIGINT', () => {
    client.quit();
})

module.exports = client;