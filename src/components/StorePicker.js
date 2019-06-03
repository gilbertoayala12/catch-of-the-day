import React, { Fragment } from "react";
import {getFunName} from '../helpers';
// siempre importar react en los componentes
class StorePicker extends React.Component {
  // se escribe asi la clase para la reutilizacion
  // todas necesitan un metodo de awebo y es el render
  // nunca se toca el DOM hasta que se monta toda la aplicacion en la pagina
  // u cant return children elements
  render() {
    return (
      <Fragment>
        <form className="store-selector">
          {/* Comentarios, siempre dentro del return element */}
          <h2>Please enter a store </h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
