import { Difficulty, Timer, Numbers, Action, Mode } from '../';

export const Sidebar = (props) => {
    return (
        <section className="status">
            <Difficulty difficulty={props.gameDifficulty} onChange={props.onChange} />
            <Timer timeGameStarted={props.timeGameStarted} won={props.won} />
            <Numbers numberSelected={props.numberSelected} onClickNumber={(number) => props.onClick(number)} />
            <div className="status__actions">
                <Action action="undo" onClickAction={props.onClickUndo} />
                <Action action="erase" onClickAction={props.onClickErase} />
                <Action action="hint" onClickAction={props.onClickHint} />
                <Mode mode="mistakes" onClickMode={props.onClickMistakesMode} />
                <Mode mode="fast" onClickMode={props.onClickFastMode} />
            </div>
        </section>
    )
}