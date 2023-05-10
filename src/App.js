import { useEffect, useState } from 'react';
import './App.css';
import { Color } from './components/Color/Color';

export default function App() {
  const [colorArr, setColorArr] = useState([])

  useEffect(()=>{
    let arrTmp = getColorsFromHash()
    if (arrTmp.length === 0) {
      for(let i=0; i<5; i++) {
        let col = generateRandomColor()
        arrTmp.push(col)
      }
      updateColorsHash(arrTmp)
    }
    
    setColorArr(arrTmp)
    document.addEventListener('keydown', e => {
      e.preventDefault()
      if(e.code.toLowerCase() === 'space') {
        setColorArr([])
        let arr = []
        document.querySelectorAll('.color h2').forEach((el, i)=>{
          if(document.querySelectorAll('.color i')[i].className==='fa-solid fa-lock-open') {
            let col = generateRandomColor()
            arr.push(col)
          }
          else {
            arr.push(el.innerHTML)
          }
        })
        setColorArr(arr)
        updateColorsHash(arr)
      }
    })
  },[])

  function updateColorsHash(colors = []) {
    document.location.hash = colors
      .map(col => {
        return col.toString().substring(1)
      })
      .join('-')
  }

  function getColorsFromHash() {
    if (document.location.hash.length > 1) {
      return document.location.hash
        .substring(1)
        .split('-')
        .map(color => '#' + color)
    }
    return []
  }

  const generateRandomColor = ()=> {
    // RGB
    // #FF0000
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
  }

  return (
    <div className='color-list'>
    {colorArr.map((color, i)=>{
        return (
          <Color color = {color} key={i}/>
        )
      })
    }
    </div>   
  );
}
