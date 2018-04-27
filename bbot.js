//partition
const config = require("./config.json");
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

bot.on('guildMemberAdd', member => {
  //Bienvenue
  member.createDM().then(channel => {
    return channel.send("Bienvenue sur l'un des serveurs du Journal communautaire d'Elvenar France, "+ member.displayName + "! Merci de l'avoir rejoint. Pour toute question, adressez-vous au rédacteur en chef (Thorondhor#1811) qui vous répondra le plus rapidement possible. " )
  }).catch(console.error);
  const channel = member.guild.channels.find(`name`,"ℹ-ᴀɴɴᴏɴᴄᴇ",);
  // en cas de pb
  if (!channel) return;
  // msg bvn
  message.channel.send({embed: {
    color: 357659,
    description: `${member} nous a rejoint ! Bienvenue !`
  }});  
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
  
})

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(message.content.indexOf(config.prefix) !== 0) return;

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

  let commandfile = bot.commands.get(cmd.slice(config.prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

bot.login("NDM1NzkyMjg0MTQ4MzAxODI1.DcJF7Q.vXaMaFPbUP73Ds0-w2sqdvAkCRo");
///process.env.BOT_TOKEN
