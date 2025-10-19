export const config ={
    Regex:{
         nameRegex : /^[A-Z][a-z](:\s[A-Z][a-z])*$/,
         spaceRegex : /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
         emailRegex : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
         phRegex : /^[0-9]{10}$/,
         passRegex :/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,50}$/,
    }
}