const { getMember, formatDate } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    category: "info",
    description: "Displays information of the specified user",
    aliases: ["userinfo", "uinfo"],
    usage: "[username | id | mention]",
    run: async (client, message, args) => {

        const member = getMember(message, args.join(" "));

        // Member Variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        // User Variables
        const created = formatDate(member.user.createdAt);

        const uinfo = new MessageEmbed()
            .setFooter(member.displayname, member.user.displayAvatarURL)
            .setThumbnailmember(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField('Member Information', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField(`User Information`, stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created at:** ${created}`)

            .setTimestamp()

        if (member.user.presence.game) {
                uinfo.addField('Current playing', `**> Name:** ${member.user.presence.game.name}`)
        };

        message.channel.send(uinfo)
    }
}