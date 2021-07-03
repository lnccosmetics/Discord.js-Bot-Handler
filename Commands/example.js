const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
    // Command code goes here!

    message.channel.send('This is a example command!')
  }

  module.exports.Data = {
//Make sure these are lowercase.

    Command_Name: "example", 
    Command_Aliases: ["example_command", "test"]

  }