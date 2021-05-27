'use strict';

function onPageLoaded() {
    const input = document.querySelector('.input-text');
    const add = document.querySelector('.input-button');
    const items = document.querySelector('.items');

    function createToDo() {
        if (input.value == '') {
            return false;
        }  else {
            const item = document.createElement('div');
            item.classList.add('item');
            
            const itemP = document.createElement('div');
            itemP.classList.add('itemP');

            const p = document.createElement('p');

            const itemImg = document.createElement('div');
            itemImg.classList.add('itemImg');

            const a = document.createElement('a');
            a.classList.add('a');
            a.href = '##';

            const icon = document.createElement('i');
            icon.classList.add('fa', 'fa-trash-o');

            item.append(itemP, itemImg);

            itemP.append(p);

            itemImg.append(a);

            a.append(icon);

            const newTodo = input.value;
            p.append(newTodo);

            items.append(item);

            input.value = '';

            saveTodo();
        } 
    }

    add.addEventListener('click', createToDo);

    function deleteTodo() {
        items.addEventListener('click', function(e) {
            let a = e.target.closest('a');
            if (!a) {
                return;
            } else if (!items.contains(a)) {
                return;
            } else {
                a.parentElement.parentElement.remove();
                saveTodo();
            }    
        });
    }    
    deleteTodo();

    function loadTodo() {
        if (localStorage.getItem('items')) {
            items.innerHTML = localStorage.getItem('items');
        }
    }

    function saveTodo() {
        localStorage.setItem('items', items.innerHTML);
    }

    (function() {
        input.addEventListener('keydown', function(e) {
            if (e.keyCode === 13) {
                createToDo();
                saveTodo();
            }
        });
    })();
    
    loadTodo();
    window.addEventListener('unload', saveTodo);
}
document.addEventListener('DOMContentLoaded', onPageLoaded);