const { Client, GatewayIntentBits } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const path = require("path");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// When the client is ready, run this code
client.once("ready", () => {
  console.log("Ready!");
});

// When a message is created
client.on("messageCreate", async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("fanum")) {
    // Reply with "Hello!"
    message.reply("Hello!");
  } else if (message.content.toLowerCase().includes("skibidi")) {
    // Reply with "Hello!"
    message.reply("Skibidi Toilet");
  } else if (message.content.toLowerCase().includes("blake")) {
    // Reply with "Hello!"
    message.reply("Hello Blake");
  }

  if (message.content.toLowerCase().includes("oh")) {
    playAudioClipOnMessage(message, "omg.mp3");
  } else if (message.content.toLowerCase().includes("my")) {
    playAudioClipOnMessage(message, "omg.mp3");
  } else if (message.content.toLowerCase().includes("god")) {
    playAudioClipOnMessage(message, "omg.mp3");
  } else if (message.content.toLowerCase().includes("bruh")) {
    playAudioClipOnMessage(message, "bruh.mp3");
  }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  // Check if the user joined a voice channel
  if (!oldState.channelId && newState.channelId && !newState.member.user.bot) {
    const channel = newState.channel;
    const usernameWithDiscriminator = `${newState.member.user.username}`;
    console.log(usernameWithDiscriminator);
    if (usernameWithDiscriminator == "caseydockery") {
      playAudioClipOnJoin(channel, "bruh.mp3");
    } else if (usernameWithDiscriminator == "byakugan102") {
      playAudioClipOnJoin(channel, "soa.mp3");
    } else if (usernameWithDiscriminator == "lemonshark64") {
      playAudioClipOnJoin(channel, "skibidi.mp3");
    } else if (usernameWithDiscriminator == "fartsmella77") {
      playAudioClipOnJoin(channel, "sopranos.mp3");
    } else if (usernameWithDiscriminator == "sneaky_squid12") {
      playAudioClipOnJoin(channel, "gameofthrones.mp3");
    } else if (usernameWithDiscriminator == "mattdoyle") {
      playAudioClipOnJoin(channel, "matthewfart.mp3");
    } else if (usernameWithDiscriminator == "tb128786") {
      playAudioClipOnJoin(channel, "beastboy.mp3");
    } else if (usernameWithDiscriminator == "cashstash2") {
      playAudioClipOnJoin(channel, "frieza.mp3");
    }
  }

  if (oldState.channelId && !newState.channelId && !oldState.member.user.bot) {
    const channel = oldState.channel;

    // Join the channel
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    // Create an audio player
    const player = createAudioPlayer();

    // Get the path to the user's MP3 file
    const audioFilePath = path.join(__dirname, "getout.mp3"); // Make sure this file exists
    const resource = createAudioResource(audioFilePath);

    // Play the audio file
    player.play(resource);

    // Subscribe the connection to the player
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy(); // Leave the voice channel
    });
  }
});

function playAudioClipOnMessage(message, fileName) {
  if (message.member.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    // Create an audio player
    const player = createAudioPlayer();

    // Play the audio file
    const audioFilePath = path.join(__dirname, fileName); // Make sure this file exists
    const resource = createAudioResource(audioFilePath);
    player.play(resource);

    // Subscribe the connection to the audio player
    connection.subscribe(player);

    // Log when the audio finishes playing
    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy(); // Leave the voice channel
    });

    player.on("error", (error) => {
      console.error("Error playing audio:", error);
      connection.destroy(); // Leave the voice channel in case of an error
    });
  } else {
    message.reply("You need to join a voice channel first!");
  }
}

function playAudioClipOnJoin(channel, fileName) {
  // Join the voice channel
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  // Create an audio player
  const player = createAudioPlayer();

  // Get the path to the user's MP3 file
  const audioFilePath = path.join(__dirname, fileName); // Make sure this file exists
  const resource = createAudioResource(audioFilePath);

  // Play the audio file
  player.play(resource);

  // Subscribe the connection to the player
  connection.subscribe(player);

  // Handle audio player events
  player.on(AudioPlayerStatus.Idle, () => {
    connection.destroy(); // Leave the voice channel after the file is played
  });

  player.on("error", (error) => {
    console.error("Error:", error.message);
  });
}
// Login to Discord with your bot token
client.login(process.env.BOT_TOKEN);
