import { useState } from "react"

const Flashcard = (props) => {

    const flip = () => { 
        props.setFlipped(!props.flipped) 
    }
    console.log(props)
    return (
        <>
        <div 
            className="flex flex-col items-center justify-center bg-white border rounded-lg shadow-lg p-10 w-full max-w-2xl h-80 cursor-pointer transition-transform transform hover:scale-105" onClick={flip}>
            <p className="font-bold font-serif text-4xl text-blue-500 mb-4">{props.id}</p>
            {props.flipped ? (<p className="text-2xl text-center font-serif">{props.answer}</p>) : (<p className="text-2xl text-center font-serif">{props.question}</p>)}
        </div>
        </>
    )
}

export default Flashcard