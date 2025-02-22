import React from 'react'

const AccordianItem = ({ question, answer, isOpen, setIsOpen }) => {
    return (
        <div className={`AccordianItem ${isOpen ? 'open' : ''}`}>
            <div className='title' onClick={setIsOpen}>
                <span>{question}</span>
                <span>{isOpen ? '⬆️' : '⬇️'}</span>  {/* Toggle arrow */}
            </div>
            {isOpen && <div className='title-body'>{answer}</div>}
        </div>
    )
}

export default AccordianItem
