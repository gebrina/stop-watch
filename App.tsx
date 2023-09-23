import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { min } from '@popperjs/core/lib/utils/math';


type ButtonProps = {
  tpe:string
  bg:string
}

const Wrapper = styled.section`
      display:flex;
      justify-content:center;
      align-items:center;
      background:rgba(55,55,.3,.3);
      flex-direction:column;
      box-shadow:5px 5px 5px rgba(25,25,25,.5);
      @media only screen and (min-width:600px){
         width:60%;
         border-radius:10px;
         transform:translateY(20px);
         margin:0 auto;
      }
`
const ButtonWrapper = styled.div`
     display:flex;
     width:100%;
     align-items:center;
     justify-content:center;
     flex-wrap:wrap;
`
const Button  = styled.button<ButtonProps>`
    border:none;
    background:${props=>props.bg};
    margin:10px;
    padding:5px 15px;
    font-size:20px;
    font-weight:bold;
    color:#fff;
    border-radius:10px;
    &:hover{
      opacity:.7;
      transition:all .5s ease;
    }
`
const Watch = styled.p `
    text-align:center;
    font-size:40px;
    font-weight:bold;
    color:blue;
`
const WatchWrapper = styled.div`
    display:flex;
    gap:10px;
 `
 const Title = styled.h1`
     font-size:40px;
     color:darkblue;
     font-weight:700;
`

 export const App = ()=>{
    const [clock,setClock] = useState();
     
     const [milisec,setMiliSec] = useState('00');
     const milisecRef = useRef(0); 
     const minutesRef = useRef('00');
     const secondsRef  = useRef('00');
     let miliSecIntervalRef = useRef<any>();
     
     const updateTimer = ()=>{
        milisecRef.current+=1;
       if(milisecRef.current<59){
         setMiliSec(prev=>String(Number(prev)+1))
       }else{
        setMiliSec('00');
        milisecRef.current=0;
        updateSeconds()
       }
     }
    const updateSeconds = ()=>{
      let seconds = Number(secondsRef.current);
      if(seconds<59){
        secondsRef.current = addZeroPrefix(seconds+1);
      }else{
        secondsRef.current='00';
        updateMinutes();
      }
     }

     const updateMinutes = ()=>{
       const minutes = Number(minutesRef.current);
       if(minutes<59){
          minutesRef.current = addZeroPrefix(minutes+1);
       }else{
         minutesRef.current="00";
       }
     }
 
    const addZeroPrefix =(value:number)=>{
        return (value < 10 ? "0" + value : value).toString();
    }

     const handleStart = ()=>{
      miliSecIntervalRef.current=setInterval(()=>{
        updateTimer();
      },10)
     }

    const handleStope = ()=>{
     clearInterval(miliSecIntervalRef.current);
    }

    const handleReset = ()=>{
          handleStope();
         setMiliSec('00');
    }

  return <Wrapper>
    <Title>an HoUr</Title>
    <ButtonWrapper>
    <Button onClick={handleStart} bg="green" tpe="success">Start</Button>
    <Button onClick={handleStope} bg="red" tpe="danger">Stop</Button>
    <Button onClick={handleReset} bg="indigo" tpe="danger">Reset</Button>
    </ButtonWrapper>
    <WatchWrapper>
      <Watch>{minutesRef.current} :</Watch>
      <Watch>{secondsRef.current} :</Watch>
      <Watch>{milisec}</Watch>
    </WatchWrapper>
  </Wrapper>
}