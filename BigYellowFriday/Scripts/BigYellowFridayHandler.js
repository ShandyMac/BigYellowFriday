$(function () {
    $('#run').click(function () {
        var tableIndex = 0;
        tableIndex = DecideWhichIndex();
        var allTds = $('#table').children('tbody').children('tr').children('td');
        $('.highlight').removeClass('highlight');
        $(allTds[tableIndex]).addClass('highlight');
    });

    function DecideWhichIndex() {
        var index = 0;
        $.ajax({
            type: 'POST',
            url: 'Home/Decide',
            async: false,
            data: {
                lower: 0,
                upper: 6
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