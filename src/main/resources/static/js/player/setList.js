export function setList() {
    // Main
    let main = $("#allPlayer");
    main.empty()
    
    // 0 ~ 6
    let col1 = $('<div class="col-sm-6"></div>');
    col1.appendTo(main);
    // 7 ~ 13
    let col2 = $('<div class="col-sm-6"></div>');
    col2.appendTo(main);
    // All
    let colAll = [col1, col2];

    for (let i = 0; i < 14; i++) {
        let li = $('<li class="list-group-item" id="list-' + i + '">&zwnj;</li>');
        let br = $("<br>");
        let input = $('<input id="input-' + i + '" style="display: none;"></input>');

        li.click(function() {
            $("#searchName").val(input.val());
            $("#searchBtn").trigger("click");
        })

        let group = colAll[Math.floor(i / 7)];
        li.appendTo(group);
        br.appendTo(group);
        input.appendTo(group);
    }
}