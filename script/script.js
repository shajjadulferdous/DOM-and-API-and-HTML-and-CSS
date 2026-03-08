
const submit = document.getElementById('sign-in-submit');
submit.addEventListener('click' , ()=>{
    const userName = document.getElementById('user-username').value;
    const password = document.getElementById('user-password').value;
    // if ( userName === 'admin' && password === 'admin123'){
    if(true){
         displayFunction();
    }else{
        console.log('password and username wrong')
    }
})
