const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send("le passage de l'aspirateur est différé ! indiquez ce qu'il faut supprimer...");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Notre aspirateur a effacé ${args[0]} messages.`);
  });
}

module.exports.help = {
  name: "aspi"
}
