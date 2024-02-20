export const Difficulty = (props) => {
    return (
        <div className="status__difficulty">
            <span className="status__difficulty-text">Difficulty:</span>
            <select name="status__difficulty-select" className="status__difficulty-select" defaultValue={props.gameDifficulty} onChange={props.onChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
    )
}