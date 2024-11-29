const { create } = require("domain");
const { read } = require("fs");
const { permission } = require("process");

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  /*
We will create an application that lists arrays within an object as looping through objects are useful
We will use for (let key in obj)

This application will allow hosts to give add users to their chat server, assign roles through permissions that are true or untrue

CHALLENGE,
Make a function and command to turn all permissions off and all permissions on

CHALLENGE 2,
Using the role object, make commands to assign different roles by looping through the settings and assing the values of the chosen role

- refer back to class lesson code for the for(let key in ___)
-let users add ppl to chat, give roles by using function users.push(_ppl)
- list the ppl added in a console log after using for(let n=0; n< users.length; n++)
Challenge 1:
- create new function called allpermission
- use for(let key in settings)
- after do if statement
  - if user = on = settings[key] = true;
  - else if user = off = settings[key] = false;
  Challenge 2:
  - ask user who they want to assign a role to 
  - user will then pick what role they want to assign that person using through readline question
  - an output will show ${users} is now ${roleName} etc.
  - if they want to add a role first check if role already exists using role[roleName]
  - if its new role add basic settings for it, then output `${newrole}` has been added

    */

let users = [];

//CHALLENGE 2 ONLY
let role = {
  moderator:{
    darkMode:true,
    sensitivityAmount:false,
    editAccounts:true,
    deleteAccounts:false,
    createChannels:false,
    editChannels:true
  },
  simple:{
    darkMode:true,
    sensitivityAmount:false,
    editAccounts:false,
    deleteAccounts:false,
    createChannels:false,
    editChannels:false
  },
  coAdmin:{
    darkMode:true,
    sensitivityAmount:true,
    editAccounts:true,
    deleteAccounts:false,
    createChannels:true,
    editChannels:true
  }
};


let settings = {
    darkMode:true,
    sensitivityAmount:true,
    editAccounts:true,
    deleteAccounts:true,
    createChannels:true,
    editChannels:true
}

function createUsers(){
  readline.question("Who you like to add?", _user =>{
    users.push(_user);
    console.log(users);
    StartApp();
  })
      //user readline to prompt for the name of the user to be added
}

//CHALLENGE 2 ONLINE
function assignRole(){
  readline.question("What role would you like to assign into the system?", newRole => {
    if(role[newRole]) {
      console.log(role[newRole], "already exists!");
    } else {
      role[newRole] = {
        darkMode: false,
        sensitivityAmount: false,
        editAccounts: false,
        deleteAccounts: false,
        createChannels: false,
        editChannels: false
    };
    console.log(`${newRole} has been added successfully!`);
    console.log(newRole + ": ", role[newRole]);
    StartApp();
  }
  })
    //user readline to prompt for the new roles to be added to system
}

function listUsers(){
  for(let n=0; n< users.length; n++) {
    console.log(`here are the users added: ${users[n]}`)
  }
    StartApp();//user readline to list out users
}

function assignPermissions(){
  readline.question(`Who would you like to give permission for?`, users, input => {
    console.log(`you are now assigning permission to ${input}`)
  
      readline.question("What role would you like to give them? (moderator, simple, coAdmin)", roleName =>{
        if(role[roleName]) {
          users.role =roleName;
          users.permission = role[roleName];
          console.log(`${input} is now assigned ${roleName}`);
          StartApp();
        }
          })
        })
  
    //user readline to prompt for the admin to give list out added users and give individual permissions for each setting. 
    // This should give roles automatically based on whats assigned to the user based on conditions met.
}

function showPermissions(){
  for(let u=0; u < users.length; u++) {
   for (let user in users) {
            const roleName = users[user];
            const permissions = role[roleName];
            console.log(`Name: ${roleName}`);
            
            console.log("====Permissions====");
            for (let permission in permissions) {
                console.log(` ${permission}: ${permissions[permission]}`);
            }
            }
            }
           
          
           StartApp();
            //loop through all the users settings and roles based on their permissions
}

function allPermissions() {
  readline.question("What would you like to switch the permissions to? (on/off)", answer =>{
    if( answer === "on") {
      for(let key in settings) {
        settings[key] = true;
        console.log("Your current setting for", key, "is", settings[key]);
        StartApp();
      }
    }
    else if(answer === "off") {
      for(let key in settings) {
        settings[key] = false;
        console.log("Your current setting for", key, "is", settings[key]);
        StartApp();
      }
    }
})
}

function StartApp() {
    readline.question("What would you like to do? ", (_command) => {
      
      //add other commands here to add
  
      if(_command === "add user"){
        createUsers();
      }
      else if(_command === "roles"){
        assignRole();
      }
      else if (_command === "list"){
        listUsers();
      }
      else if(_command === "give perms") {
        assignPermissions();
      }
      else if(_command === "show perms") {
        showPermissions();
      }
      else if(_command === "switch perms") {
        allPermissions();
      }
     else if (_command !== "quit") {
        StartApp();
      } 
      else {
        readline.close();
      }
    });
  }
  
  StartApp();
  