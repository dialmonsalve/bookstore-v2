import { useUIContext } from "@/hooks/context";

export const AlertSuccess = () => {

  const { toggleAlert } = useUIContext();

  return (

    <div className={`alert ${toggleAlert ? 'show-alert' : 'hide-alert'} `} >
      <p className="alert__messenger" >Usuario creado con éxito</p>
    </div>
  )
}
