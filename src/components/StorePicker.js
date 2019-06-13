import React from "react";
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";
// siempre importar react en los componentes
class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }
  // se escribe asi la clase para la reutilizacion
  // todas necesitan un metodo de awebo y es el render
  // nunca se toca el DOM hasta que se monta toda la aplicacion en la pagina
  // u cant return children elements
  myInput = React.createRef();

  goToStore = event => {
    // stop the form from submitting
    event.preventDefault();
    // get the text from that input

    const storeName = this.myInput.current.value;
    // change page to store/loquemetieron usando react router
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Comentarios, siempre dentro del return element */}
        <h2>Please enter a store </h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store ☻</button>
      </form>
    );
  }
}

export default StorePicker;
