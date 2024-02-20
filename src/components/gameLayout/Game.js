export const Game = (props) => {
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    function _isCellSameAsSelectedCell(givenRow, givenColumn) {
        if (props.fastMode) {
            if (props.numberSelected === props.gameGrid[givenRow * 9 + givenColumn]) {
                return true;
            }
            return false;
        } else {
            if (props.cellSelected === givenRow * 9 + givenColumn) {
                return true;
            }
            if (props.gameGrid[props.cellSelected] === 0) {
                return false;
            }
            if (props.gameGrid[props.cellSelected] === props.gameGrid[givenRow * 9 + givenColumn]) {
                return true;
            }
        }
    }

    function _selectedCell(givenIndex, givenValue) {
        if (givenValue !== 0) {
            if (props.initialGameGrid[givenIndex] === 0) {
                return (
                    <td
                        className="game__cell game__cell--userfilled game__cell--selected"
                        key={givenIndex}
                        onClick={() => props.onClick(givenIndex)}>
                        {givenValue}
                    </td>
                )
            } else {
                return (
                    <td
                        className="game__cell game__cell--filled game__cell--selected"
                        key={givenIndex}
                        onClick={() => props.onClick(givenIndex)}>
                        {givenValue}
                    </td>
                )
            }
        } else {
            return (
                <td
                    className="game__cell game__cell--selected"
                    key={givenIndex}
                    onClick={() => props.onClick(givenIndex)}>
                    {givenValue}
                </td>
            )
        }
    }

    function _unselectedCell(givenIndex, value) {
        if (value !== 0) {
            if (props.initialGameGrid[givenIndex] === 0) {
                return (
                    <td className="game__cell game__cell--userfilled" key={givenIndex} onClick={() => props.onClick(givenIndex)}>{value}</td>
                )
            } else {
                return (
                    <td className="game__cell game__cell--filled" key={givenIndex} onClick={() => props.onClick(givenIndex)}>{value}</td>
                )
            }
        } else {
            return (
                <td className="game__cell" key={givenIndex} onClick={() => props.onClick(givenIndex)}>{value}</td>
            )
        }
    }

    return (
        <section className="game">
            <table className="game__board">
                <tbody>
                    {
                        rows.map((row) => {
                            return (
                                <tr className="game__row" key={row}>
                                    {
                                        rows.map((column) => {
                                            const index = row * 9 + column;
                                            const value = props.gameGrid[index];

                                            if (props.cellSelected === index) {
                                                if (value !== 0) {
                                                    if (props.initialGameGrid[index] === 0) {
                                                        return (
                                                            <td className="game__cell game__cell--userfilled game__cell--highlightselected" key={index} onClick={() => props.onClick(index)}>{value}</td>
                                                        )
                                                    } else {
                                                        return (
                                                            <td className="game__cell game__cell--filled game__cell--highlightselected" key={index} onClick={() => props.onClick(index)}>{value}</td>
                                                        )
                                                    }
                                                } else {
                                                    return (
                                                        <td className="game__cell game__cell--highlightselected" key={index} onClick={() => props.onClick(index)}>{value}</td>
                                                    )
                                                }
                                            }

                                            if (props.fastMode) {
                                                if (props.numberSelected !== 0 && _isCellSameAsSelectedCell(row, column)) {
                                                    return _selectedCell(index, value);
                                                } else {
                                                    return _unselectedCell(index, value);
                                                }
                                            } else {
                                                if (props.cellSelected !== -1 && _isCellSameAsSelectedCell(row, column)) {
                                                    return _selectedCell(index, value);
                                                } else {
                                                    return _unselectedCell(index, value);
                                                }
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}