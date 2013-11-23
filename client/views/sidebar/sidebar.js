Template.sidebar.events({
	'click .sidebar-toggle': function(e){
    e.preventDefault();
		$('body').toggleClass('sidebar-open');
	}
})
