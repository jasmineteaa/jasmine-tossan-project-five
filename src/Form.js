import React from 'react'; 
// restructure form into simples component 
const Form = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <label>
          Please select your country:
          
          <div className="radio">
            <input type="radio" 
            name="country" 
            id="us" 
            value="US"
            checked={props.userCountry === 'US'}
            onChange={props.handleOptionChange}
            />
            <label htmlFor="us">US</label>
          </div>

          <div className="radio">
            <input type="radio" 
            name="country" 
            id="canada" 
            value="CA"
            onChange={props.handleOptionChange} 
            checked={props.userCountry === 'CA'}
            />
            <label htmlFor="canada">Canada</label>
          </div>

        </label> 
        {/* end of country */}

        <label>
          What are you searching for?
        <input 
        value={props.userInput}
        onChange = {props.handleChange}
        type="text" 
        placeholder="enter artist, song or music genre" />
        </label>
        {/* end of text input */}
        
        <input type="submit" 
        value="Search"/>
      </form>
    );
}


export default Form;