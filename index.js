const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const { prefix } = require('./config.json');

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log(`I'm online, my name is ${client.user.username}`);

    client.user.setPresence({
        status: "online",
        activity: {
            name: "Mafia is fun",
            type: "STREAMING"
        }
    });
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member - await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command) {
        command.run(client, message, args);
    }
});
client.login(process.env.TOKEN);
