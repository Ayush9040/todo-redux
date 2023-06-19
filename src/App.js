import React from 'react';
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from './redux/action';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.trim() !== '') {
      this.props.addTodo(this.state.text);
      this.setState({ text: '' });
    }
  };

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Enter a task"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.props.todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { addTodo, deleteTodo })(TodoList);
