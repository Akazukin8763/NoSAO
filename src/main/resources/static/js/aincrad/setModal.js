export function setModal() {
    // Modal Description
    $("#description").on("hidden.bs.modal", function () {
        $(".carousel").carousel("cycle");
        // 重製 Description
        $("#description").removeClass("top bottom left");
        $("#description").addClass("top");
    });
    $("#description").on("shown.bs.modal", function () {
        $(".carousel").carousel("pause");
        // 重製 Description
        $("#description").removeClass("left");
        $("#description").addClass("top");
    });
    $("#description-enemy").click(function() {
        // Description
        $("#description").removeClass("top");
        $("#description").addClass("left");
        $("#description").modal("hide");
        // Enemy
        $("#enemy").removeClass("top");
        $("#enemy").addClass("right");
        $("#enemy").modal("show");
    })

    // Modal Enemy
    $("#enemy").on("hidden.bs.modal", function () {
        $(".carousel").carousel("cycle");
        // 重製 Description
        $("#description").removeClass("top bottom left");
        $("#description").addClass("top");
    });
    $("#enemy").on("shown.bs.modal", function () {
        $(".carousel").carousel("pause");
        // 重製 Enemy
        $("#enemy").removeClass("right");
        $("#enemy").addClass("top");
    });
    $("#enemy-description").click(function() {
        // Enemy
        $("#enemy").removeClass("top");
        $("#enemy").addClass("right");
        $("#enemy").modal("hide");
        // Description
        $("#description").removeClass("top");
        $("#description").addClass("left");
        $("#description").modal("show");
    })
}