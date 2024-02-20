import { useState } from 'react';
import moment from 'moment';
import { Header, Game, Sidebar, Footer } from './components/gameLayout';
import { getSudoku } from './sudoku';
import './App.css';


function App() {
    const initialGrid = [
        8, 0, 0, 0, 2, 0, 9, 1, 0,
        2, 3, 4, 5, 1, 0, 0, 0, 7,
        7, 1, 0, 0, 8, 0, 0, 5, 4,
        6, 0, 0, 1, 0, 0, 3, 0, 5,
        1, 8, 5, 0, 0, 0, 7, 2, 0,
        0, 4, 0, 6, 0, 2, 8, 0, 0,
        0, 6, 8, 0, 0, 0, 4, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 6, 2,
        0, 0, 0, 4, 0, 7, 5, 3, 0
    ];

    const emptyGrid = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    const initialSolvedGrid = [
        8, 5, 6, 7, 2, 4, 9, 1, 3,
        2, 3, 4, 5, 1, 9, 6, 8, 7,
        7, 1, 9, 3, 8, 6, 2, 5, 4,
        6, 9, 2, 1, 7, 8, 3, 4, 5,
        1, 8, 5, 9, 4, 3, 7, 2, 6,
        3, 4, 7, 6, 5, 2, 8, 9, 1,
        5, 6, 8, 2, 3, 1, 4, 7, 9,
        4, 7, 3, 8, 9, 5, 1, 6, 2,
        9, 2, 1, 4, 6, 7, 5, 3, 8
    ];

    const sudoku = getSudoku();

    const [gameGrid, setGameGrid] = useState(initialGrid);
    const [gameDifficulty, setGameDifficulty] = useState('Easy');
    const [numberSelected, setNumberSelected] = useState(0);
    const [timeGameStarted, setTimeGameStarted] = useState(moment());
    const [mistakesMode, setMistakesMode] = useState(false);
    const [fastMode, setFastMode] = useState(false);
    const [cellSelected, setCellSelected] = useState(-1);
    const [history, setHistory] = useState([]);

    const [initialGameGrid, setInitialGameGrid] = useState(initialGrid);
    const [solvedGrid, setSolvedGrid] = useState(initialSolvedGrid);
    const [overlay, setOverlay] = useState(false);
    const [won, setWon] = useState(false);

    function _getBoxCenter(box) {
        switch (box) {
            case 0: return [1, 1];
            case 1: return [1, 4];
            case 2: return [1, 7];
            case 3: return [4, 1];
            case 4: return [4, 4];
            case 5: return [4, 7];
            case 6: return [7, 1];
            case 7: return [7, 4];
            case 8: return [7, 7];
            default: break;
        }
    }

    function _getIndexOfCell(givenBox, givenCell) {
        let [row, column] = _getBoxCenter(givenBox);
        switch (givenCell) {
            case 0: { row--; column--; break; }
            case 1: { row--; break; }
            case 2: { row--; column++; break; }
            case 3: { column--; break; }
            case 4: { break; }
            case 5: { column++; break; }
            case 6: { row++; column--; break; }
            case 7: { row++; break; }
            case 8: { row++; column++; break; }
            default: break;
        }
        return row * 9 + column;
    }

    function _cellAvailable(temporaryInitialGameGrid, givenBox, givenValue) {
        return +(temporaryInitialGameGrid[_getIndexOfCell(givenBox, givenValue)]);
    }

    function _generateUniqueSudoku(solvedGrid, e) {
        let currentDifficulty = gameDifficulty;
        let minimumCells, maximumCells, totalCells, box, cell;

        const tempInitArray = emptyGrid.slice();
        const boxCounts = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];
        let boxesAvailable = [];
        let cellsAvailable = [];

        if (e) {
            currentDifficulty = e.target.value;
        }

        switch (currentDifficulty) {
            case 'Easy':
                minimumCells = 3;
                maximumCells = 7;
                totalCells = 45;
                break;

            case 'Medium':
                minimumCells = 2;
                maximumCells = 6;
                totalCells = 40;
                break;

            default:
                minimumCells = 1;
                maximumCells = 5;
                totalCells = 30;
                break;
        }

        for (let j = 0; j < 9; j++) {
            boxCounts[j] = _cellAvailable(tempInitArray, j, 0) +
                _cellAvailable(tempInitArray, j, 1) +
                _cellAvailable(tempInitArray, j, 2) +
                _cellAvailable(tempInitArray, j, 3) +
                _cellAvailable(tempInitArray, j, 4) +
                _cellAvailable(tempInitArray, j, 5) +
                _cellAvailable(tempInitArray, j, 6) +
                _cellAvailable(tempInitArray, j, 7) +
                _cellAvailable(tempInitArray, j, 8);
        }

        for (let i = 0; i < totalCells; i++) {
            boxesAvailable = [];
            for (let j = 0; j < 9; j++) {
                if (boxCounts[j] < minimumCells) {
                    boxesAvailable.push(j);
                }
            }
            if (boxesAvailable) {
                for (let j = 0; j < 9; j++) {
                    if (boxCounts[j] < maximumCells) {
                        boxesAvailable.push(j);
                    }
                }
            }
            box = boxesAvailable[Math.random() * boxesAvailable.length | 0];

            cellsAvailable = [];
            for (let j = 0; j < 9; j++) {
                if (tempInitArray[_getIndexOfCell(box, j)] === 0) {
                    cellsAvailable.push(j);
                }
            }
            cell = cellsAvailable[Math.random() * cellsAvailable.length | 0];

            const index = _getIndexOfCell(box, cell);
            tempInitArray[index] = solvedGrid[index]
            boxCounts[box]++;
        }

        return tempInitArray;
    }

    function _createNewGame(e) {
        let tempInitArray = emptyGrid.slice();
        const tempSolvedArray = emptyGrid.slice();

        let str = sudoku.generate(60);

        [...str].forEach((value, index) => {
            tempInitArray[index] = value === '.'
                ? 0
                : value;
        });
        str = sudoku.solve(str);
        [...str].forEach((value, index) => {
            tempSolvedArray[index] = value;
        });
        tempInitArray = _generateUniqueSudoku(tempSolvedArray, e);

        setInitialGameGrid(tempInitArray);
        setGameGrid(tempInitArray);
        setSolvedGrid(tempSolvedArray);
        setNumberSelected(0);
        setTimeGameStarted(moment());
        setCellSelected(-1);
        setHistory([]);
        setWon(false);
    }

    function _isSolved(givenIndex, givenValue) {
        if (gameGrid.every((cell, cellIndex) => {
            if (cellIndex === givenIndex)
                return givenValue === solvedGrid[cellIndex];
            else
                return cell === solvedGrid[cellIndex];
        })) {
            return true;
        }
        return false;
    }

    function _populateCell(givenIndex, givenValue) {
        if (initialGameGrid[givenIndex] === 0) {
            const tempGrid = gameGrid.slice();
            const tempHistory = history.slice();

            tempHistory.push(gameGrid.slice());
            setHistory(tempHistory);

            tempGrid[givenIndex] = givenValue;
            setGameGrid(tempGrid);

            if (_isSolved(givenIndex, givenValue)) {
                setOverlay(true);
                setWon(true);
            }
        }
    }

    function _userPopulateCell(index, value) {
        if (mistakesMode) {
            if (value === solvedGrid[index]) {
                _populateCell(index, value);
            }
            else {
                // need to allow mistakes to be made in 'mistake mode'
            }
        } else {
            _populateCell(index, value);
        }
    }

    function handleOnClickNewGame() {
        _createNewGame();
    }

    function handleOnClickCell(indexOfArray) {
        if (fastMode && numberSelected !== 0) {
            _userPopulateCell(indexOfArray, numberSelected);
        }
        setCellSelected(indexOfArray);
    }

    function handleChangeGameDifficulty(e) {
        setGameDifficulty(e.target.value);
        _createNewGame(e);
    }

    function handleOnClickNumber(number) {
        if (fastMode) {
            setNumberSelected(number)
        } else if (cellSelected !== -1) {
            _userPopulateCell(cellSelected, number);
        }
    }

    function handleOnClickUndo() {
        if (history.length) {
            const tempHistory = history.slice();
            const tempGrid = tempHistory.pop();
            setHistory(tempHistory);
            setGameGrid(tempGrid);
        }
    }

    function handleOnClickErase() {
        if (cellSelected !== -1 && gameGrid[cellSelected] !== 0) {
            _populateCell(cellSelected, 0);
        }
    }

    function handleOnClickHint() {
        if (cellSelected !== -1) {
            _populateCell(cellSelected, solvedGrid[cellSelected]);
        }
    }

    function handleOnClickMistakesMode() {
        setMistakesMode(!mistakesMode);
    }

    function handleOnClickFastMode() {
        if (fastMode) {
            setNumberSelected(0);
        }
        setCellSelected(-1);
        setFastMode(!fastMode);
    }

    function handleOnClickOverlay() {
        setOverlay(false);
        _createNewGame();
    }

    return (
        <>
            <div className={overlay ? "container blur" : "container"}>
                <Header onClick={handleOnClickNewGame} />
                <div className="innercontainer">
                    <Game
                        gameGrid={gameGrid}
                        initialGameGrid={initialGameGrid}
                        fastMode={fastMode}
                        numberSelected={numberSelected}
                        cellSelected={cellSelected}
                        onClick={(index) => handleOnClickCell(index)}
                    />
                    <Sidebar
                        gameDifficulty={gameDifficulty}
                        numberSelected={numberSelected}
                        timeGameStarted={timeGameStarted}
                        won={won}
                        onClick={(number) => handleOnClickNumber(number)}
                        onChange={(e) => handleChangeGameDifficulty(e)}
                        onClickUndo={handleOnClickUndo}
                        onClickErase={handleOnClickErase}
                        onClickHint={handleOnClickHint}
                        onClickMistakesMode={handleOnClickMistakesMode}
                        onClickFastMode={handleOnClickFastMode}
                    />
                </div>
                <Footer />
            </div>
            <div className={overlay ? "overlay overlay--visible" : "overlay"} onClick={handleOnClickOverlay}>
                <h2 className="overlay__text">You did it!</h2>
            </div>
        </>
    );
}

export default App;