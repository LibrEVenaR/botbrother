const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
        message.delete().catch(O_o=>{}); 
		if (!message.mentions.users.size) {
			return message.channel.send(`Votre avatar est : ${message.author.displayAvatarURL}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username} utilise cet avatar : ${user.displayAvatarURL}`;
		});

		message.channel.send(avatarList);
	};

module.exports.help = {
  name:"avatar"
}
