import React from 'react';
import ReactDOM from 'react-dom';

function Header(props) {
    return <h1>{props.message}</h1>
}

function TodoItem(props) {
    return (
        <li className="todo-item">
            <div className="item-container">
                <p>{props.title}</p>
                <button className="item-delete-btn" id={props.id} onClick={props.onClick}>Delete</button>
            </div>
        </li>
    )
}

class TaskInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({inputValue: event.target.value});
    }

    handleSubmit() {
        this.props.onSubmit(this.state.inputValue);
        this.setState({inputValue: ""});
    }

    render() {
        return (
            <div className="input-form-container">
                <input type="text" placeholder="Task" id="item-input" value={this.state.inputValue} onChange={evt => this.handleInputChange(evt)}/>
                <button id="todo-submit" onClick={this.handleSubmit}>Add</button>
            </div>
        );
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            nextTaskId: 1,
        }
        this.inputElementRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(title) {
        const state = this.state;
        const tasks = state.tasks.slice();
        const newTask = {id: state.nextTaskId, title: title};
        tasks.push(newTask);
        this.setState({
            tasks: tasks,
            nextTaskId: state.nextTaskId + 1
        });
    }

    deleteItem(id) {
        const state = this.state;
        let tasks = state.tasks.slice();
        tasks = tasks.filter((task) => task.id !== id);
        this.setState({
            tasks: tasks
        });
    }

    render() {
        const taskComponents = this.state.tasks.map((task) => {
            return <TodoItem key={task.id} id={task.id} title={task.title} onClick={() => this.deleteItem(task.id)}/>
        });

        return (
            <div className="todo-container">
                <div className="todo-form">
                    <ul>{taskComponents}</ul>
                    <TaskInput onSubmit={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Header message="Todo App"/>
        <TodoApp/>
    </React.StrictMode>,
    document.getElementById('root')
);
