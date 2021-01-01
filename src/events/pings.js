const client = require("../index");
const { Collection, MessageEmbed } = require("discord.js");
const Pings = new Collection();

client.on("message", async (message) => {
  if (!message.mentions.members.first()) return;
  if (message.mentions.members.first().id === message.author.id) return;
  const time = 5000;
  Pings.set(`pinger:${message.author.id}`, Date.now() + time);
  setTimeout(() => {
    Pings.delete(`pinger:${message.mentions.members.first().id}`);
  }, time);
});

client.on("messageDelete", (message) => {
  if (!message.mentions.members.first()) return;
  console.log(1);
  if (Pings.has(`pinger:${message.mentions.members.first().id}`)) {
    message.channel.send(
      new MessageEmbed()
        .setTitle("PING DETECTED!")
        .addField("author", message.author, true)
        .addField("ConteFnt", message.content, true)
        .setColor("RANDOM")
        .setTimestamp()
    );
  }
});
