const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

const moment = require("moment");

const { WebhookClient } = require("discord.js");
///const webhookClient = new WebhookClient(data);
const data ={
  id: config.webhook.id,
  token:config.webhook.token}
const webhookClient = new WebhookClient(data)
let uniqid = require("uniqid");


module.exports = {
data: new SlashCommandBuilder()
.setName("redeem")
.setDescription("redeem code")
.addStringOption(option =>
option.setName('code')
.setDescription('code of redeem')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
let code = interaction.options.getString('code')
    
    const guildDB = await Guild.findOne({
      guildID: interaction.guild.id
    });

    

    if (guildDB.isPremium === "true") {
      return interaction.reply({
        content: `the current guild is already premium`
      });
    }

    const premium = await Prime.findOne({
      code: code
    });

    if (premium) {
      const expires = moment(Number(premium.expiresAt)).format(
        "dddd, MMMM Do YYYY HH:mm:ss"
      );

      guildDB.isPremium = "true";
      guildDB.premium.redeemedBy.id = interaction.user.id;
      guildDB.premium.redeemedBy.tag = interaction.user.tag;
      guildDB.premium.redeemedAt = Date.now();
      guildDB.premium.expiresAt = premium.expiresAt;
      guildDB.premium.plan = premium.plan;

      await guildDB.save().catch(() => {});

      await premium.deleteOne().catch(() => {});

      let ID = uniqid(undefined, `-${code}`);
      const date = require("date-and-time");
      const now = new Date();
      let DDate = date.format(now, "YYYY/MM/DD HH:mm:ss");

     /* try{*/
        let dv = new Discord.MessageEmbed()
          .setDescription(
            `**Premium Subscription**\n\nYou've recently redeemed a code in **${interaction.guild.name}** and here is your receipt:\n\n **Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**User  Name:** ${interaction.user.username}\n**User ID:** ${interaction.user.id}`
          )
          .setColor("RANDOM")
          .setFooter(interaction.guild.name);
       /* return message.author.sen({ embeds: [dv] })
          message.channel.send({content:`Check Your Dm ✅`}).catch((err)=>{*/
     // } catch (err) {
     //   console.log(err);
        let embed = new Discord.MessageEmbed()
          .setDescription(
            `**Congratulations!**\n\n**${interaction.guild.name}** Is now a premium guild! Thanks a ton!\n\nIf you have any questions please contact me [here](r)\n\n**Could not send your Reciept via dms so here it is:**\n**Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**Guild Name:** ${interaction.guild.name}\n**Guild ID:** ${interaction.guild.id}\n\n**Please make sure to keep this information safe, you might need it if you ever wanna refund / transfer servers.**\n\n**Expires At:** ${expires}`
          )
          .setColor("RANDOM")
          .setFooter(interaction.guild.name);
        return interaction.reply({ embeds: [embed] });


      let embed2 = new Discord.MessageEmbed()
        .setDescription(
          `**Congratulations!**\n\n**${interaction.user.username}** Is now a premium User! Thanks a ton!\n\nIf you have any questions please contact me [here](${config.support})\n**your receipt has been sent via dms**\n\n**Expires At:** ${expires}`
        )
        .setColor("RANDOM")
        .setFooter(interaction.guild.name);
     return interaction.reply({ embeds: [embed2] });
    
      
      const embedPremium = new Discord.MessageEmbed()
        .setDescription(
          `**Premium Subscription**\n\n**${interaction.user.tag}** Redeemed a code in **${interaction.guild.name}**\n\n **Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**Guild Name:** ${interaction.guild.name}\n**Guild ID:** ${interaction.guild.id}\n**Redeemer Tag:** ${interaction.user.tag}\n**Redeemer ID:** ${interaction.user.id}\n\n**Expires At:** ${expires}`
        )
        .setColor("RANDOM");

     return webhookClient.send({ embeds: [embedPremium] });
    } else {
      return interaction.reply({
        content: ` I could not the following Code.`
      });
    }  
    
    
    
    
    
    
  }}
    
    