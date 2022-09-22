const info = document.querySelector('.info');
const questionMark = document.querySelector('.questionMark');
const square = document.querySelectorAll('.square');
const reset = document.querySelector('.restart');
const winner = document.querySelector('.winner');
let i = 0;
let weHaveWinner = false;

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

//winner Condition
const checkWinner = () => {
	winningConditions.forEach((win) => {
		if (
			square[win[0]].textContent == 'X' &&
			square[win[1]].textContent == 'X' &&
			square[win[2]].textContent == 'X'
		) {
			square[win[0]].style.color = 'red';
			square[win[1]].style.color = 'red';
			square[win[2]].style.color = 'red';
			winner.textContent = 'X won';
			weHaveWinner = true;
			return weHaveWinner;
		}
		if (
			square[win[0]].textContent == 'O' &&
			square[win[1]].textContent == 'O' &&
			square[win[2]].textContent == 'O'
		) {
			square[win[0]].style.color = 'red';
			square[win[1]].style.color = 'red';
			square[win[2]].style.color = 'red';
			winner.textContent = 'O won';
			weHaveWinner = true;
			return weHaveWinner;
		}
	});
};

//addign inside x or o
square.forEach((sq) => {
	sq.addEventListener('click', () => {
		if (sq.textContent != '' || weHaveWinner) {
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
