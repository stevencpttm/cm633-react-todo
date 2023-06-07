import React from "react";

class App extends React.Component {
  state = {
    todos: [],
    newTitle: "",
  };

  clickHandler = (todoId, shouldDelete) => {
    let newTodos = [...this.state.todos]; // Clone

    if (!shouldDelete) {
      // Should toggle the state of the item
      const target = newTodos.find((todo) => {
        return todo.id === todoId;
      });
      target.done = !target.done;
    } else {
      // Should Perform Delete Action
      newTodos = this.state.todos.filter((todo) => {
        return todo.id !== todoId;
      });
    }

    this.setState({
      todos: newTodos,
    });
  };

  inputHandler = (e) => {
    this.setState({
      newTitle: e.target.value,
    });
  };

  createItem = (e) => {
    if (e.key === "Enter") {
      // append a new item to this.state.todos
      const newTodos = [...this.state.todos];
      const randomId = Math.floor(Math.random() * 1000000);

      newTodos.push({
        id: randomId,
        title: this.state.newTitle,
        done: false,
      });

      this.setState({
        todos: newTodos,
        newTitle: "",
      });
    }
  };

  render() {
    return (
      <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center">
        <div className="flex-1 max-w-md rounded-xl shadow-xl overflow-hidden">
          <h1 className="text-5xl font-bold text-center text-slate-600 py-8">
            React TODO!
          </h1>
          <input
            type="text"
            className="bg-slate-600 text-white p-6 w-full outline-none text-3xl"
            placeholder="Type something..."
            value={this.state.newTitle}
            onChange={this.inputHandler}
            onKeyDown={this.createItem}
          />
          <ul>
            {this.state.todos.map((todo) => {
              return (
                <li
                  key={todo.id}
                  onClick={(e) => {
                    this.clickHandler(todo.id, e.shiftKey);
                  }}
                  className={`p-6 text-3xl transition border-b border-slate-100 hover:bg-blue-500 hover:text-white cursor-pointer bg-slate-200 text-slate-600 ${
                    todo.done ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
