
//state
let state = {
  todos = [],
  errorOccured: false,
  errorMessage: "",
  errorStatus: "",
};

axios
  .get("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    // handle success
    console.log(response.data.data);
    state.errorOccured = false;
    state.todos = response.data.data;
  })
  .catch((error) =>{
    // handle error
    console.log(error);
  });
  
//CHALLENGES

// have a button that triggers a call to get your todos and displays them to your ui 
//get todos
const getTodos = () =>{
  
};
//display todos

//have buttons that filter todos that are complete and not complete

//be able to toggle a todo being complete or not (checkbox?)

//be able to sort todos by title and or userID

//add some custom styles css

//add a reset button that doesnt need a new API call to resert todos