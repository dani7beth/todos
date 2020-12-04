
//state
let state = {
  todos: [],
  display: false,
  errorOccured: false,
  errorMessage: "",
  errorStatus: "",
};

axios
  .get("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    // handle success
    console.log(response.data);
    state.errorOccured = false;
    state.todos = response.data;
    render();
  })
  .catch((error) =>{
    // handle error
    console.log(error);
  });
  
//CHALLENGES

// have a button that triggers a call to get your todos and displays them to your ui 
//get todos
const getTodos = () =>{
  axios
  .get("https://jsonplaceholder.typicode.com/todos")
  .then((res)=>{
    // console.log(res.data.data);
    state.errorOccured = false;
    state.todos = res.data;
    state.todos = false;
    render();
  })
  .catch((err)=>{
    state.errorOccured = true;
    state.errorMessage = err.response.data.message;
    state.errorStatus = err.response.status;
  });
};

//display todos
const renderTodo = (todo) =>{
  return `<div id='todo'>
          <h2>${todo.title}</h2>
          <p>completed: ${todo.completed}</p>
          </div>`;
};

const renderTodos = () =>{
  const {todos, errorOccured, errorMessage, errorStatus} = state;
  if(errorOccured){
    return `<div>
            <h1>Error: ${errorMessage}, failed with status ${errorStatus}</h1>
            <div onclick='getTodos()'>retry</div>
            </div>`;
  }
  
  let todosStringArray = todos.map((todo)=>{
    return renderTodo(todo);
  });
  

  
  let htmlString = `<div id='todos' style='display: none' class='grid'>${todosStringArray.join("")}</div>`;

    
  return htmlString;
};

//have buttons that filter todos that are complete and not complete
const filterComplete = () => {
  state.todos.filter(todo => {
    todo.completed === false;
    todo.display = false;
  });
  document.getElementById("todo").style.display = "none";
};

//be able to toggle a todo being complete or not (checkbox?)

//be able to sort todos by title and or userID

//add some custom styles css

//add a reset button that doesnt need a new API call to resert todos


const showDiv = () =>{
  state.todos.filter(todo => {
    todo.display === false;
    document.getElementById("todos").style.display = "block";
    todo.display = true;
    console.log(`the display property before: ${todo.display}`);
    
  });
};

const render = () => {
  let htmlString = `<div>`;
  htmlString += "<h1>Todos</h1>";
  htmlString += "<div class='btn-group'>";
  htmlString += `<button class='btn' onclick='showDiv()'>Get Todos</button>`;
  htmlString += `<button class='btn' onclick='filterComplete();'>Filter Completed</button>`;
  htmlString += renderTodos();

  htmlString += "</div>";
  document.getElementById('app').innerHTML = htmlString;
};

render();
console.log("index loaded");