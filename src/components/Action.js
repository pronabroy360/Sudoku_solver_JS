import { Svg } from './Svg';

export const Action = (props) => {
    return (
        // this is messy af, need to sort this out later
        <div className={props.action === 'undo' ? 'status__action-undo' : props.action === 'erase'
            ? 'status__action-erase'
            : props.action === 'hint'
                ? 'status__action-hint'
                : ''
        } onClick={props.onClickAction} >
            <Svg action={props.action} />
            <p className='status__action-text'>
                {
                    props.action === 'undo'
                        ? 'Undo'
                        : props.action === 'erase'
                            ? 'Erase'
                            : props.action === 'hint'
                                ? 'Hint'
                                : ''
                }
            </p>
        </div>
    )
}