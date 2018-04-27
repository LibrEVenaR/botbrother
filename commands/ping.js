require("opusscript");
require ("node-opus")
module.exports.run = async (bot, message, args) => {
   m = await message.reply("Ping ? Big Eagle is watching YOU.");
m.edit(`Pong! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(bot.ping)}ms`);
      }
module.exports.help = {
  name: "ping"
};
