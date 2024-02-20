export const Header = (props) => {
    return (
        <header className="header">
            <h1>
                <span>Sudoku</span>
            </h1>
            <h2 onClick={props.onClick}>
                New Game
            </h2>
        </header>
    )
}