module.exports = {
    data: {
        name: 'ping',
        description: 'return Pong!',
    },
    async execute(interaction){
        await interaction.reply('Pong!');
    }
}