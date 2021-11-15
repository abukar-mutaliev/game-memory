import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@material-ui/core';

export default function App() {
	const dispatch = useDispatch();
	const icons = useSelector((state) => state.icons.items);

	const effect = async () => {
		if (!icons.length) {
			dispatch({ type: 'icons/load/pending' });

			const res = await fetch('http://localhost:5500/');
			const json = await res.json();

			dispatch({ type: 'icons/load/fulfilled', payload: json });
		}
	};

	useEffect(() => {
		dispatch(effect);
	}, [dispatch]);

	const shuffleIcons = useMemo(
		() =>
			[...icons, ...icons].sort((a, b) => Math.floor(3 * Math.random()) - 1),
		[icons]
	);

	const [cards, setCards] = useState(shuffleIcons);
	const [won, setWon] = useState(false);
	const [activeCards, setActiveCards] = useState([]);
	const [foundPairs, setFoundPairs] = useState([]);
	const [matched, setMatched] = useState([]);
	const [timerActive, setTimerActive] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [clicks, setClicks] = useState(0);

	const flipCard = (index) => {
		if (won) {
			setCards([...shuffleIcons, ...shuffleIcons]);
			setFoundPairs([]);
			setWon(false);
			setClicks(0);
		}
		if (activeCards.length === 0) {
			setActiveCards([index]);
		}
		if (activeCards.length === 1) {
			const firstIndex = activeCards[0];
			const secondsIndex = index;
			if (shuffleIcons[firstIndex] === shuffleIcons[secondsIndex]) {
				setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
				if (foundPairs.length + 2 === shuffleIcons.length) {
					setWon(true);
				}
			}
			setActiveCards([...activeCards, index]);
		}
		if (activeCards.length === 2) {
			setActiveCards([index]);
		}
		setClicks(clicks + 1);
	};

	useEffect(() => {
		if (activeCards < 2);

		const firstMatched = cards[activeCards[0]];
		const secondMatched = cards[activeCards[1]];

		if (secondMatched && firstMatched.id === secondMatched.id) {
			setMatched([...matched, firstMatched.id]);
		}
		if (activeCards.length === 2) setTimeout(() => setActiveCards([]), 500);
	}, [activeCards, cards]);

	useEffect(() => {
		if (seconds > 0 && timerActive) {
			setTimeout(setSeconds, 100, seconds - 1);
		} else {
			setTimerActive(false);
		}
	}, [seconds, timerActive]);

	useEffect(() => {
		if (won === true) {
			setTimerActive(!timerActive);
		}
	}, [won, setTimerActive]);

	const handleRestartTimer = () => {
		setSeconds(2400);
		setActiveCards([]);
		setMatched([]);
		setFoundPairs([]);
		setTimerActive(!timerActive);
	};

	return (
		<div className="App">
			<div>
				{seconds ? (
					<>
						<Button
							variant="contained"
							color="secondary"
							className="btn"
							onClick={handleRestartTimer}
						>
							{timerActive ? 'Стоп' : 'Начать'}
						</Button>
						<div>
							<p>{seconds}</p>
						</div>
					</>
				) : (
					<Button
						variant="contained"
						color="secondary"
						className="btn"
						onClick={handleRestartTimer}
					>
						Начать игру
					</Button>
				)}
			</div>

			<div className={seconds === 0 ? 'hide' : 'cards'}>
				{shuffleIcons.map((icon, index) => {
					const flippedToFront =
						activeCards.indexOf(index) !== -1 ||
						foundPairs.indexOf(index) !== -1;
					return (
						<div
							className={'icon-card' + (flippedToFront ? 'flipped' : '')}
							key={index}
							onClick={() => flipCard(index)}
						>
							<div className="inner">
								<div className="front">
									<img src={icon.pathToIcon} alt="icon-name" width="90" />
								</div>
								<div className="back"></div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="stats">
				{won && (
					<>
						<br />
						Вы выиграли!
						<br />
						<br />
					</>
				)}
				<br />
				Клики: {clicks} ; Найденные пары:{foundPairs.length / 2}
			</div>
		</div>
	);
}
