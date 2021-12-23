module.exports = {
    data: {
        name: 'prova',
        description: 'prova',
    },
    async execute(interaction){
        await interaction.reply('prova');
    }
}