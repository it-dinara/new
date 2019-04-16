import React, { Component } from 'react';
import './App.css';
import styled  from 'styled-components'

const Wip = styled.div`
  position: absolute;
  width: 150px;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #EEEEEE;
  border-right: 1px dotted;
`
export default class AppDragDropDemo extends Component {
	state = {
		tasks: [
			{name: 'Angular', category:'wip', bgcolor: 'yellow',},
	        {name: 'React', category:'wip', bgcolor: 'pink',},
	        {name: 'Vue', category:'complete', bgcolor: 'skyblue',},
		]
	}

	onDragStart = (ev, id) => {
		console.log('dragstart:', id);
		ev.dataTransfer.setData('id', id); //id = t.name
	}

	onDragOver = (ev) => {
		ev.preventDefault();
	}

	onDrop = (ev, cat) => {
		let id = ev.dataTransfer.getData('id');

		let tasks = this.state.tasks.filter((task) => {
			if(task.name === id) {
				task.category = cat;
			}
			return task;
		});
		this.setState({
			...tasks
		});
	}

	render() {
		const tasks = {
			wip: [],
			complete: []
		}

		this.state.tasks.forEach((t) => {
			tasks[t.category].push(
				<div key={t.name}
					onDragStart = {(e) => this.onDragStart(e, t.name)}
					className="draggable"
					style={{backgroundColor: t.bgcolor}}
					draggable
				>
					{t.name}
				</div>
			);
		})
		return (
			<div className="container-drag">
				<h2 className='header'>Drag & Drop Demo</h2>
				<Wip
				onDragOver={(e) => this.onDragOver(e)}
					onDrop={(e) => this.onDrop(e, 'wip')}>
					<span className='task-header'>wip</span>
					{tasks.wip}
				</Wip>
				<div className="droppable" 
					onDragOver={(e) => this.onDragOver(e)}
					onDrop={(e) => this.onDrop(e, 'complete')}>
					<span className='task-header'>completed</span>
					{tasks.complete}
				</div>
			</div>
		);
	}
}