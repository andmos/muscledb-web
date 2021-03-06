function inputchanged() {
    clearTimeout($.data(this, 'timer'));
    var search_string = $("#searchterm").val();
    if (search_string == '') {
        // If search_string is empty, ie, if you delete the text in input#searchterm after a search, table#muscleResults will fade and disappear   
        $(".appended").remove();
    } else {
        $("table#muscleResults").show();
        $(this).data('timer', setTimeout(search(search_string), 0)); // Needs some adjustment?
    };
}

function search(query_value) {

    $.getJSON("api/muscles", { searchterm: query_value }, function (json) {
        $(".appended").remove(); //moved from line 14        
        var $table = $("tbody#tbodyappend");
        $.each(json, function (idx, muscleitem) {
            $table.append("<tr class='appended'><td id='muscleResultItem'><a href='./muscle.html?id=" + muscleitem.id + "'><div>" + muscleitem.name + "</div></a></td></tr>");
        });
    });
}

$(document).ready(function () {

    $("input#searchterm").focus();

    // Uncomment the next line to simulate a search without user input
    //search("flexio");
});
