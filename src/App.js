import React, { Component } from 'react';

// Algorithms
import BubbleSort from './algorithms/BubbleSort';
import InsertionSort from './algorithms/InsertionSort';
import SelectionSort from './algorithms/SelectionSort';

// Icons
import Play from '@mui/icons-material/PlayArrowRounded';
import Forward from '@mui/icons-material/SkipNextRounded';
import Backward from '@mui/icons-material/SkipPreviousRounded';
import RotateLeft from '@mui/icons-material/ReplayRounded';

import Bar from './components/Bar';
import SpeedSelection from './components/forms/SpeedSelection'
import AlgoSelection from './components/forms/AlgoSelection'

import './App.css';

class App extends Component {
	state = {
		array: [],
		arraySteps: [],
		colorKey: [],
		colorSteps: [],
		currentStep: 0,
		count: 12,
		delay: 300,
		algorithm: 'Bubble Sort',
		timeComplexity: 'O(n²)',
		spaceComplexity: 'O(1)',
		timeouts: [],
		playing: false,
	};

	ALGORITHMS = {
		'Bubble Sort': BubbleSort,
		'Insertion Sort': InsertionSort,
		'Selection Sort': SelectionSort,
	};

	componentDidMount() {
		this.generateRandomArray();
	}

	generateSteps = () => {
		let array = this.state.array.slice();
		let steps = this.state.arraySteps.slice();
		let colorSteps = this.state.colorSteps.slice();

		this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

		this.setState({
			arraySteps: steps,
			colorSteps: colorSteps,
		});
	};

	clearTimeouts = () => {
		this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
		this.setState({
			timeouts: [],
		});
	};

	clearColorKey = () => {
		let blankKey = new Array(this.state.count).fill(0);

		this.setState({
			colorKey: blankKey,
			colorSteps: [blankKey],
		});
	};

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	generateRandomArray = () => {
		this.clearTimeouts();
		this.clearColorKey();
		const count = this.state.count;
		const temp = [];

		for (let i = 0; i < count; i++) {
			temp.push(this.generateRandomNumber(50, 200));
		}

		this.setState(
			{
				array: temp,
				arraySteps: [temp],
				currentStep: 0,
				playing: false,
			},
			() => {
				this.generateSteps();
			}
		);
	};

	changeArray = (index, value) => {
		let arr = this.state.array;
		arr[index] = value;
		this.setState(
			{
				array: arr,
				arraySteps: [arr],
				currentStep: 0,
			},
			() => {
				this.generateSteps();
			}
		);
	};

	changeSpeed = (e) => {
		this.clearTimeouts();
		this.setState({
			delay: parseInt(e.target.value)
		})
	} 

	changeAlgo = (e) => {
		this.clearTimeouts();
		let timeComplexities = {
			'Bubble Sort':'O(n²)',
			'Insertion Sort':'O(n²)',
			'Selection Sort':'O(n²)',
		};

		let spaceComplexities = {
			'Bubble Sort':'O(1)',
			'Insertion Sort':'O(1)',
			'Selection Sort':'O(1)',
		};

		this.setState({
			algorithm: e.target.value,
			timeComplexity: timeComplexities[e.target.value],
			spaceComplexity: spaceComplexities[e.target.value]
		})
	} 
		
	previousStep = () => {
		let currentStep = this.state.currentStep;
		if (currentStep === 0) return;
		currentStep -= 1;
		this.setState({
			currentStep: currentStep,
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
		});
	};

	nextStep = () => {
		let currentStep = this.state.currentStep;
		if (currentStep >= this.state.arraySteps.length - 1) return;
		currentStep += 1;
		this.setState({
			currentStep: currentStep,
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
		});
	};

	play = () => {
		let steps = this.state.arraySteps;
		let colorSteps = this.state.colorSteps;

		this.clearTimeouts();

		let timeouts = [];
		let i = 0;
		let player = this.state.playing;
		this.setState({playing: !player});

		while (i < steps.length - this.state.currentStep) {
			let timeout = setTimeout(() => {
				let currentStep = this.state.currentStep;
				this.setState({
					array: steps[currentStep],
					colorKey: colorSteps[currentStep],
					currentStep: currentStep + 1,
				});
				timeouts.push(timeout);
			}, this.state.delay * i);
			i++;
		}

		this.setState({
			timeouts: timeouts,
		});
	};

	pause = () => {
		this.setState({
			playing: false,
		})
	}

	render() {
		let bars = this.state.array.map((value, index) => (
			<Bar
				key={index}
				index={index}
				length={value}
				color={this.state.colorKey[index]}
				changeArray={this.changeArray}
			/>
		));

		let ctrlpanel;

		if (this.state.arraySteps.length === this.state.currentStep) {
			ctrlpanel = (
				<div className='control-panel'>
					<div className='control-buttons'>
						<button className='controller' onClick={this.generateRandomArray}>
							<RotateLeft />
						</button>
					</div>
				</div>
			);
		} else if (this.state.playing) {
			ctrlpanel = (
				<div className='control-panel'><div className='control-buttons'><div className='flashing'>{this.state.algorithm}ing...</div></div></div>
			);
		} else {
			ctrlpanel = (
				<div className='control-panel'>
					<div className='control-buttons'>
						<button className='controller' onClick={this.previousStep}>
							<Backward />
						</button>
						<button className='controller' onClick={this.play}>
						<Play />
						</button>
						<button className='controller' onClick={this.nextStep}>
							<Forward />
						</button>
					</div>
				</div>
			);
		}

		return (
			<div className='app'>
				<div className='header'>
					<div className='title'>3-D Sorting Algorithm Visualizer</div>
					<p className='instructions'>Select a sorting speed and algorithm. Press the play button below to visualize the sorting process!</p>
					<hr className="horiz"></hr>
					<div className='panel'>
						<SpeedSelection 
							formLabel='Speed'
							values={[500, 400, 300, 200, 100]}
							currentValue={this.state.delay}
							labels={['1x', '2x', '3x', '4x', '5x']}
							onChange={this.changeSpeed}
						/>
						<AlgoSelection
							formLabel='Algorithm'
							values={['Bubble Sort', 'Insertion Sort', 'Selection Sort']}
							currentValue={this.state.algorithm}
							labels={['Bubble Sort', 'Insertion Sort', 'Selection Sort']}
							onChange={this.changeAlgo}
						/>
					</div>
				</div>
				<div className='frame'>
					<div className='complexity'>Time Complexity<br></br>{this.state.timeComplexity}</div>
					<div className='barsDiv container card'>{bars}</div>
					<div className='complexity'>Space Complexity<br></br>{this.state.spaceComplexity}</div>
				</div>
				{ctrlpanel}
			</div>
		);
	}
}

export default App;