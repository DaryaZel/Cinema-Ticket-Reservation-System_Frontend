export function ModalWindow({ children, title, onCloseModalWindow }) {
    return (
        <div className='modal' onClick={onCloseModalWindow}>
            <div className='modal__content ' onClick={(e) => e.stopPropagation()}>
                <div className='modal__title'>
                    <h2>{title}</h2>
                </div>
                {children}
                <div >
                </div>
            </div>
        </div>
    )
}
