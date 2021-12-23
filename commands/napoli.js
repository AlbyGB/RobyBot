module.exports = {
    data: {
        name: "napoli",
        description: "return mammt!",
    },
    async execute(interaction){
        await interaction.reply('Mammt!');
    }
}