module.exports = {
    name: "delete",
    category: "moderation",
    description: "deletes between 1 and 1000 of the previous messages up 1 week old",
    run: async (client, message, args) => {
        const { MessageEmbed } = require("discord.js");
        const author = message.author.username;
        const avatarURL = message.author.displayAvatarURL();
        const botAvatarURL = client.user.displayAvatarURL();
        const botRoleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        const invalidArgs = new MessageEmbed()
        .setColor(botRoleColor)
        .setDescription("Confused Pikachu Face - Invalid arguments")
        .setTimestamp()
    
        const tooManyArgs = new MessageEmbed()
        .setColor(botRoleColor)
        .setDescription("Confused Pikachu Face - Too many arguments")
        .setTimestamp()

        if (args >= 1 && args <= 1000) {
            channel.bulkDelete(args);
        } else if (args.length >= 2) {
            message.channel.send(tooManyArgs)
        } else {
            message.channel.send(invalidArgs)
        } 

    }
}