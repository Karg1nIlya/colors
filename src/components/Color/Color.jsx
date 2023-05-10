import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import "./color.css"

export function Color({color}) {
    const [colorName, setColorName] = useState('')
    const [textColor, setTextColor] = useState('black')
    const [lockClassName, setLockClassName] = useState('-open')

    useEffect(()=>{
        setColorName(color)
        changeTextColor(color)
    },[color])

    const changeTextColor = cl => {
        const luminance = chroma(cl).luminance()
        let color = luminance > 0.5 ? 'black' : 'white'
        setTextColor(color)
    }

    const changeLock = () => {
        if(lockClassName === '') {
            setLockClassName('-open')
        }
        else {
            setLockClassName('')
        }
    }

    const copyToClickboard = text => {
        return navigator.clipboard.writeText(text)
    }

    return (
        <div className="color" style={{background: colorName}}>
            <h2 style={{color: textColor}} onClick={()=>copyToClickboard(colorName)}>{colorName}</h2>
            <button onClick={changeLock}>
                <i style={{color: textColor}} className={`fa-solid fa-lock${lockClassName}`} data-type="lock"></i>
            </button>
        </div>
    )
}