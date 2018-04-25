const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const botconfig = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  //!addrole @andrew Dog Person
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply(`Utilisation : !addrole <utilisateur> <rôle>`);
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Vous n'avez pas indiqué de rôle !");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Impossible. Ce rôle est introuvable. (Fonction supprimée par Big Eagle ?)");

  if (rMember.roles.has(gRole.id)) return message.reply("Amusant. Vous vous donnez du mal pour rien, le rôle a déjà attribué.");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`Féliciations, vous avez désormais le rôle de ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Féliciations à <@${rMember.id}>, vous avez désormais le rôle de ${gRole.name}. Une tentative de vous annoncer cela en message privé a échoué, votre messagerie était verouillée.`)
  }
}

module.exports.help = {
  name: "addrole"
}
