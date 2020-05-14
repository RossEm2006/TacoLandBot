const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = ">";
const token = 'BOTTOKEN'; // IMPORTANT! CHANGE TOO YOUR BOT TOKEN!
const log_channel = 'LOGCHANNELID'; // IMPORTANT! CHANGE TOO YOUR LOG CHANNEL ID!
const ping = require("minecraft-server-util");
const version = "1.7";
const serverBotID = "<@701382735226470432>";
client.on("ready", () => {
    console.log("This bot is online!");
    client.user.setActivity("mc.taco-land.net", { type: "WATCHING" });
    client.channels.cache.get(log_channel).send(`@here, ${serverBotID} started with version ${version} and prefix '${prefix}'`);
    
});

client.on("message", msg => {
    if (msg.channel.type === "dm" || msg.author.bot || msg.author == client.user) return; // If type is DM or IS Bot or Himself then ignore
    if (!msg.content.startsWith(prefix))return;  // If message dosen't contain prefix then ignore
    let args = msg.content.slice(prefix.length).trim().split(/ +/g); // Removes prefix from message
    let cmd = args.shift().toLowerCase(); // Make the command lowercase
    let { jokes } = require("./jokes.json")
    const author = msg.author.toString();
    const rest = args.join('')


    // Commands
    if (cmd == "version"){ //version
      msg.channel.send("My current version is: " + version);
    }


  
      if(cmd == "to"){
        if(args[0] == "the"){
          if(args[1] == "place"){
            if(args[2] == "i"){
              if(args[3] == "belong"){
                msg.channel.send("West-Virginia")
              }
            }
          }
        }
      }
  if (cmd == "leaderboard"){ //shows leaderboard
  msg.channel.send("https://mee6.xyz/leaderboard/684799824469819407")
  }

  if (cmd == "mop") return msg.channel.send( jokes[Math.floor( Math.random() * jokes.length )] ) //Sends a random line from jokes.json
  
    if (cmd == "u") { // Test command
        if (args[0] == "there?") {
            msg.channel.send("yeh");
        } else {
            return;
        }
    }
    if(cmd == "store" || cmd == "shop") { //shop command
        msg.channel.send('The shop is under construction. PLEASE KEEP YOUR MONEY')
    }
    if (cmd == "ip") { // Sends the IP of the server.
        msg.channel.send("The ip is: mc.taco-land.net Why are you here when you don't know?");
    }
    if (cmd == "website" || cmd == "web") { // Sends the URL of the server website.
        msg.channel.send("https://mc.taco-land.net your welcome!");
    }
    if (cmd == "bans") { // Sends the URL of the server bans.
        msg.channel.send("https://mc.taco-land.net/bans Why? Are you banned?");
    }
    if (cmd == "ty"){ //meme command
      msg.channel.send("your welcome")
    }
    if (cmd == "ja") { //meme command
    if (args[0] == "man") {
      msg.channel.send("ik wil er twee");
    }
    }
    /*if (cmd == "test"){
     if(!author.hasPermission(Permission.KICK_MEMBERS)) {
        msg.reply("You don't have permission to kick people!");
           }else{
    msg.reply("success")
   }
    if (cmd == "kick"){
      var member= msg.mentions.members.first();
      member.kick().then((member) => {
        msg.channel.send(member.displayName + "has been successfully kicked");
      }).catch(() => {
        msg.channel.send("Access denied");
      });
      }*/
    if (cmd == "hotel?") { //meme command
          msg.channel.send("trivago.");
	}
	if (cmd == "bren") { //meme command
		msg.channel.send("houd van kaas + mayo")
	}
    if (cmd == "help") { //Help command
      
      if (args[0] == ">"){
        msg.channel.send("Here's help for bot <@701382735226470432>")
	msg.channel.send("commands for <@701382735226470432>: >online, >website, >bans, >shop, >help, >ip, >u there?, >clearchat, >mop, >version, >leaderboard")
	msg.channel.send("<@701382735226470432> is used for server chats, and custom commands.")
      }else if (args[0] == "!"){
	msg.channel.send("Here's help for bot <@159985870458322944>")
	msg.channel.send("commands for <@159985870458322944>: !u-there, !rank")
	msg.channel.send("<@159985870458322944> is user for levels and moderation")
      }else if (args[0] == "inv!"){
      	msg.channel.send("Here's help for bot <@409875566800404480>:")
      	msg.channel.send("Commands for <@409875566800404480>: inv! invites {user}.")
      	msg.channel.send("<@409875566800404480> is for managing invites.")
      }else if (args[0] == "$"){
        msg.channel.send("Here's help for bot <@235088799074484224>:")
        msg.channel.send("Commands for <@235088799074484224>: https://rythmbot.co/features#list")
        msg.channel.send("<@235088799074484224> is used for music")
      }
      else{
	 msg.channel.send("Please use >help (bot prefix)")
	}
    }

    if (cmd == "online") { // Checks if server is online.
        ping("mc.taco-land.net", 25565, (err, res) => {
            if(err){ msg.channel.send("The server is offline <@&692044365232734261> ");}
            else{msg.channel.send("The server is online, check server chats wich servers are online. Still offline? then you need to buy a new computer!");}
      });}

    if (cmd == "clearchat" || cmd == "purge") { // Clear the discord server messages.
        let deleteAmount = args[0];
        if (args[0] > 100) {
            msg.channel.messages.fetch().then(messages => msg.channel.bulkDelete(messages)).catch(err => {
                if(err.message === "You can only bulk delete messages that are older than 14 days.") {
                    msg.reply("You cannot delete messages that are older than 14 days.");
                } else {
                    client.log(err);
                    msg.reply("Something went wrong, please report this issue!");
                }
            });
        } else if (deleteAmount) {
            msg.channel.messages.fetch({ limit: deleteAmount }).then(messages => msg.channel.bulkDelete(messages)).catch(err => {
              if(err.message === "You can only bulk delete messages that are older than 14 days.") {
                  msg.reply("You cannot delete messages that are older than 14 days.");
              } else {
                  client.log(err);
                  msg.reply("Something went wrong, please report this issue!")
              }
            });
        } else {
            msg.reply("Wrong usage. " + prefix + "clearchat <amount>");
        }
    }
    // Logs command into the log channel!

    client.channels.cache.get(log_channel).send(`${author} used ${prefix}${cmd} ${rest}`);
});

client.login(token);
