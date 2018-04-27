const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json")


module.exports.run = async (bot, message, args) => {
 
  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Non, non, non. Vous n'êtes pas Big Eagle tout puissant :smirk: ");
  if(!args[0] || args[0 == "help"]) return message.reply(`Utilisation: !prefix <nouveau préfixe>`); 
  
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // changement de la config
  config.prefix = newPrefix;

  // sauvegarde de la config
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

   
  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Nouveau Prefix défini !")
  .setDescription(`Prefix changé en ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix"
}
