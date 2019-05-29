import React, {Component} from 'react'; 

class Form extends Component {
  render() {
    return (
      <form>
        <label>
          Please select your country code:
          <input type="radio" name="Canada" id=""/>
          <input type="radio" name="US" id=""/>
        </label>
        <label>
          What are you searching for?
        <input onChange={this.handleSubmit} type="text" placeholder="enter artist, song or music genre" />
        </label>
      </form>
    );
  }
}


export default Form;