$.fn.ajaxOverlay = function(options) {
	var opts = $.extend({}, $.fn.ajaxOverlay.defaults, options); 

	if ( opts.action == 'start' )
		$(this).data('position', $(this).css('position'));
        $(this).data('overflow', $(this).css('overflow'));
        $(this).css('position', 'relative');
        $(this).css('overflow', 'hidden');

        $('<div class="ui-overlay"><div class="ui-block-message ui-gif-loading"></div><span class="ui-text-loading">'+ opts.text +'</span></div>').css({
            top: 0 + $(this).scrollTop(),
            left: 0 + $(this).scrollLeft(),
            width: $(this).outerWidth(),
            height: $(this).outerHeight()
        }).appendTo($(this));

};

$.fn.ajaxOverlay.defaults = {
	action: 'start',
    text: 'Cargando...',

};