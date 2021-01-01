window.onload=function(){

  const checkbox=document.getElementById('chk');
  let dark=localStorage.getItem("dark");
  
  const toggleDarkMode=()=>{
    document.body.classList.toggle('dark');
    if(dark=="enabled"){
      localStorage.setItem("dark","disabled");
    }
    else{
      localStorage.setItem("dark","enabled");
     }
  };
  
  checkbox.addEventListener('change',()=>{
    // if(dark!=="enabled"){
    //   console.log(dark);
    //   enableDarkMode();
    // } 
    // else {
    //   console.log(dark);
    //   console.log("444");
    //   disableDarkMode();
    // }
    toggleDarkMode();
    //document.body.classList.toggle('dark');
  })
  
  }



// window.onload=function(){

// const checkbox=document.getElementById('chk');
// let darkMode=localStorage.getItem("darkMode");

// const enableDarkMode=()=>{
//   document.body.classList.add('dark');
//   console.log('hii');
//   localStorage.setItem("darkMode",'enabled');
// };

// const disableDarkMode=()=>{
//   document.body.classList.remove('dark');
//   console.log('byee');
//   localStorage.setItem("darkMode",'disabled');
// };

// const toggleDarkMode=()=>{
//   document.body.classList.toggle('dark');
//   localStorage.setItem.toggle("dark");
// };

// console.log(darkMode);

// checkbox.addEventListener('change',()=>{
//   if(darkMode!=='enabled'){
//     console.log(darkMode);
//     enableDarkMode();
//   } 
//   else {
//     console.log(darkMode);
//     console.log("444");
//     disableDarkMode();
//   }
//   //toggleDarkMode();
//   //document.body.classList.toggle('dark');
// })

// }