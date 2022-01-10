export function ModalWindow({ children, title, setActiveModal }) {
    return (
        <div className='modal' onClick={() => setActiveModal(false)}>
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
