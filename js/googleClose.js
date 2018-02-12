function closeFunction() {
	if (document.referrer == "") {
		window.open("https://www.google.com","_self")
	} else {
		window.history.back()
	}
}