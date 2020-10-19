const { Client, MessageEmbed, Channel  } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get.get(args[0]);
        
        if (Channel.name !== 'reports') {
            return message.reply("Please use this command in #reports").then(m => m.delete(5000));
        }

        if (!rMember) {
            return message.reply("Couldn't find that person!").then(m => m.delete(5000));
        }

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot) {
            return message.reply("Can't report that member!").then(m => m.delete(5000));
        }
        
        if (!args[1]) {
            return message.channel.send("Please provide a reason for the report!").then(m => m.delete(5000));
        }

        if (!channel) {
            return message.channel.send("I could not find a \'#reports\' channel.").then(m => m.delete(5000));
        }

        const reported = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported Member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.id})
            **> Reported by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        return message.channel.send(reported);
    }
}