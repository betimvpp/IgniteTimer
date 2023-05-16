import { HandPalm, Play } from "phosphor-react";
import {  HomeContainer, Start, Stop} from "./styles";
import { useContext} from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { NewCountdown } from "./Components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutes: zod
  .number()
  .min(1, 'O ciclo precisa ser de no minimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home(){
  const {createNewCycle, interruptCycle, activeCycle} = useContext(CyclesContext)
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues:{
      task:'',
      minutes:0
    }
  });

  const { handleSubmit, watch, reset} = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data)
    reset();
  }

  const task = watch('task');
  const isDisabled = !task;

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm/>
        </FormProvider>
        <NewCountdown/>

        {activeCycle?(
          <Stop onClick={interruptCycle} type="button">
          <HandPalm size={24}/>
          Interromper
        </Stop>
        ):(
          <Start disabled={isDisabled} type="submit">
          <Play size={24}/>
          Começar
        </Start>
        )}
      </form>
    </HomeContainer>
  )
}