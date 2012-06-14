;(function($, window, undefined) {
    //$.fn.ajaxOverlay = function(options) {

        var Overlay = function(elem, opciones) {

            this.elem  = elem;
            this.$elem = $(elem);

            if(this.init) {
                this.init(opciones);
            }
        }

        Overlay.prototype = {
            // Contiene los elementos de la plataforma.
            defaults : {
                message: 'Cargando...',
                fadeout: 500,
            },
            init: function(opciones) {

                this.config = $.extend({}, this.defaults, opciones);
                this.$contenedor = this.$elem;
                this.$contenedor.css('position', 'relative');
                this.$div_over = $('<div class="ui-overlay"></div>'); // Contenedor principal del overlay
                this.$div_message = $('<div class="ui-block-message"><div class="ui-gif-loading"></div></div>');
                this.$span_text = $('<span class="ui-text-loading"></span>');
                this.scrolltop = this.$contenedor.scrollTop();
                this.scrollLeft = this.$contenedor.scrollLeft();
                this.oWidth = this.$contenedor.outerWidth();
                this.oHeight = this.$contenedor.outerHeight();

                this.viewOver();
            },
            viewOver: function() {
                this.$div_over.css({
                    top: 0 + this.scrolltop,
                    left: 0 + this.scrollLeft,
                    width: this.oWidth,
                    height: this.oHeight,
                }).appendTo(this.$contenedor);

                // agrego la capa que contiene la animación y el mensaje
                this.$div_over.append(this.$div_message);
                // Si hay un mensaje lo agregamos
                if( this.config.message != '' ) {
                    this.$span_text.html( this.config.message );
                    this.$div_message.append( this.$span_text );
                }
            },

            hidden: function(opciones) {
               this.$div_over.fadeOut(this.config.fadeout, function() {
                    this.remove();
                });
            },
        }

        $.fn.ajaxOverlay = function(opciones) {
            if(typeof opciones == "string") {
                metodo = opciones;
                args = Array.prototype.slice.call(arguments, 1);

                var overlay = this.data('overlay') ? 
                    this.data('overlay') :
                    new Overlay(this);

                if( overlay[metodo] ) {
                    overlay[metodo].apply(overlay, args);
                }

            } else if(typeof opciones == 'objet' || !opciones) {
                this.data('overlay', new Overlay(this, opciones));
            } else {
                $.error("Error: Parámetros incorrectos.");
            }

            return this;
        }

        window.Overlay = Overlay;

 })(jQuery, window);
