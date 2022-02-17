export function ModalWindow({ children, title, onCloseModalWindow }) {
    return (
        <div className='auth-modal' onClick={onCloseModalWindow}>
            <div className='auth-modal__content ' onClick={(e) => e.stopPropagation()}>
                <div className='auth-modal__title'>
                    <h2>{title}</h2>
                </div>
                {children}
                <div >
                </div>
            </div>
        </div>
    )
}
