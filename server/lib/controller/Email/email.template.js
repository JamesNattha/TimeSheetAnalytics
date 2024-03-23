const { CLIENT_ORIGIN } = require('../config')

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

  confirm: id => ({
    subject: 'Confirm Email',
    html: `
    <h3> Hello ${email}</h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To Confirm your account, please follow this link:</p>
      <a href='${CLIENT_ORIGIN}/confirm/${id}'>
        click to confirm email
      </a>
      <p>YOUR WELCOME</p>
      <p>UNDEFINED CO .LTD</p>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })
  
}