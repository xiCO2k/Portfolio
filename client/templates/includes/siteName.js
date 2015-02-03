Template.siteName.helpers({
	home: function () {
		var name = Router.current().route.getName();
		return name === 'home';
	},
	logoSet: function () {
		var logo = getSetting('logoUrl');
		return !! logo;
	},
	titleSet: function () {
		var title = getSetting('title');
		return !! title;
	}
});