///dépendances
const Discord = require("discord.js");
require("opusscript");
require ("node-opus");
const fs = require("fs");
const snekfetch = require('snekfetch');
const ytdl = require('ytdl-core');
///fonctionnalités
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 5;
//partition
const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
///commandes
fs.readdir("./commands/", (err, files) => {
 
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Commande introuvable.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", () => {
  // Au démarrage réussi du bot.
  console.log("C'est parti !"+`${bot.user.username} est en ligne avec ${bot.guilds.size} serveurs!`); 
  // Attention utilisation de bot.user plutôt que de client.user
  bot.user.setStatus("online");
  bot.user.setActivity(`les caméras de surveillance de ${bot.guilds.size} serveurs pour le compte de Big Eagle`, { type: 'WATCHING' });

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("Erreur. Il y a 5 secondes de délai avant une prochaine commande !")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

bot.login(tokenfile.token);
