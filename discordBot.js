const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const { fetchWeather } = require('./weatherService');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!weather')) {
        const weather = await fetchWeather(config.location, config.weatherAPIKey);
        if (weather) {
            message.reply(`Weather in ${config.location}: ${weather.temp}°C, ${weather.description}`);
        } else {
            message.reply('Could not fetch weather data.');
        }
    }
});

client.login(config.discordBotToken);