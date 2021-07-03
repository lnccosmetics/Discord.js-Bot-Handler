//-----------------------------------------------------\\
const { Client, Collection } = require('discord.js');
const client = new Client();
//-----------------------------------------------------\\
const fs = require('fs');
const { config } = require('process');
//-----------------------------------------------------\\
const Config = require('./config.json');
//-----------------------------------------------------\\
client.Commands = new Collection();
client.Aliases = new Collection();
//-----------------------------------------------------\\
if(Config.Bot_Token === "")return console.log("Please set your bot token in the config.json file!");
//-----------------------------------------------------\\
fs.readdir('./Commands', (err, files) => {
    if(err)console.log(`Command Error: ${err}`);
    let File = files.filter(f => f.split(".").pop() === 'js');
    if(File.length <= 0)return console.log('No commands found!');

    File.forEach((file, i) => {
        let File_Data = require(`./Commands/${file}`);
        console.log(`Loading command: ${file}!`);
        client.Commands.set(File_Data.Data.Command_Name, File_Data);
        client.Aliases.set(File_Data.Data.Command_Aliases, File_Data);
        console.log(`Loaded: ${file}!`);
    })
})
//-----------------------------------------------------\\
client.on('ready', () => {
    console.log(client.user.username + ' Is now online!');
})
//-----------------------------------------------------\\
client.on('message', async message => {
    if(message.author.bot)return;
    if(message.channel.type == 'dm')return message.channel.send('You are unable to run commands in the bot\'s dms!');
    let Message_Split = message.content.split(" ");
    let Command_Name = Message_Split[0];
    let Args = Message_Split.slice(1);
    const Prefix = config.Bot_Prefix;

    let Command_Check = client.Commands.get(Command_Name.slice(prefix.length).toLowerCase())
    let Alias_Check = client.Aliases.Get(Command_Name.slice(prefix.length).toLowerCase())
    if(Command_Check) Command_Check.run(client, message, Args);
    if(Alias_Check) Alias_Check.run(client, message, Args);
})
//-----------------------------------------------------\\
client.login(config.Bot_Token);
//-----------------------------------------------------\\


