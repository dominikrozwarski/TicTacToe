const info = document.querySelector('.info');
const questionMark = document.querySelector('.questionMark');
const square = document.querySelectorAll('.square');
const reset = document.querySelector('.restart');
const winner = document.querySelector('.winner');
const solo = document.querySelector('.solo');
const ai = document.querySelector('.ai');
let i = 0;
let weHaveWinner = false;
let mode = 0;

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

//selecting gamemode

ai.addEventListener('click', () => {
	mode = 1;
	solo.style.background = 'none';
	ai.style.background = 'gray';
	resetAll();
	return mode;
});

solo.addEventListener('click', () => {
	mode = 0;
	ai.style.background = 'none';
	solo.style.background = 'gray';
	resetAll();
	return mode;
});

//winner Condition
const checkWinner = () => {
	winningConditions.forEach((win) => {
		let a = square[win[0]].textContent;
		let b = square[win[1]].textContent;
		let c = square[win[2]].textContent;
		if (a == 'X' && a == b && b == c) {
			square[win[0]].style.color = 'red';
			square[win[1]].style.color = 'red';
			square[win[2]].style.color = 'red';
			winner.textContent = 'X won';
			weHaveWinner = true;
			return weHaveWinner;
		}
		if (a == 'O' && a == b && b == c) {
			square[win[0]].style.color = 'red';
			square[win[1]].style.color = 'red';
			square[win[2]].style.color = 'red';
			winner.textContent = 'O won';
			weHaveWinner = true;
			return weHaveWinner;
		}
	});
};

//addign inside x or o, solo mode
square.forEach((sq) => {
	sq.addEventListener('click', () => {
		if (sq.textContent != '' || weHaveWinner || mode != 0) {
			return;
		}

		if (i % 2 == 0) {
			sq.style.color = 'moccasin';
			sq.textContent = 'X';
		} else {
			sq.style.color = 'rosybrown';
			sq.textContent = 'O';
		}
		i++;
		checkWinner();
		draw();
	});
});

//vs ai mode
square.forEach((sq) => {
	sq.addEventListener('click', () => {
		if (sq.textContent != '' || weHaveWinner || mode != 1) {
			return;
		}

		sq.style.color = 'moccasin';
		sq.textContent = 'X';
		checkWinner();
		draw();

		aimove();
	});
});

//ai moves

const aimove = () => {
	if(weHaveWinner){
		return
	}
	let random = Math.floor(Math.random() * square.length);
	let count = 0;
	if (square[random].textContent != '') {
		square.forEach((sq) => {
			if (sq.textContent != '') {
				count++;
			}
		});

		if (count >= 9) {
			return;
		} else {

			aimove();
		}
	} else {
		square[random].textContent = 'O';
		square[random].style.color = 'rosybrown';
	}
	checkWinner();
	draw()
};

//if draw happend
const draw = () => {
	if (i == 9 && weHaveWinner != true) {
		winner.textContent = 'Draw';
	}
};

//reset inside
const resetAll = () => {
	square.forEach((sq) => {
		sq.textContent = '';
		winner.textContent = 'Try your best';
		weHaveWinner = false;
		i = 0;
	});
};
//info show / hide
const hide = () => {
	if (info.classList.contains('active')) {
		info.classList.remove('active');
	} else {
		info.classList.add('active');
	}
};

reset.addEventListener('click', resetAll);
questionMark.addEventListener('click', hide);
