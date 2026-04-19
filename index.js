const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const weatherService = require('./weatherService');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!weather')) {
        const weatherData = await weatherService.getWeather();
        message.channel.send(`Current weather: ${weatherData}`);
    }
});

client.login(config.token);