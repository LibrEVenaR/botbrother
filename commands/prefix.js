const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;
  

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Non, non, non. Vous n'êtes pas Big Eagle tout puissant :smirk: ");
  if(!args[0] || args[0 == "help"]) return message.reply(`Usage: ${prefix}prefix <nouveau préfixe>`); 

    // changement de la config
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };     
    // sauvegarde de la config
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Nouveau Prefix défini !")
  .setDescription(`Prefix changé en ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix"
}
