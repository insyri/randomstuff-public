const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Discord.Client();
const prefix = config.prefix;

fs.readFile('./token.txt', 'utf8', function(err, data) {
    if (err) throw err;
    client.login(data).catch(err => console.error(err))
});

//screw you im not making a command handler
//teach me pls tho 🥺

client.on('message', async message => {
    if(message.channel.type === 'dm'){
        fs.readFile('./channel.txt', 'utf8', function(err, data) {
            if (err) throw err;
            if(data === undefined || data === "") return;
            const modchannel = client.channels.cache.get(data)
            modchannel.send(`DM Message from \`${message.author.tag}\` **||\`${message.author.id}\`||**\n${message.content}`)
        });
    }
    if(message.content.startsWith(prefix + "setrespondchannel")){
        var args = message.content.split(" ");
        if(message.mentions.channels.size >= 1){
            //channel mention
            var channel = message.mentions.channels.first().id;
        } else if(message.guild.channels.cache.get(args[1]) !== undefined){
            //channel id
            var channel = args[1];
        } else if(message.guild.channels.cache.find(channel => channel.name === args[1])){
            //channel name
            var channel = message.guild.channels.cache.find(channel => channel.name === args[1]).id;
        } else {
            message.reply("I couldn't find that channel!")
            return;
        }
        if(channel === undefined){
            message.reply("provided channel returned undefined, likely an error");
            return;
        }
        fs.writeFile('./channel.txt', channel, (err) => {
            if (err) throw err;
            message.reply("saved!")
        })
    }
})

//dont say anything about how i didnt use the json file correctly