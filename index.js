const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const { prefix } = require('./config.json');

const client = new Client({
    disableEveryone: true
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

    if (cmd === "ping") {
        const msg = await message.channel.send(`:ping_pong: Pinging...`);

        msg.edit(`:ping_pong: Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ping)}ms`)
    }

    if (cmd === "mafrole") {
            if(message.deletable) {
                message.delete()
            }

            let num = Math.floor(Math.random(5));
            console.log(num)

            if (num == 1 || 4) {
                //message.member.createDM()
                message.member.send("You are part of the Mafia!")
            }

            if (num == 2 || 3) {
                //message.member.createDM()
                message.member.send("You are Innocent!");
            } 
    };
});
client.login(process.env.TOKEN);
