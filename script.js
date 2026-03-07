let all = [];
let Open = [];
let Closed = [];
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
const displayFunction = async ()=>{
    const allIssues = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const allValue  = await allIssues.json();
    const issues = allValue?.data;
    all = issues;
    Open = issues.filter((e) => e.status === 'open');
    Closed = issues.filter((e) => e.status === 'closed');
    const main = document.querySelector('main');
    main.classList = [];
    main.innerHTML = '';
    main.className = 'bg-base-200';
    const div = document.createElement('div');
    div.className = 'p-3'
    div.innerHTML = `
            <header class="">
           <div class="navbar bg-base-100 shadow-sm">
            <div class="flex-1"> 
                <a class="btn btn-ghost text-xl"><i class="fa-brands fa-github"></i>GitHub Issues Tracker</a>  
            </div>
            <div class="flex gap-2">               
             <label class="input">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search issues..." />
                </label>  
                <button class="btn btn-primary"><i class="fa-solid fa-plus"></i> New Issue</button>    
            </div>
            </div>
       </header>  
       <section class="w-11/12 mx-auto">
           <div class="navbar bg-base-100 shadow-sm mt-8 p-5 space-x-4">
              <button class="btn btn-primary">All</button>
              <button class="btn">Open</button>
              <button class="btn">Closed</button>
            </div>
       </section>
       <section class="w-11/12 mx-auto">
           <div class="navbar bg-base-100 shadow-sm mt-8 p-5 space-x-4 flex justify-between">
                <div class="flex items-center gap-3">
                    <div>
                    <img src="./assets/Aperture.png" alt="">
                    </div>
                    <div>
                        <h2 class="font-bold text-2xl"><span>50</span> issues</h2>
                        <p class="text-[#64748B] text-xl">Track and manage your project issues</p>
                    </div> 
                </div>
                <div class="space-x-4">
                    <span><i class="fa-solid fa-circle text-green-500"></i>Open</span>
                    <span><i class="fa-solid fa-circle text-purple-500"></i>Closed</span>
                </div>
           </div>
       </section>
       
       <section id="" class="grid grid-cols-4 w-11/12 mx-auto mt-11 gap-3">
            ${funcLun(all)}
       </section>
    `
    main.append(div);
}
const funcLun = (event)=>{
    const ans =  event.map(e => {
           return value = ` <div class="bg-white ${borderFunc(e.status)} rounded-xl border-y-[5px] p-3 space-y-4">
               <div class="flex justify-between">
                  <span><img src="./assets/${e.status}-Status.png" alt=""></span>
                  <span class="btn ${funcPriorty(e.priority)}">${e.priority.toUpperCase()}</span>
               </div>
               <h1 class="text-2xl font-bold">${e.title}</h1>
               <p class="text-xl text-[#64748B]">${e.description}</p>
               <div class="flex gap-3 flex-wrap">
                   ${functionLevel(e.labels)}
               </div>
               <hr class="opacity-10">
               <p>${e.author}</p>
               <p>${e.createdAt}</p>
            </div>`
     });
     
     return ans.join(" ");   
}
const functionLevel = (arr)=>{
    const ans =  arr.map(e =>{
         if (e === 'bug'){
            return `<span class="btn text-red-400 border-red-400 rounded-xl"><i class="fa-solid fa-bug"></i>Bug</span>`;
         }else if ( e === 'help wanted'){
             return `<span class="btn text-yellow-400 font-bold border-yellow-400 rounded-xl"><i class="fa-solid fa-life-ring"></i>Help wanted</span>`;
         }else if ( e === 'enhancement'){
             return `<span class="btn text-green-400 font-bold border-green-400 rounded-xl"><i class="fa-regular fa-star"></i>Enhancement</span>`;
         }else if(e === 'good first issue'){
             return `<span class="btn text-blue-400 font-bold border-blue-400 rounded-xl"><i class="fa-solid fa-thumbs-up"></i>Good first issue</span>`;
         }
         return `<span class="btn  rounded-xl"><i class="fa-brands fa-accusoft"></i>Documentation</span>`;
     })
     return ans.join(" ");
}
const borderFunc = (status) =>{
      if (status === 'closed'){
          return `border-y-purple-500`;
      }
      return 'border-y-green-500';
}

const funcPriorty = (e)=>{
     if (e === 'high'){
         return 'text-red-500 border-red-500 rounded';
     }else if (e == 'medium') {
        return 'text-yellow-500 border-yellow-500 rounded';
     }
     return 'text-gray-500 border-gray-500 rounded';
}