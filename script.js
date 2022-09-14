let table = {
    id: 0,
    title: "root - not displayed",
    children: [{
        id: 1,
        title: "Flora",
        children: [{
            id: 11,
            title: "Ervas",
            children: [{
                id: 111,
                title: "Urtiga"
            }, {
                id: 112,
                title: "Boldo"
            }]
        }, {
            id: 12,
            title: "Flores"
        }]
    }, {
        id: 2,
        title: "Mamíferos",
        children: [{
            id: 21,
            title: "Onça pintada"
        }, {
            id: 22,
            title: "Mico-leão-dourado"
        }]
    }, {
        id: 3,
        title: "Répteis",
        children: [{
            id: 4,
            title: "Lagarto"
        }, {
            id: 5,
            title: "Cobra"
        }]
    }]
};

let tableStoraged = localStorage.getItem('table')
let data = JSON.parse(tableStoraged);

let checksStoraged = localStorage.getItem('check')
let checks = JSON.parse(checksStoraged);

var checkeds = [];

if(!tableStoraged) localStorage.setItem('table', JSON.stringify(table));
if(checksStoraged){
    checkeds = checks
}

function addItem(parentUL, branch) {
    for (let key in branch.children) {
        let item = branch.children[key];
        let id = `item${item.id}`

        if(checksStoraged){
            let location = checkeds.findIndex(item => item.id === id)
            $item = $('<li>', {
                id: "item" + item.id
            });
            $item.append($('<input>', {
                type: "checkbox",
                id: "item" + item.id,
                name: "item" + item.id,
                "checked": checkeds[location].checked
            }));
            $item.append($('<label>', {
                for: "item" + item.id,
                text: item.title
            }));
            parentUL.append($item);
            if (item.children) {
                let location = checkeds.findIndex(item => item.id === id)
                if(checkeds[location].checked){
                    var $ul = $('<ul>').appendTo($item);
                    addItem($ul, item);
                }else{
                    var $ul = $('<ul>', {
                        style: 'display: none'
                    }).appendTo($item);
                    addItem($ul, item);
                }
            }

        }else{
            checkeds.push({
                id: id,
                checked: false
            })
            $item = $('<li>', {
                id: "item" + item.id
            });
            $item.append($('<input>', {
                type: "checkbox",
                id: "item" + item.id,
                name: "item" + item.id
            }));
            $item.append($('<label>', {
                for: "item" + item.id,
                text: item.title
            }));
            parentUL.append($item);
            if (item.children) {
                var $ul = $('<ul>', {
                    style: 'display: none'
                }).appendTo($item);
                addItem($ul, item);
            }
        }
    }
}

$(function () {
    addItem($('#root'), data);
    $(':checkbox').change(function () {
        $(this).closest('li').children('ul').slideToggle();

        let location = checkeds.findIndex(item => item.id === $(this).closest('li')[0].firstChild.name)

        if(location >= 0){
            checkeds[location].checked = $(':checkbox')[location].checked;
        }

        localStorage.setItem('check', JSON.stringify(checkeds))
    });
    $('label').click(function(){
        $(this).closest('li').find(':checkbox').trigger('click');
    });

});