const { Permissions } = require('discord.js')

module.exports = {
    name: "mafia",
    category: "games",
    description: "Create a mafia game for players to join.",
    usage: "`<start | end> [@player1] [@player2] ...`\n**Do not include yourself in the playerlist**",
    aliases: ["maf"],
    run: async (client, msg, args) => {

        let config = client.config.get('config')

        if (args[0] === 'info')
            return msg.reply(`Command Usage: ${config.prefix}${this.name} ${this.usage}\nCommand Aliases: ${this.aliases}`)

        if (client.mafia.get(msg.author.id) && args[0] === 'start')
            return msg.reply('You already have a game going on!').then(m => setTimeout(m.delete(), 1250))

        if (client.mafia.get(msg.author.id) && args[0] === 'end') {

            msg.guild.channels.cache.each(channel => {
                
                let obj = client.mafia.get(msg.author.id)

                for (const c in obj.channelID) {
                    if (c === channel.id) {
                        channel.delete()
                    }
                }
            });

            client.mafia.delete(msg.author.id)
        }

        if (args[0] === 'start') {

            let permArr = [{ id: msg.guild.roles.everyone, deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK] }]

            let users = [];

            for (let i = 0; i <= args.length; i++) {

                if (i === 0)
                    users.push(msg.author.id)
                else
                    args[i] || args[i].id ? users.push(args[i]) : msg.reply(`You didn't provide the proper arguments. Please use @ mention for the other players!`).then(m => { setTimeout(m.delete(), 1250); return; })
            }

            for (u in users) {
                permArr.push({ id: u, allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK] })
            }

            let category = await msg.guild.channels.create(`${msg.author.name.toLowerCase()}-mafia`, { type: 'GUILD_CATEGORY', permisisonsOverwrites: permArr })
            let text = await msg.guild.channels.create(`mafia-text`).setParent(category.id)
            let voice = await msg.guild.channels.create(`mafia-voice`).setParent(category.id)

            const mafObj = {

                playerID: users,
                channelID: [category.id, text.id, voice.id],
                isActive: true,
                isVoting: false
            }

            client.mafia.set(msg.author.id, mafObj)

        }

    } // End of command function
}