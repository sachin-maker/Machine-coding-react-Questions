import React, { useState } from 'react'
import data from './data'
import AccordianItem from './AccordianItem'
import './style.css'

const Accordian = () => {
    const [openID, setOpenID] = useState(null)  // Start with no item open

    return (
        <div className='Accordian'>
            {
                data.map((item) => (
                    <AccordianItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        isOpen={item.id === openID}  // Simplified logic
                        setIsOpen={() => setOpenID(item.id === openID ? null : item.id)}  // Toggle logic
                    />
                ))
            }
        </div>
    )
}

export default Accordian
