import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		tableros:[
			{
				title: 'Familia',
				items: [ 'Juan', 'Pedro', 'Joana', 'Maria' ],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			}	
		],
		input: {
			add: '',
			remove: ''
		}
	};

	onAddButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			const indexBoard = draft.tableros.findIndex(x => x.title ===property.title);
			draft.tableros[indexBoard].items = draft.tableros[indexBoard].items.concat(draft.tableros[indexBoard].input.add);
			draft.tableros[indexBoard].input.add = '';
		});
		this.setState(nextState);
	};

	onRemoveItem = (index, property) => {
		const nextState = produce(this.state, (draft) => {
		const indexBoard = draft.tableros.findIndex(x => x.title ===property.title);
			draft.tableros[indexBoard].items.splice(index, 1);
		});
		this.setState(nextState);
	};

	onRemoveBoardButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
		const indexBoard = draft.tableros.findIndex(x => x.title ===property.title);
		draft.tableros.splice(indexBoard, 1);
		});
		this.setState(nextState);
	};

	onAddInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			const indexBoard = draft.tableros.findIndex(x => x.title ===property.title);
			draft.tableros[indexBoard].input.add = value;
			console.log(property);
		});
		this.setState(nextState);
	};

	onAddBoardInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input.add = value;
			console.log(this.state.input);
		});
		this.setState(nextState);
	};

	onAddBoardButtonClick = () => {
		const nextState = produce(this.state, (draft) => {
			const newBoardtitle=draft.input.add;
			const newBoard ={
				title: newBoardtitle,
				items: [ ],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			};
			draft.tableros.push(newBoard);
			draft.input.add = '';			
	console.log(this.state.tableros);
		});
		this.setState(nextState);
	};

	render() {
		const {tableros} = this.state;
		return (
			<div className={styles.alignBoard}>
				<div className={styles.top}>
				<p className={styles.title}>TABLEROS</p>
				<div className={styles.countBoards}>{this.state.tableros.length} TOTAL DE TABLEROS</div>
				</div>
				<h3>Agregar Tableros</h3>
				<div className={styles.board_add}>
						<div className={styles.container_input}>
							<Input type="text" value={this.state.input.add} onChange={this.onAddBoardInputChange}/>
						</div>
						<Button type={'add'} onClick={this.onAddBoardButtonClick} />
					</div>
				<div className={styles.container_boards}>
					{tableros.map((i) => (
						<Board
							object={i}
							onRemoveBoard={() => this.onRemoveBoardButtonClick(i)}
							onAddButtonClick={() => this.onAddButtonClick(i)}
							onAddInputChange={(event) => this.onAddInputChange(event, i)}
							onRemoveItem={(index) => this.onRemoveItem(index, i)}
						/>
					))}							
				</div>
			</div>
		);
	}
}

export default App;