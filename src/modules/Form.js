import React from 'react'; 
// restructure form into simple component 
const Form = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <label>
          
          Please select your country:
          
          <div className="radio">
            <input type="radio" 
              name="userCountry" 
              id="us" 
              value="US"
              checked={props.userCountry === 'US'}
              onChange={props.handleChange}/>
            <label htmlFor="us">US</label>
          </div>

          <div className="radio">
            <input type="radio" 
              name="userCountry" 
              id="canada" 
              value="CA"
              onChange={props.handleChange} 
              checked={props.userCountry === 'CA'}/>
            <label htmlFor="canada">Canada</label>
          </div>

        </label> 
        {/* end of country input*/}

        <label>
          What are you searching for?
        <input 
          name="userInput"
          value={props.userInput}
          onChange = {props.handleChange}
          type="text" 
          placeholder="enter artist, song or music genre" />
        </label>
        {/* end of text input */}
        
        <input type="submit" value="Search"/>
      </form>
    );
}


export default Form;