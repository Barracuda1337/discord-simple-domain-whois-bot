const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType, Discord} = require('discord.js');
const whois = require('whois')
const splitArray = require('split-array');
const axios = require("axios");
const setting = require("../config.js")
exports.run = async (client, message, args) => {

  let domain = args.join(" ")
  if (domain.length < 1) return message.channel.send({ content: `please enter a domain` }).then(message => setTimeout(() => message.delete(), 5000))
  if (domain == 'client.token') return message.channel.send({ content: `The block of code you are running appears to be malicious.` }).then(message => setTimeout(() => message.delete(), 5000))

    try {
    

      const options = {
        method: 'GET',
        url: 'https://whoisjson.com/api/v1/whois',
        params: {domain: domain},
        headers: {
          'Authorization': `Token=${setting.apis.key}`
        }
      };
       
      axios.request(options).then(function (response) {
        const Embed = {
          color: `${response.data.registered == true ? 0xFF0000 : 0x00ff00 }` ,
          title: `${response.data.name}`,
          url: 'https://' + `${response.data.name}`,
          author: {
            name: `${response.data.name}`,
            icon_url: 'https://icon.horse/icon/' + `${response.data.name}`,
            url: 'https://' + `${response.data.name}`,
          },
          description: `${response.data.status}`,
          fields: [
            {
              name: 'NameServers',
              value: `${response.data.nameserver}`,
            },
            {
              name: 'Registrar',
              value: `${response.data.registrar}`,
              inline: false,
            },
            {
              name: 'Created',
              value: `${response.data.created}`,
              inline: true,
            },
            {
              name: 'Changed',
              value: `${response.data.changed}`,
              inline: true,
            },
            {
              name: 'Expires',
              value: `${response.data.expires}`,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString()
        };

        
    message.channel.send({ embeds: [Embed] })

        //  console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
       
      
    } catch (err) {
      console.log(err);
    }


     
}

exports.conf = {
  aliases: ['whois']
}

exports.help = {
  name: 'whois',
  description: 'simple domain whois.'
}
