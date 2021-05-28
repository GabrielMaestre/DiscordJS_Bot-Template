const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;

const myGuildID = '000000000000000000';
const ownerID = '000000000000000000';
const botID = '000000000000000000';
const roleAdmin = '000000000000000000';

//=================================================//
//  BY: PINGUIN.ZIP  ││  Discord: PINGUIN.ZIP#4931 //
//  DATE: 27/05/21   ││  Version: 1.0              //
//=================================================//

const fs = require('fs');
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("No Commands Find");
      return;
    }
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);//Choose your Commands folder//
        console.log(`${f} - Loaded`);
        client.commands.set(props.help.name, props);
        // client.commands.set(props.help.alias, props);
    });
    console.log(`Commands Loaded: ${jsfile.length}.`);
});

client.on('ready', () => {
    console.log(`Total Servers: ${client.guilds.cache.size}.`);
    console.log(`Total Members: ${client.users.cache.size}.`);
    //DEFINIR RICH-PRESENCE
    client.user.setActivity(`Bot Template By: PINGUIN.ZIP#4931`, {type: 'WATCHING'});
});


client.on('message', msg => {

    //Ignore Others Bot CMD
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    //Return DM Cmd
    if (msg.channel.type == "dm") return;
    //Check content is a Prefix without CMD
    if (msg.content == prefix) return;
    
    let content = msg.content.split(" ");
    let command = content[0];
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    
    //checks if message contains a command and runs it
    let commandfile = client.commands.get(command.slice(prefix.length));
    //check if msg is a command
    if(!(commandfile)) return;

    try {
        //Pass to the Command File; Message + Arguments + Cliente (necessary most time) + Role
     if(commandfile) commandfile.run(msg, args, client, roleAdmin);
    } catch (e) {
      console.error(e);
    }


});

client.login(token);