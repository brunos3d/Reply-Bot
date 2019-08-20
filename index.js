const http = require('http');

const { Client, RichEmbed } = require("discord.js");
const client = new Client();

const BOT_TOKEN = process.env.BOT_TOKEN;

const server = http.createServer((req, res) => {
	try {
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
							const matches = pattern.exec(message.content);

							if (matches != null && matches.length > 1) {
								const messageId = matches[1];

								message.channel.fetchMessage(messageId).then(replyMessage => {
									sendMessageBox(message.channel, message.author, replyMessage, 0x008fff);
								});
								// }).then(() => message.delete());
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
		res.write(JSON.stringify({ status: 'online' }));
	}
	catch {
		res.write(JSON.stringify({ status: 'error' }));
	}
});

server.listen(process.env.PORT || 8080);

