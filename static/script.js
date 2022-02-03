$(document).ready(() => {

    var amplifier = 1;

    if (bloat == "true"){
        $("select").val(1)
        $("#cbx-modifier").prop("disabled", false);
        $(".submit").html("Bloat My URL")
        $(".sidekick").html("Let's think <code class=\"fs-2\">bigger</code>.")
    } else{
        $("select").val(2)
        $("#cbx-modifier").prop("disabled", true).prop("checked", false);
        $(".submit").html("Trim My URL")
        $(".sidekick").html("Let's think <code class=\"fs-4\">smaller</code>.")
    }

    $("#secret-tooltip").tooltip({
        placement: "top"
    });

    $(".select-operation").on("change", () => {
        console.log($(".select-operation option:selected").text())
        if ($(".select-operation option:selected").text() == "Bloat"){
            $("#cbx-modifier").prop("disabled", false);
            $(".submit").html("Bloat My URL")
            $(".sidekick").html("Let's think <code class=\"fs-2\">bigger</code>.")
        }
        else {
            $("#cbx-modifier").prop("disabled", true).prop("checked", false)
            $(".submit").html("Trim My URL")
            $(".sidekick").html("Let's think <code class=\"fs-4\">smaller</code>.")
            $("#badge-modifier").fadeOut("fast")
            $("#badge-modifier").html("X1")
            $("#badge-modifier").removeClass("bg-danger").removeClass("bg-warning").removeClass("bg-primary").removeClass("text-dark").addClass("bg-secondary")
            $("#amplifier").val("1")
            amplifier = 1
        }
    })

    $("#cbx-modifier").on("change", () => {
        if ($("#cbx-modifier").prop("checked")){
            $("#badge-modifier").fadeIn("fast")
        }else{
            $("#badge-modifier").fadeOut("fast")
        }
    })

    $("#badge-modifier").click(() => {
        switch (amplifier){
            case 1:
                $("#badge-modifier").html("X2")
                $("#badge-modifier").removeClass("bg-secondary").addClass("bg-primary")
                $("#amplifier").val("2")
                amplifier = 2
                break;
            case 2:
                $("#badge-modifier").html("X3")
                $("#badge-modifier").removeClass("bg-primary").addClass("text-dark").addClass("bg-warning")
                $("#amplifier").val("3")
                amplifier = 3
                break;
            case 3:
                $("#badge-modifier").html("X4")
                $("#badge-modifier").removeClass("bg-warning").removeClass("text-dark").addClass("bg-danger")
                $("#amplifier").val("4")
                amplifier = 4
                break;
            default:
                $("#badge-modifier").html("X1")
                $("#badge-modifier").removeClass("bg-danger").addClass("bg-secondary")
                $("#amplifier").val("1")
                amplifier = 1
                break;
        }
    })

    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})