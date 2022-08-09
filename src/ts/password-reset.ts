export const passwordResetView = (link: string): string => `
  <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
  <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Decafit.</h2>
   <p>Hi there, Follow the link by clicking on the button 
   </p>
    <a href=${link}
    style="background: crimson; text-decoration: none; color: white; 
     padding: 10px 20px; margin: 10px 0; 
    display: inline-block;">Click here</a>
    to change your password. The link will expire in 30 mins.
   </div>
`;