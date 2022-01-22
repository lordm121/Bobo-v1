/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require('moment');
const cooldown =  new Set();



module.exports = class{

async run(message, channel) {

if(!message || !channel) return;


const guild = await Guild.findOne({ guildID: message.guild.id })


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

if(cooldown.has(message.guild.id)) return;

if (message.name.indexOf('Room') >= 0) return;

if(guild){
if(guild.plugins.modlogs){



const channelEmbed = await message.guild.channels.cache.get(guild.plugins.modlogs)

if(channelEmbed){

let color = config.embed.Color




if(channel.type === "GUILD_TEXT","GUILD_VOICE"){

    const embed = new discord.MessageEmbed()
    .setDescription(`:pencil: ***Channel Created***`)
    
    .addField('Channel Name', channel.name, true)
    .addField('Channel Type', 'Text Channel', true)
    .setFooter(`Channel ID: ${channel.id}`)
    .setTimestamp()
    .setColor(color)
  
   if(channel.parent && channel.type !== 'category')embed.addField(`Parent Name`, channel.parent.name)
  
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channel.send({embeds:[embed]}).catch(()=>{})
            cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }

} else {

    const embed = new discord.MessageEmbed()
    .setDescription(`🆕 ***Channel Created***`)
    .addField(`Channel Name ${channel.name}`)
    .addField(`Channel Type ${channel.type}`)
    .setFooter(`Channel ID: ${channel.id}`)
    .setTimestamp()
    .setColor(color)
     
    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channel.send({embeds:[embed]}).catch(()=>{})
                   cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }

}

  }


  }
 }
}


  }