$(function () {
    var count = 0;
    var timer = $.timer(function () {
        //put animation functionality in here
        var tableIndex = 0;
        var allTds = $('#table').children('tbody').children('tr').children('td');
        tableIndex = DecideWhichIndex(allTds.length);
        $('.highlight').removeClass('highlight');
        $(allTds[tableIndex]).addClass('highlight');
        $('#stopwatch').html(count);
        count++;
    });

    timer.set({
        time: 1000,
        autostart: true
    });

    $('#run').click(function () {
        timer.stop();
        var tableIndex = 0;
        var allTds = $('#table').children('tbody').children('tr').children('td');
        tableIndex = DecideWhichIndex(allTds.length);
        $('.highlight').removeClass('highlight');
        $(allTds[tableIndex]).addClass('highlight');
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
    }
});