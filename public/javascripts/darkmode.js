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
  
  
  