
const today = new Date().toLocaleDateString();

export const HeaderTransaction = () => {
  
  return (
    <>
      <div className="transactions-header__left" >
        <p className="transactions-header__left--p" >Fecha: {today}</p>
        <p className="transactions-header__left--p" >Dirección</p>

      </div>
      <div className="transactions-header__right" >
        <p className="transactions-header__right--p" >Teléfono</p>
        <p className="transactions-header__right--p" >Contacto</p>
      </div>
    </>
  )
}


