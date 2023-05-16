import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer} from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptCycleAction, markCurrentCyclesAsFinishedAction } from "../reducers/cycles/action";
import { differenceInSeconds } from "date-fns";
interface CreateCycleData {
  task: string;
  minutes: number;
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: ()=> void;
  secondsPassed: number;
  setAmountSecondsPassed:(seconds:number) => void;
  createNewCycle:(data: CreateCycleData) => void
  interruptCycle:()=>void
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps{
  children: ReactNode
}
export function CyclesContextProvider({children}: CyclesContextProviderProps){    
  const [cyclesState, dispatch] = useReducer(cyclesReducer, 
    {cycles: [], activeCycleId:null},(initialState)=>{
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
    if(storedStateAsJSON){
      return JSON.parse(storedStateAsJSON);
    }
    return initialState
    })

    const{cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  
    const [secondsPassed, setSecondsPassed] = useState(()=>{
    if(activeCycle){
     return differenceInSeconds(new Date, new Date(activeCycle.startDate));
    }
    return 0
  });
  
  useEffect(()=>{
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  },[cyclesState])
  
  
  function setAmountSecondsPassed(seconds:number){
    setSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){
    dispatch(markCurrentCyclesAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData){
    const newCycle: Cycle = {
    id: String(new Date().getTime()),
    task: data.task,
    minutes: data.minutes,
    startDate: new Date()
  }
  dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0)
  }
  
  function interruptCycle(){
    dispatch(interruptCycleAction())
  }
  return(
    <CyclesContext.Provider 
      value={{
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        secondsPassed,
        setAmountSecondsPassed,
        createNewCycle,
        interruptCycle,
        cycles
      }}>
        {children}
    </CyclesContext.Provider>
  )
  
}