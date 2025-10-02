const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const TOKEN = process.env.BOT_TOKEN;
const FEEDBACK_API_URL = 'https://your-vercel-app.vercel.app/api/feedback';

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: ['CHANNEL'],
});

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.channel.type !== 1 || message.author.bot) return;

  try {
    await axios.post(FEEDBACK_API_URL, {
      userId: message.author.id,
      username: message.author.tag,
      message: message.content,
    });

    await message.reply("✅ Your feedback was received. Thanks!");
  } catch (err) {
    console.error(err);
    await message.reply("❌ Couldn't send feedback.");
  }
});

client.login(TOKEN);
