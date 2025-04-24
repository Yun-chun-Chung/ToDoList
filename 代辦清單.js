// <!-- 題目 -->
//   <!-- 1. 輸入待辦事項，按下新增按鈕後，於下方列表增加一筆待辦事項 -->
//   <!-- 2. 點擊待辦事項後面的X按鈕，可刪除待辦事項 -->
//   <!-- 3. 最下方需顯示多少待完成項目，以及點擊"清空所有項目"按鈕後則將所有待辦事項刪除 -->
//   <!-- 4. 可使用中間的篩選按鈕來篩選出全部、待完成、已完成的項目 -->
//   <!-- 5. 按下待辦事項後面的編輯按鈕，可將該項目帶回上方輸入框，按下修改按鈕後送出便可修改待辦事項 -->

const itemInput = document.querySelector('#item-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('.list');
const showCount = document.querySelector('#show-count');
const clearAllBtn = document.querySelector('#clear-all-btn');
const tabs = document.querySelectorAll('.tab');

let todos = [];

addBtn.addEventListener('click', () => {
    const todoText = itemInput.value;
    // console.log(todoText);

    if (todoText) {
        const newTodo = { text: todoText, done: false };
        todos.push(newTodo);
        renderTodos();
        itemInput.value = '';
    }
});

function renderTodos() {
    list.innerHTML = '';
    let undoneCount = 0;

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('item');
        li.innerHTML = `
        <label class="checkbox">
          <input type="checkbox" class="done-input" ${todo.done ? 'checked' : ''} data-index="${index}">
          <span class="content">${todo.text}</span>
        </label>
        <button type="button" class="edit-btn" data-index="${index}" title="編輯項目" aria-label="編輯項目按鈕">編輯</button>
        <button type="button" class="delete-btn" data-index="${index}" title="刪除項目" aria-label="刪除項目按鈕">刪除</button>
      `;

        if (!todo.done) undoneCount++

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            // console.log(deleteBtn);

            todos.splice(index, 1);
            renderTodos();
        });

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            itemInput.value = todo.text;
            todos.splice(index, 1);
            renderTodos();
        });

        const doneInput = li.querySelector('.done-input');
        doneInput.addEventListener('change', (e) => {
            todos[index].done = e.target.checked;
            renderTodos();
        });

        list.appendChild(li);
    });

    showCount.textContent = `${undoneCount} 個待完成項目`;
}

clearAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});

// 分類待辦事項為待完成or已完成
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        //  console.log(tab);
        tabs.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');

        const dataStatus = tab.getAttribute('data-status');
        // 從 tab 元素中取得 data-status 的值，判斷出是all undone 還是done

        if (dataStatus === 'all') {
            renderTodos();
        } else {
            const classify = [];
            
            for (let i = 0; i < todos.length; i++) {
                const todo = todos[i];

                if (dataStatus === 'undone' && !todo.done) {
                    classify.push(todo);
                }

                if (dataStatus === 'done' && todo.done) {
                    classify.push(todo);
                }
            }
            classifyTodos(classify);
        }
    });
});

function classifyTodos(classify) {
    list.innerHTML = '';
    classify.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('item');
        li.innerHTML = `
        <label class="checkbox">
          <input type="checkbox" class="done-input" ${todo.done ? 'checked' : ''} data-index="${index}">
          <span class="content">${todo.text}</span>
        </label>
        <button type="button" class="edit-btn" data-index="${index}" title="編輯項目" aria-label="編輯項目按鈕">編輯</button>
        <button type="button" class="delete-btn" data-index="${index}" title="刪除項目" aria-label="刪除項目按鈕">刪除</button>
      `;

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(function (todo, e) {
                return e !== index
            });
            renderTodos();
        });

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            itemInput.value = todo.text;
            todos.splice(index, 1);
            renderTodos();
        });


        const doneInput = li.querySelector('.done-input');
        doneInput.addEventListener('change', function (e) {
            if (e.target.checked) {
                todos[index].done = true;
            } else {
                todos[index].done = false;
            }
            renderTodos();
        });

        list.appendChild(li);
        // appendChild會將指定的子元素（這裡是 li）加到父元素的最後一個子元素後面。
    });
}
