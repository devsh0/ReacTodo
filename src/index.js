import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function TodoHeader() {
    return (
        <div className="todo-header">
            <p>Todo Application</p>
        </div>
    );
}

function TodoItem(props) {
    return (
        <li className="todo-item">
            <div className="item-container">
                <p>{props.title}</p>
                <button className="item-delete-btn" id={props.id} onClick={props.onClick}><i
                    className="fas fa-trash-alt"></i></button>
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
                <input type="text" placeholder="Task" id="item-input" value={this.state.inputValue}
                       onChange={evt => this.handleInputChange(evt)}/>
                <button id="todo-submit" onClick={this.handleSubmit}>Add</button>
            </div>
        );
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {id: 1, title: 'Write an MP3 decoder.'},
                {id: 2, title: 'Write a Vorbis decoder.'},
                {id: 3, title: 'Write an Opus decoder.'},
                {id: 4, title: 'Write an AVC-10 decoder.'},
            ],
            nextTaskId: 5,
        }

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
            <div className="container">
                <TodoHeader/>
                <div className="todo-list-container">
                    <div className="todo-form">
                        <ul>{taskComponents}</ul>
                        <TaskInput onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <TodoApp/>
    </React.StrictMode>,
    document.getElementById('root')
);
