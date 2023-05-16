import { useContext, useEffect } from "react";
import { CountDown } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext"

export function NewCountdown() {
  const {
    activeCycle, 
    activeCycleId, 
    markCurrentCycleAsFinished, 
    secondsPassed,
    setAmountSecondsPassed
  } = useContext(CyclesContext)

  const totalSeconds =  activeCycle ? activeCycle.minutes * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds/60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(()=>{
    if(activeCycle){
      document.title = `Timer : ${minutes}:${seconds}`
    }
  },[minutes, seconds, activeCycle])

  useEffect(()=>{
    let interval:number;

    if(activeCycle){
      interval = setInterval(()=>{
        const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate));

        if(secondsDifference >= totalSeconds){
          markCurrentCycleAsFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }        
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCycle, 
    totalSeconds, 
    activeCycleId, 
    markCurrentCycleAsFinished, 
    setAmountSecondsPassed])

  return (
  <CountDown>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <div>:</div>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </CountDown>)
}