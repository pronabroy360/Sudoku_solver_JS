export const Numbers = (props) => {
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="status__numbers">
            {
                possibleNumbers.map((number) => {
                    if (props.numberSelected === number) {
                        return (
                            <div className="status__number status__number--selected" key={number} onClick={() => props.onClickNumber(number)}>{number}</div>
                        )
                    } else {
                        return (
                            <div className="status__number" key={number} onClick={() => props.onClickNumber(number)}>{number}</div>
                        )
                    }
                })
            }
        </div>
    )
}