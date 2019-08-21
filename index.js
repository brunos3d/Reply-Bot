const express = require('express');
const app = express();
const http = require('http').Server(app);

const { Client, RichEmbed } = require("discord.js");

const client = new Client();

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

http.listen(PORT, () => {
	console.log('listening on *:' + port);
});

if (BOT_TOKEN) {
	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);
	});

	client.on('message', message => {
		if (message.author.id != client.user.id) {
			console.log("[" + message.author.username + "] " + message.content);

			if (message.content != null && message.content.length > 0) {
				if (message.content.includes('@')) {
					const pattern = /@([0-9]+)/g;
					const matches = message.content.match(pattern);

					if (matches != null && matches.length > 0) {
						matches.forEach(match => {
							const messageId = match.replace('@', '');

							message.channel.fetchMessage(messageId).then(replyMessage => {
								sendMessageBox(message.channel, message.author, replyMessage, 0x008fff);
							});
						});
					}
				}
				if (message.content.includes('!@')) {
					message.delete();
				}
			}
		}
	});

	function sendMessageBox(channel, user, message, color) {
		const embed = new RichEmbed();

		embed.setAuthor(message.author.username, message.author.avatarURL);
		embed.setDescription(message.content);
		// embed.setImage(message.attaurl);
		embed.setFooter(user.username);
		embed.setTimestamp(message.createdAt);
		embed.setColor(color);

		return channel.send(embed);
	}

	client.login(BOT_TOKEN);
}

