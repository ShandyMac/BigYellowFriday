$(function () {
    var handler = function () {
        var base = this;
        base.handler = {
            settings: {
                submitBtn: '#run',
                table: '#table'
            },
            init: function () {
                $(base.handler.settings.submitBtn).click(base.handler.events.onClick);
                base.timer.init();
            },
            events: {
                onClick: function () {
                    base.timer.events.stop();
                    var allTds = base.handler.events.getTableChildren();
                    var index = base.handler.events.decideWhichIndex(allTds.length);
                    //$(allTds[index]).removeClass('highlight');

                    /*
                    var allTds = base.handler.events.getTableChildren();
                    var index = base.handler.events.decideWhichIndex(allTds.length);
                    */

                    $(allTds[index]).animate({
                        backgroundColor: '#FF6200',
                        color: '#f9f9f9'
                    }, {
                        duration: 5000,
                        complete: function () {
                            $(this).effect("highlight", { color: 'yellow' }, 5000);
                        }
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
                    autostart: true
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
                        backgroundColor: "yellow"
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

// need to set up a way to allow the timer to be started on init (ok) and stopped when button clicked(todo). 





/*
var count = 0;
var timer = $.timer(function () {
var tableIndex = 0;
var allTds = $('#table').children('tbody').children('tr').children('td');
tableIndex = DecideWhichIndex(allTds.length);

$(allTds[tableIndex]).animate({
backgroundColor: "Yellow"
}, { duration: "slow" });

$(allTds[tableIndex]).animate({
backgroundColor: "White"
}, { duration: "slow" });

$('#stopwatch').html(count);
count++;
});

timer.set({
time: 100,
autostart: true
});

$('#run').click(function () {
timer.stop();
var tableIndex = 0;
var allTds = $('#table').children('tbody').children('tr').children('td');
tableIndex = DecideWhichIndex(allTds.length);
$(allTds[tableIndex]).animate({
backgroundColor: "Yellow"
}, { duration: "fast" });
});

function DecideWhichIndex(tds) {
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
}*/
