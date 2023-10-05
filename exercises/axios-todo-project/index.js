function getData(){
    axios.get("https://api.vschool.io/blackmantodo/todo")
        .then(res => listData(res.data))
        .catch(err => console.log(err))
}

function clearList(){
    while(todolist.firstChild){
        todolist.removeChild(todolist.firstChild)
    }
}

getData()

const todolist = document.getElementById('todolist')
const todoForm = document["todoform"]

todoForm.addEventListener("submit", function(e){
    e.preventDefault()
    const newTodo = {
        title: todoForm.title.value,
        price: todoForm.price.value,
        description: todoForm.description.value,
        imgUrl: todoForm.img.value
    }
    todoForm.title.value = ""
    todoForm.description.value = ""
    todoForm.price.value = ""
    todoForm.img.value = ""
    axios.post("https://api.vschool.io/blackmantodo/todo", newTodo)
        .then(res => getData())
        .catch(err => console.log(err))
})

function listData(data){
    clearList()
    for(let i = 0; i < data.length; i++){
        const div = document.createElement('div')
        const h1 = document.createElement('h1')
        h1.textContent = data[i].title
        const h4 = document.createElement('h4')
        h4.textContent = `description: ${data[i].description}`
        const h5 = document.createElement('h5')
        h5.textContent = `price: ${data[i].price}`
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        const img = document.createElement('img')
        img.src = data[i].imgUrl
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X'
        deleteButton.addEventListener("click", e => {
            axios.delete("https://api.vschool.io/blackmantodo/todo/" + data[i]._id)
                .then(res => getData())
                .catch(err => console.log(err))
        })
        
        if (data[i].completed === true){
            div.style.textDecoration = "line-through";
            checkbox.checked = true
        }
        // onlcick it will check if data[i].completed is true or false, then make it the opposite
        checkbox.addEventListener("click", e => {
            axios.put("https://api.vschool.io/blackmantodo/todo/" + data[i]._id, {completed: !data[i].completed})
                .then(res => getData())
                .catch(err => console.log(err))  
        })

        todolist.appendChild(div)
        div.appendChild(checkbox)
        div.appendChild(h1)
        div.appendChild(h4)
        div.appendChild(h5)
        div.appendChild(img)
        div.appendChild(deleteButton)
        div.className = "listdiv"


        //extra credit//
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        div.appendChild(editButton)

        editButton.addEventListener("click", e => {
        if (editButton.textContent === 'Edit') {
            const oldTitle = h1.textContent;
            const oldDescription = h4.textContent.replace("description: ", "")
            const oldPrice = h5.textContent.replace("price: ", "")
            h1.innerHTML = `<input type="text" value="${oldTitle}">`
            h4.innerHTML = `<input type="text" value="${oldDescription}">`
            h5.innerHTML = `<input type="text" value="${oldPrice}">`
            editButton.textContent = 'Save'

        } else if (editButton.textContent === 'Save') {
            const newTitle = h1.querySelector('input').value;
            const newDescription = h4.querySelector('input').value;
            const newPrice = h5.querySelector('input').value;
            h1.textContent = newTitle;
            h4.textContent = `description: ${newDescription}`;
            h5.textContent = `price: ${newPrice}`;
            editButton.textContent = 'Edit';
            const updatedTodo = {
                title: newTitle,
                description: newDescription,
                price: newPrice,
            };
            axios.put("https://api.vschool.io/blackmantodo/todo/" + data[i]._id, updatedTodo)
                .then(res => getData())
                .catch(err => console.log(err));
            //extra credit end//
        }
    })      
}
}




//code challenge

const people = [ "John", "Adam", "Amber" ]


function peopleElements(arr) {
    const h1person = arr.map(person => {
        return `<h1>${person}</h1>`
    })
    return h1person
}

console.log(peopleElements(people))

//Expected Output: [ "<h1>John</h1>", "<h1>Adam</h1>", "<h1>Amber</h1>" ]