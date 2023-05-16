import { FormContainer, TaskInput, TimeInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm () {
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  return(
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text" 
            id="task" 
            list="task-sugestions"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
            />

          <datalist id="task-sugestions">
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
            <option value="Projeto 3"/>
            <option value="Projeto 4"/>
          </datalist>

          <label htmlFor="minutes">durante</label>
          <TimeInput 
          type="number" 
          placeholder="00" 
          id="minutes" 
          step={5}
          min={5}  
          max={60}
          disabled={!!activeCycle}
          {...register('minutes', {valueAsNumber:true})}
          />

          <span>minutos.</span>
        </FormContainer>
  )
}