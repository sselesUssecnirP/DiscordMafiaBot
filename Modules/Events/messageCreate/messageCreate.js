module.exports = {

    name: "messageCreate",
    description: "An event emitted when a message is created.",
    run: async (client) => {

        const config = await client.config.get('config')

        client.on('messageCreate', message => {


            console.log(`${JSON.stringify(config)} /// ${config.prefix} /// ${config.owner}`)
            console.log('received message')

            if (!message.content.startsWith(config.prefix))
                return;

            if (message.content.startsWith(config.prefix)) {

                let args = message.content.slice(config.prefix.length).split(/ +/)
                let command = args.shift().toLowerCase()

                console.log(`---
                A command (${command}) was called with these args: ${args}
                ---`)

                let cmd = client.commands.get(command);
                if (!cmd)
                    cmd = client.commands.get(client.aliases.get('command'))
                

                setTimeout(() => message.delete(), 200)

                if (cmd)
                    cmd.run(client, message, args)
            }
        });
    }
};