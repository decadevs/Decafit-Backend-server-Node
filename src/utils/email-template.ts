export function template (token:string):string {
     let temp = `<div style="max-width: 700px; 
     margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
     <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Decafit.</h2>
      <p>Congratulations! You're almost set to start using Decafit App.
         Here is your verification token
      </p>
      ${token}
      </div>`
      return temp
}