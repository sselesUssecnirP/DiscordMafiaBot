const { Client, Collection, Intents } = require("discord.js");
const DiscordJS = require('discord.js')
const { prefix } = require('./Configs/config.json')

const handlers = ["Commands", "Events"]

const client = new Client({
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    presence: {
        status: 'online',
        activity: {
            name: `Minigames are fun! | ${prefix}`,
            type: 'CUSTOM_STATUS'
        },
        afk: true
    }
});

client.events = new Collection;
client.commands = new Collection;
client.config = new Collection;
client.mafia = new Collection;
client.manualEvents = new Collection;
client.config.set('config', require('./Configs/config.json'))
client.config.set('TOKEN', process.env.TOKEN ? process.env.TOKEN : require('./Configs/token.json').TOKEN);

handlers.forEach(async handler => {
    await require(`./Modules/Handlers/${handler}`)(client)
});

client.events.each(e => e.run(client))

client.login(client.config.get('TOKEN'));
