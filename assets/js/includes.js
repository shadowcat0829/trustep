/* Load the shared footer while keeping #footer as the layout container. */
(function ($) {
	'use strict';

	$(function () {
		$('#footer').load('footer.html', function (response, status, xhr) {
			if (status !== 'error') return;
			console.error('Unable to load the shared footer.', xhr.status);
			$(this).empty().append(
				$('<a>').attr('href', 'mailto:trustepyeg@gmail.com')
					.text('Contact Us: trustepyeg@gmail.com')
			);
		});
	});
})(jQuery);
