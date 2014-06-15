"use strict";
;
(function ($) {
    var i,
        toDoData,
        toDoList,
        newToDo,
        items,
        oldName,
        changeValue,
        checkAllItems = true,
        check = false,
        counter = 0;
    showToDoList();


    $(".task-create").click(function () {
        toDoData = $(".task-input").val() + " active";

        addItem(toDoData);

        newToDo = template($(".task-input").val(), "active");

        if (check == false) {
            $(newToDo).appendTo(".toDoList");
        }

        $(".task-input").val('');

        deleteToDo();
        toggleComplete();
    });

    $(".toDoList").dblclick(function (e) {
        e.target.parentNode.innerHTML = "<input class='changeToDo' value=" + e.target.innerText + ">";
        oldName = e.target.innerText;
        $(".changeToDo").keypress(function (e) {
            changeValue = $(".changeToDo").val();
            if (e.keyCode == 13) {
                e.target.parentNode.innerHTML = "<button id='" + $(".changeToDo").val() + "' class='btn-large btn-primary glyphicon glyphicon-remove'></button><span>" + $(".changeToDo").val() + "</span><button id='" + $(".changeToDo").val() + "' class='btn-large btn-primary glyphicon glyphicon-ok' ></button>";
                for (i in localStorage) {
                    items = localStorage[i].split(" ")
                    if (items[0] == oldName) {
                        items[0] = changeValue;
                        localStorage.setItem(i, items[0] + " " + items[1]);
                        deleteToDo();
                        toggleComplete();
                    }
                }
            }
        });
    });

    $(".toDoOptions").click(function (e) {

        $("*").removeClass("active");
        $(e.target).addClass("active");

        switch (e.target.id) {
            case "showAll":
                showToDoList();
                check = false;
                break;
            case "showAct":
                showActiveOrCompleted("showAct");
                check = true;
                break;
            case "showComp":
                showActiveOrCompleted("showComp");
                check = true;
                break;
            default:
                showToDoList();
        }

    })

    $("#toggleCheckAll").click(function () {
        if (checkAllItems) {
            checkAll(false, "not-active");
        } else {
            checkAll(true, "active");
        }
    });


    function checkAll(checkAllItemsVar, active) {
        checkAllItems = checkAllItemsVar;
        for (i in localStorage) {
            items = localStorage[i].split(" ");
            items[1] = active;
            localStorage.setItem(i, items[0] + " " + items[1]);
            $(".toDoList").children().remove();
        }
    }

    function showActiveOrCompleted(check) {
        $(".toDoList").children().css({display: "none"});
        for (i in localStorage) {
            items = localStorage[i].split(" ");
            if (items[1] == "not-active" && check == "showComp") {
                template(items[0], items[1]).appendTo(".toDoList");
            } else if (items[1] == "active" && check == "showAct") {
                template(items[0], items[1]).appendTo(".toDoList");
            }
        }
        deleteToDo();
        toggleComplete();
    }


    function deleteToDo() {
        $(".glyphicon-remove").click(function (e) {
            $(e.target.parentNode).animate({
                opacity: "0"
            }, "slow", function () {
                $(e.target.parentNode).remove();
                for (i in localStorage) {
                    items = localStorage[i].split(" ")
                    if (items[0] == e.target.id) {
                        localStorage.removeItem(i);
                    }
                }
            });
        });
    }


    function toggleComplete() {
        $(".glyphicon-ok").click(function (e) {
            $(e.target.parentNode).toggleClass("complete");
            for (i in localStorage) {
                items = localStorage[i].split(" ");
                if (e.target.id == items[0]) {
                    switch (items[1]) {
                        case "active":
                            items[1] = "not-active";
                            localStorage.setItem(i, items[0] + " " + items[1]);
                            if (check) {
                                $(e.target.parentNode).css({display: "none"})
                            }
                            break;
                        case "not-active":
                            items[1] = "active";
                            localStorage.setItem(i, items[0] + " " + items[1]);
                            if (check) {
                                $(e.target.parentNode).css({display: "none"})
                            }
                            break;
                    }
                }
            }
        });

    }


    function addItem(toDo) {
        localStorage.setItem(localStorage.length + 1, toDo);
    }

    function showToDoList() {

        $(".toDoList").children().css({display: "none"});
        for (i in localStorage) {
            items = localStorage[i].split(" ");
            template(items[0], items[1]).appendTo(".toDoList");
        }
        deleteToDo();
        toggleComplete();
    }


    function template(variableTemplate, activeCheck) {

        if (activeCheck == "not-active") {
            return $("<p class='complete'><button id='" + variableTemplate + "' class='btn-large btn-primary glyphicon glyphicon-remove' style='float:left'></button><span>" + variableTemplate + "</span><button id='" + variableTemplate + "' class='btn-large btn-primary glyphicon glyphicon-ok' style='float:right'></button></p>");
        } else {
            return $("<p><button id='" + variableTemplate + "' class='btn-large btn-primary glyphicon glyphicon-remove delete' style='float:left'></button><span>" + variableTemplate + "</span><button id='" + variableTemplate + "' class='btn-large btn-primary glyphicon glyphicon-ok' style='float:right'></button></p>")
        }
    }

})(jQuery)

