import { Client, Collection, IntentsBitField, EmbedBuilder } from 'discord.js';
import data from '../config.json' assert {type: 'json'};
import { readdirSync } from 'fs';

const myIntents = new IntentsBitField().add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers
);

const client = new Client({ intents: myIntents });

client.commands = new Collection();

//commands loader this is my babyyyyyyyyyy ily
const commandFiles = [];
const findCommands = async (path = "commands") => {
    readdirSync(`./src/${path}`).filter(async (file) => {
        if (file === "aliases" || file.startsWith('_')) return;
        if (file.endsWith(".js")) return commandFiles.push(file);
        findCommands(path + `/${file}`);
    });
}
findCommands()

for (const file of commandFiles) {
    let commander;
    const getCommands = (name, path = "commands") => {
        const dirr = `./src/${path}`;

        readdirSync(dirr).filter((find) => {
            if (find === name) {
                commander = `./${path}/${find}`;
            } else {
                if (find.endsWith("js") === true) return;
                if (find === "aliases" || find.startsWith("_")) return;
                return getCommands(name, path + `/${find}`);
            }
        });
    };
    getCommands(file);

    const command = await import(commander);

    client.commands.set(command.data.name, command);

}
//normal events loader
const eventFiles = readdirSync("./src/events")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {

    const event = await import(`./events/${file}`);

    client.on(event.name, data => event.execute(data, client));
}

client.on("messageCreate", async message => {

    if (!message.content.startsWith("#")) return
    if (!message.member.permissions.has("Administrator")) return console.log("teste")

    await message.delete()

    const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']

    const new_embed = (data, img = false) => {
        const embed = new EmbedBuilder()
            .setDescription(data)
            .setColor(off)

        if (!img) return embed

        embed.setImage(img)

        return embed
    }
    let img = message.content.split("FOTO=")[1]

    await message.channel.send({ embeds: [new_embed(message.content.slice(1).split("!!")[0], img)] })
})

client.login(data.token)
    .then(async () => {
        const pkg = await import('../package.json', { assert: { type: "json" } })
        const top = `\x1b[34m┏╋◆ ${pkg.default.name.toUpperCase()} ◆╋┓\n\n\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓`

        console.log('\n' + top + "\n\n\x1b[32m[!] Bot Status: ONLINE")

        //bot by João Bot, last time updated: 25/12/2022
    })
    .catch(err => { console.log("\x1b[31mBot login err: " + err); })

// process.on('unhandRejection', (reason, promise) => {
//     console.log(`🚨 | [Erro]\n\n + ${reason} ${promise}`);
//     console.log(promise)
// });
// process.on('uncaughtException', (error, origin) => {
//     console.log(`🚨 | [Erro]\n\n + ${error}, ${origin}`);
// });
// process.on('uncaughtExceptionMonitor', (error, origin) => {
//     console.log(`🚨 | [Erro]\n\n + ${error}, ${origin}`);
// });