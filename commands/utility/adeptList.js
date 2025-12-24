const { InteractionContextType, SlashCommandBuilder, MessageFlags } = require('discord.js');
const steamWebAPIToken = require('c:/Repos/Adept-List/config.json').steamWebAPIToken;
const http = require('http');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adept-list')
		.setDescription('Retrieve a list of uncompleted adept perks in Dead by Daylight')
		.addStringOption((option) => 
			option
				.setName('steamid')
				.setDescription("Your steam account's 64 bit ID number (google it).")
				.setRequired(true)
			)
		.addStringOption((option) => 
			option
				.setName('category')
				.setDescription('Pick which list you want to retrieve.')
				.setRequired(true)
				.addChoices(
					{ name: 'Incomplete', value: 'incomplete' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'All', value: 'all' }
				)
		),

	async execute(interaction) {
		const steamID = interaction.options.getString('steamid');

		let request = new XMLHttpRequest();
			request.open('GET', `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=381210&key=${SteamWebToken}&steamid=${steamID}&l=en`, async=true);

			request.onload = () => {
				try {	
					let response = JSON.parse(request.responseText);
					let achList = response.playerstats.achievements;

					let completedList = "## COMPLETED CHARACTERS\n";
					let incompleteList = "## INCOMPLETE CHARACTERS\n"

					for (var key in achList){
						if (achList[key].name.substring(0,5)==="Adept"){
							if (achList[key].achieved === 1) {
								completedList = completedList.concat(achList[key].name + "\n");
							} else {
								incompleteList = incompleteList.concat(achList[key].name + "\n");
							}
						}
					}
					if ((completedList.length <= 28) && (incompleteList.length <= 29)) {
						interaction.reply( {content: 'Something went wrong. Please double check that your steam profile visibility is set to public.', flags: MessageFlags.Ephemeral } );
					} else {
						if (interaction.options.getString('category') === 'completed') {
							interaction.reply( { content: completedList, flags: MessageFlags.Ephemeral } );
						} else if (interaction.options.getString('category') === 'incomplete') {
							interaction.reply( { content: incompleteList, flags: MessageFlags.Ephemeral } );
						} else if (interaction.options.getString('category') === 'all') {
							interaction.reply( { content: completedList.concat("\n"+incompleteList), flags: MessageFlags.Ephemeral } );
						} else {
							interaction.reply( {content: 'Something went wrong. Please double check the category picked and try again.', flags: MessageFlags.Ephemeral } );
						}
						console.log(completedList);
						
						console.log(incompleteList);
					}
				} catch (e) {
					interaction.reply( { content: 'Something went wrong, please check your steam ID and ensure your steam profile is publicly visible.', flags: MessageFlags.Ephemeral } );
				}
			};
			request.send();
	}

}