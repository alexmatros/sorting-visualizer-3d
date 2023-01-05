import React, { Component } from 'react';

// Algorithms
import BubbleSort from './algorithms/BubbleSort';
import InsertionSort from './algorithms/InsertionSort';
import SelectionSort from './algorithms/SelectionSort';

// Icons
import Play from '@mui/icons-material/PlayArrowRounded';
import Pause from '@mui/icons-material/PauseRounded';
import Forward from '@mui/icons-material/SkipNextRounded';
import Backward from '@mui/icons-material/SkipPreviousRounded';
import RotateLeft from '@mui/icons-material/ReplayRounded';

import Bar from './components/Bar';
import Form from './components/Form'

import './App.css';

class App extends Component {
	state = {
		array: [],
		arraySteps: [],
		colorKey: [],
		colorSteps: [],
		currentStep: 0,
		count: 12,
		delay: 150,
		algorithm: 'Selection Sort',
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

		let playButton;

		if (this.state.arraySteps.length === this.state.currentStep) {
			playButton = (
				<button className='controller' onClick={this.generateRandomArray}>
					<RotateLeft />
				</button>
			);
		} else if (this.state.playing) {
			playButton = (
				<button className='controller' onClick={this.pause}>
					<Pause />
				</button>
			);
		} else {
			playButton = (
				<button className='controller' onClick={this.play}>
					<Play />
				</button>
			);
		}

		return (
			<div className='app'>
				<h1>Hello world!</h1>
				<div className='frame'>
					<div className='barsDiv container card'>{bars}</div>
				</div>
				<div className='control-panel'>
					<div className='control-buttons'>
						<button className='controller' onClick={this.previousStep}>
							<Backward />
						</button>
						{playButton}
						<button className='controller' onClick={this.nextStep}>
							<Forward />
						</button>
					</div>
				</div>
				<div className='panel'>
					<Form 
						formLabel='Speed'
						values={[500, 400, 300, 200, 100]}
						currentValue={this.state.delay}
						labels={['1x', '2x', '3x', '4x', '5x']}
						onChange={this.changeSpeed}
					/>
				</div>
			</div>
		);
	}
}

export default App;