const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Constants } = require('discord.js')

const ascii = require('ascii-table');

const lcommands = new ascii().setHeading("Command (New)", "Aliases", "Load Status")

module.exports = (client) => {

    /*
        C O M M A N D S
    */

    readdirSync("./Modules/Commands").forEach(dir => {
        const commands = readdirSync(`./Modules/Commands/${dir}/`).filter(f => f.endsWith('.js'))
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            console.log(`File ${file} located at ../commands/${dir}`)
    
            if (pull.name) {
                client.commands.set(pull.name, pull)
                console.log(`created command ${pull}`)
                lcommands.addRow(`${pull.name}`, `${pull.aliases}`, '✅')
            } else {
                lcommands.addRow(file, '', '❌ -> missing something??')
                continue;
            }
        }
    
        
            
    });

    console.log(lcommands.toString())
}
