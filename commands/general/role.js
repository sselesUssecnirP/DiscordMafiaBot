const { Client, MessageEmbed, Channel, DMChannel } = require("discord.js");
const { getRandom } = require("../../functions.js");


module.exports = {
    name: "role",
    aliases: [],
    category: "general",
    description: "Allows the user to acquire a mafia role.",
    run: async (client, message, args) => {
        let num = Math.round(Math.random * 3)
        console.log(num);
        if (num = 2) {
            message.channel.send('You are a townie!')
        } else if (num = 1 || 0 || 3) {
            message.channel.send('You are a mafia member!');
        };
    }
};