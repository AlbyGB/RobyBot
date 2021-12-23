const fs = require('fs');
const { Client, Intents, ClientUser, Collection } = require('discord.js');
const wait = require('util').promisify(setTimeout);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const fileComandi = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of fileComandi) {
    const comando = require(`./commands/${file}`);
    client.commands.set(comando.data.name, comando);
}

client.once('ready', () => {
    console.log('Bot Online!');
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    const nomeComando = interaction.commandName;

    if(!client.commands.has(nomeComando)) return;

    try {
        await client.commands.get(nomeComando).execute(interaction);
    } catch(e) {
        console.error(e);
        await interaction.reply({ content: 'Errore durante l\'esecuzione del comando!', ephemeral: true});
    }
});

client.on('messageCreate', async (message) => {
    if(!client.application?.owner){
        await client.application?.fetch();
    }

    if(message.content.toLowerCase() === '!registra' && message.author.id === client.application?.owner.id){
        const data = [
            {
                name: 'ping',
                description: 'return Pong!',
            },
            {
                name: 'napoli',
                description: 'return mammt!',
            },
            {
                name: 'prova',
                description: 'prova',
            },
            {
                name: 'prova2',
                description: 'prova223',
            },
        ];
        
        /* Global Command
        const comando = await client.application?.commands.create(data);
        console.log(comando);
        */

        const comando = await client.guilds.cache.get('723936718545354763').commands.set(data); // .set invece di .create per sovrascrivere i comandi in data
        console.log(comando);
    }
});

client.login('OTIzNTc1NzI1Mzk3Nzc4NDUy.YcSA7A.0QR1JLdUFF7wOEU-twfiCdQzvpg');