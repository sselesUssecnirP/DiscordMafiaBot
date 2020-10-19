const { Client, MessageEmbed, Guild, Channel, ChannelManager } = require("discord.js");

module.exports = {
    name: "server",
    category: "general",
    description: "Gives information on the server",
    run: async (client, message, args) => {
        const author = message.author.username;
        const avatarURL = message.author.displayAvatarURL();
        const botAvatarURL = client.user.displayAvatarURL();
        const botRoleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        const server = new MessageEmbed()
        .setColor(botRoleColor)
        .setDescription()
        .setTimestamp()
        .setAuthor(client.user.username, botAvatarURL)
        .setFooter(client.user.username, botAvatarURL)
    }
}