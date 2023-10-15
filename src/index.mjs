import { jayBot } from "jay-quick-bot"
import dotenv from 'dotenv'
dotenv.config()

const { TOKEN } = process.env

const client = new jayBot({
    commandsPath: 'src/commands',
    eventsPath: 'src/events',
    token: TOKEN
})

await client.start()