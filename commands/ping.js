const Discord = require("discord.js");

module.exports.run = async (msg, args, client, roleAdmin) => {

    if(msg.guild.roles.cache.find(role => role.id == roleAdmin))
       {
           msg.reply("PONG");
       }
    else
    {
        msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }

}

module.exports.help = {
    name: 'ping',
	description: 'Simple Ping Command'
};