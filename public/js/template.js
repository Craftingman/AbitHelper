let pathnameUrl = window.location.pathname;
let hrefUrl = window.location.href;

$("nav a").each( function() {
	let link = $(this).attr("href");

	if (pathnameUrl == link || hrefUrl == link) {
		$(this).addClass("active");
	}
});
