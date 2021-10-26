module.exports = {

    name: "ready",
    description: "A event emitted when the bot is ready for work.",
    run: (client) => {

        client.on('ready', () => {

            console.log('Ready to play games!')
        });
    }
}