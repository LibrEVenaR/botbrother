const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if(args[0] == "help"){
    message.reply(`Utilisation: !removerole <utilisateur> <rôle>`);
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("On dirait que ce membre n'existe pas.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("et si vous précisiez le nom du rôle ? ça marccherait peut-être mieux...");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("impossible. Ce rôle est introuvable. (Fonction supprimée par Big Eagle ?)");

  if(!rMember.roles.has(gRole.id)) return message.reply("Amusant. Vous vous donnez du mal pour rien, le rôle n'est déjà pas attribué.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Triste jour, vous venez de perdre le rôle de ${gRole.name}.`)
  }catch(e){
    message.channel.send(`Triste jour pour <@${rMember.id}>, vous venez de perdre le rôle de ${gRole.name}. \n Une tentative de vous annoncer cela en message privé a échoué, votre messagerie était verouillée.`)
  }
}

module.exports.help = {
  name: "removerole"
}
