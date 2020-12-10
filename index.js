
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
  console.log(todo);
  return `<div class='todo'>
          <h2>${todo.title}</h2>
          <button class='completionStatus btn btn-primary' onclick='updateComplete();'>${todo.completed}</button>
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

//tried filter first had issues this way works
  state.todos.forEach((todo, i) => {
    if(todo.completed === false){
      let todoClass = document.getElementsByClassName("todo");
      
        todoClass[i].style.display = "none";
      // console.log(todo);
  };
});
};

const filterNotComplete = () => {
  //tried filter first had issues this way works
    state.todos.forEach((todo, i) => {
      if(todo.completed === true){
        let todoClass = document.getElementsByClassName("todo");
        
          todoClass[i].style.display = "none";
        // console.log(todo);
    };
  });
  };
//be able to toggle a todo being complete or not (checkbox?)
  //const updateComplete = (() => {
  //      if(todo.completed === false){
  //       todo.completed = true;
  //       document.getElementsByClassName("completed").innerHTML = "yo";
  //      }else if(todo.completed === true){
  //        todo.completed = false;
  //       document.getElementsByClassName("completed").innerHTML = "yo";
  
  //      }
  //      console.log(todo.completed);
  //    });


//be able to sort todos by title and or userID
const sortByTodosTitle = () =>{
  state.todos.sort();
};

const showDiv = () =>{
  state.todos.filter(todo => {
    todo.display === false;
    document.getElementById("todos").style.display = "block";
    todo.display = true;
    console.log(`the display property before: ${todo.display}`);
    
  });
};

const render = () => {
  const {display} = state;
  let htmlString = `<div>`;
  htmlString += "<h1>Todos</h1>";
  htmlString += "<div class='btn-group'>";
  //add a reset button that doesnt need a new API call to resert todos
  htmlString += `<button class= 'btn btn-primary' onClick="window.location.reload();">Reset</button>`;
  htmlString += `<button class='btn btn-primary' onclick='showDiv();'>Get Todos</button>`;
  htmlString += `<button class='btn btn-primary' onclick='filterComplete();'>Filter Completed</button>`;
  htmlString += `<button class='btn btn-primary' onclick='filterNotComplete();'>Filter Not Completed</button>`;
  htmlString += `<button class='btn btn-primary' onclick='sortByTodosTitle();'>Sort By Title</button>`;
  htmlString += `</div>`;
  htmlString += renderTodos();
  
  htmlString += "</div>";
  document.getElementById('app').innerHTML = htmlString;
};

render();
console.log("index loaded");