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
		const msg = message.content;
		if (message.author.id != client.user.id) {
			console.log("[" + message.author.username + "] " + msg);

			if (msg.includes("!del")) {
				console.log('deleting reply message');
				message.delete(3000);
			}

			if (msg != null && msg.length > 0) {
				if (msg.includes('@')) {
					console.log('repling message');

					const pattern = /@([0-9]+)/g;
					const matches = msg.match(pattern);

					if (matches != null && matches.length > 0) {
						matches.forEach(match => {
							const messageId = match.replace('@', '');

							message.channel.fetchMessage(messageId).then(replyMessage => {
								console.log('sending reply message');
								sendMessageBox(message.channel, message.author, replyMessage, 0x008fff);
							});
						});
					}
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

