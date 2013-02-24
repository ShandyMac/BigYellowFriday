$(function () {
    var handler = function () {
        var base = this;
        base.handler = {
            settings: {
                submitBtn: '#run',
                table: '#table',
                winnerDialog: '#winner-dialog',
                winnerLabel: '#winner'
            },
            init: function () {
                base.handler.events.getTeams();
                $(base.handler.settings.submitBtn).click(base.handler.events.onClick);
                base.timer.init();
            },
            events: {
                onClick: function () {
                    base.timer.events.stop();
                    var allTds = base.handler.events.getTableChildren();
                    var index = base.handler.events.decideWhichIndex(allTds.length);
                    $(allTds[index]).animate({
                        backgroundColor: '#FFDF00'
                    }, {
                        duration: 5000
                    }).promise().done(function () {
                        $(base.handler.settings.winnerLabel).html($(allTds[index]).text());
                        $(base.handler.settings.winnerDialog).modal();
                    });
                },
                getTableChildren: function () {
                    return $(base.handler.settings.table).children('tbody').children('tr').children('td');
                },
                decideWhichIndex: function (tds) {
                    var index = 0;
                    $.ajax({
                        type: 'POST',
                        url: 'Home/Decide',
                        async: false,
                        data: {
                            upper: tds
                        },
                        success: function (data) {
                            if (data != null)
                                index = data;
                        },
                        error: function () {
                            alert("There was a problem contacting the server. Please try again");
                        }
                    });
                    return index;
                },
                getTeams: function () {
                    var teams = [];
                    $.ajax({
                        type: 'POST',
                        url: 'Home/GetTeams',
                        async: false,
                        success: function (data) {
                            if (data != null)
                                var teamCounter = 0;
                            while (teamCounter < 100) {
                                if (teamCounter % 10 == 0)
                                    $(base.handler.settings.table).append("<tr></tr>");

                                $(base.handler.settings.table).find('tr').last().append("<td>" + data.Teams[teamCounter] + "</td>");
                                teamCounter++;
                            }
                        },
                        error: function () {
                            alert("There was an error retrieving the teams from the database. Please check and try again");
                        }
                    });
                    return teams;
                }
            }
        };

        base.timer = {
            settings: {
                timer: $.timer
            },
            init: function () {
                var count = 0;
                base.timer.settings.timer = $.timer(function () {
                    base.timer.events.animate();
                    count++;
                });
                
                base.timer.settings.timer.set({
                    time: 25,
                    autostart: false
                });

            },
            events: {
                start: function () {
                    base.timer.settings.timer.play();
                },
                stop: function () {
                    base.timer.settings.timer.stop();
                },
                animate: function () {
                    var allTds = base.handler.events.getTableChildren();
                    var tableIndex = base.handler.events.decideWhichIndex(allTds.length);
                    $(allTds[tableIndex]).animate({
                        backgroundColor: "#FFDF00"
                    }, { duration: "slow" });

                    $(allTds[tableIndex]).animate({
                        backgroundColor: "#f9f9f9" //very light grey
                        //backgroundColor: "White"
                    }, { duration: "slow" });
                }
            }
        };
    };

    var InitHandler = new handler();
    InitHandler.handler.init();

});