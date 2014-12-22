'use strict';

$(document).ready(function() {

    var admin = {
        init: function(config) {
            this.config = config;

            $.ajaxSetup({
                url: '/admin/',
                type: 'GET',
                dataType: 'json',
            });


            this.bindEvents();
        },
        bindEvents: function() {
            this.config.usersLink.on('click', this.displayUsers);
        },

        displayUsers: function(event) {
            var self = admin;

            $.ajax({
                url: '/admin/users',
                dataType: 'json',
                type: 'GET'
            })
            .done(function(users) {
                self.config.main.html('<h1>Users with ajax</h1>');
                $.each(users, function(index, element) {
                    self.config.main.append($('<div>', {
                        text: element.username
                    }));
                });
                console.log(users);
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            });


        }

    };

    admin.init({
        main: $('div#main'),
        usersLink: $('a#adminUsers')
    });

    console.log('Ready!');
});