require('dotenv').config();
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = "#";


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  //Checking for Command in Messages
  if (msg.content.startsWith(`${prefix}play`)) {
    msg.channel.send(execute(msg));
    return;
  } 
  else if (msg.content.startsWith(`${prefix}skip`)) {
    skip();
    return;
  } 
  else if (msg.content.startsWith(`${prefix}stop`)) {
    stop();
    return;
  }
  else {
    msg.channel.send('You need to enter a valid command!')
  }
})

client.login(process.env.DISCORD_TOKEN);

//Start song Queue and Join Voice Channel Function
async function execute(message) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  
  console.log('execute called');
  if (!voiceChannel)//Check user is in voice channel
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) //Check Permission are correct for Bot
  {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }
  

  try {
    console.log('Join VC called');
    // Here we try to join the voicechat and save our connection into our object.
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    })

    // Calling the play function to start a song
    play();
  } catch (err) {
    // Printing the error message if the bot fails to join the voicechat
    console.log(err);
    return message.channel.send(err);
  }
}

//Skip Command Function
function skip() {
  console.log('Skip called');
}

//Stop Command Function
function stop() {
  console.log('Stop called');
}

//Play Command Function
function play() {
  console.log('play called');
}