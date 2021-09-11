const { MessageEmbed } = require('discord.js');
const UserData = require('../Schema/UserData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');
const { MessageButton } = require('discord-buttons');


module.exports = {
  name: "sablon",
  aliases: [""],
  run: async(client, message, args) => {

    
    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
    message.channel.send(embed).sil(10)
    } 


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!user || user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position) return embed("Bu kullanıcıyı kayıtsıza atamam veya bir kullanıcı belirtmedin.")
    if (!message.member.voice.channel) return embed("Önce sesli kanala girmen gerekiyor")
    if (!member.voice.channel) return embed("Etiketlediğin kullanıı seste bulunmuyor!")

    var button_1 = new MessageButton()
    .setID("OK")
    .setLabel("✅")
    .setStyle("green")

    var button_2 = new MessageButton()
    .setID("NO")
    .setLabel("✖")
    .setStyle("red")

    await message.channel.send(`${user}`).then(x => x.delete({ timeout: 1000 }))    
    
    let msgembed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))
    .setDescription(`${user}, ${message.author} seni kendi ses kanalına çekmek istiyor. Kabul ediyor musun? **(Timeout: 20sn)**`)
    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
    .setTimestamp();

    let msg = await message.channel.send({ buttons : [ button_1 ], embed: msgembed})
    
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 20000 })

      collector.on("collect", async (button) => {
      message.react(settings.Yes)
      if(button.id === "OK") {
      await button.think(true)
      await button.reply.edit(`${user} adlı kullanıcı başarıyla ${message.author} adlı kişinin odasına çekildi.`)
      user.voice.setChannel(message.member.voice.channel.id)  
    }else if(button.id == "NO"){
        await button.think(true)
        await button.reply.edit(`${user} adlı kullanıcı isteğinizi reddetti.`)
    }
    });

    collector.on("end", async () => {
        msg.delete();
      });  
  }
}
