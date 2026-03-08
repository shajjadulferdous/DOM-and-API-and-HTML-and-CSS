let all = [];
let Open = [];
let Closed = [];
const LoaddingFunction = (value)=>{
      const containValue = document.getElementById('loading-container');
      const cardContainer = document.getElementById('card-container');
      if ( value === true){
           containValue.classList.remove('hidden');
           cardContainer.classList.add('hidden');
      }else{
           containValue.classList.add('hidden');
           cardContainer.classList.remove('hidden');
      }
}
const informationCollection = async() =>{
    LoaddingFunction(true);
    const allIssues = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const allValue  = await allIssues.json();
    const issues = allValue?.data;
    all = issues;
    Open = issues.filter((e) => e.status === 'open');
    Closed = issues.filter((e) => e.status === 'closed');
    displayFunction(all);
}

informationCollection();

const selectBtn = (id)=>{
    LoaddingFunction(true);
    console.log(id);
    removeBtnPrimary();
    const btn = document.getElementById(id);
    
    if ( id === 'all'){
         displayFunction(all);
    }
    else if ( id === 'open'){
         displayFunction(Open);
    }else{
        displayFunction(Closed);
    }
    btn.classList.add('btn-primary');
}

const removeBtnPrimary = ()=>{
    const allthing = document.getElementById('btn-containers');
    const allBtn = allthing.children;
    console.log(allBtn);
    for ( let x of allBtn ){
         x.classList.remove('btn-primary');
    } 
}

const displayFunction =  (containers)=>{
    const issues = document.getElementById('issues-count');
    issues.innerHTML = containers.length;
    const div = document.createElement('div');
    const cards = funcLun(containers);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    div.className = 'p-4 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-5';
    cards.forEach(element => {
        const divElement = document.createElement('div');
        divElement.innerHTML = element;
        div.appendChild(divElement);
    });
    cardContainer.appendChild(div);
    console.log(cardContainer);
    LoaddingFunction(false);
}
const funcvalue = (status)=>{
    if (status === 'open'){
         return `px-5 py-2 font-bold text-white bg-green-500 rounded-full`;
    }
     return `px-5 py-2 font-bold text-white bg-purple-500 rounded-full`;
}
const showCard = async (id)=>{
   const detials = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
   const detial = await detials.json();
   const e = detial?.data
   const modalAdd = document.getElementById('modal_add');
   modalAdd.innerHTML = ` <div class="space-y-5">
        <h1 class="text-3xl font-bold">${e.title}</h1>
        <div class="flex gap-2 items-center">
            <span class="${funcvalue(e.status)
            }">${e.status}</span>
            <span>&#8226;</span>
            <div class="font-semibold">${e.status === 'open' ? "Opened" : "Closed"} by ${e.author ? e.author :"Not Published Yet" }</div>
            <span>&#8226;</span>
            <div class="font-semibold">${new Date(e.updatedAt).toLocaleDateString()}</div>
        </div>
        <div class="flex gap-3 flex-wrap text-[12px]">
                  ${functionLevel(e.labels)}
         </div>
        <p class="text-[#64748B] text-2xl">
            ${e.description}
        </p>
        <div class="bg-base-200 flex p-6 rounded-2xl">
             <div class="flex-1">
                 <h1 class="text-[#64748B] text-xl">Assigne:</h1>
                 <p class="text-xl font-bold">${e.assignee ? e.assignee :"Not Published Yet" }</p>
             </div>
             <div class="flex-1 space-y-3">
                 <h1 class="text-[#64748B] text-xl">Priority:</h1>
                  <span class=" p-2  border rounded-xl font-bold ${funcPriorty(e.priority)}">${e.priority.toUpperCase()}</span>
             </div>
        </div>
     </div>`;
   const idvalue = document.getElementById('my_modal_5');
   idvalue.showModal();
}
const funcLun = (event)=>{
    const ans =  event.map(e => {
           return `<div onClick='showCard(${e.id})' class=" shadow-sm h-full bg-white ${borderFunc(e.status)} rounded-xl border-t-[5px] p-3 space-y-4">
               <div class="flex justify-between">
                  <span><img src="./assets/${e.status}-Status.png" alt=""></span>
                  <span class=" p-2  border rounded-xl text-[12px] ${funcPriorty(e.priority)}">${e.priority.toUpperCase()}</span>
               </div>
               <h1 class="text-lg font-bold">${e.title}</h1>
               <p class="text-sm text-[#64748B]">${e.description}</p>
               <div class="flex gap-3 flex-wrap text-[12px]">
                   ${functionLevel(e.labels)}
               </div>
               <hr class="opacity-10">
               <p class="text-[#64748B]"># ${e.id}.${e.author}</p>
               <p class="text-[#64748B]">${new Date(e.createdAt).toLocaleDateString()}</p>
            </div>`
     });
     return ans;   
}

const functionLevel = (arr)=>{
    const ans =  arr.map(e =>{
         if (e === 'bug'){
            return `<span class="border px-4 py-2 font-bold text-red-400 border-red-400 rounded-xl"><i class="fa-solid fa-bug"></i> Bug</span>`;
         }else if ( e === 'help wanted'){
             return `<span class=" border px-4 py-2 text-yellow-400 font-bold border-yellow-400 rounded-xl"><i class="fa-solid fa-life-ring"></i> Help wanted</span>`;
         }else if ( e === 'enhancement'){
             return `<span class=" border px-4 py-2 text-green-400 font-bold border-green-400 rounded-xl"><i class="fa-regular fa-star"></i> Enhancement</span>`;
         }else if(e === 'good first issue'){
             return `<span class="border px-4 py-2 text-blue-400 font-bold border-blue-400 rounded-xl"><i class="fa-solid fa-thumbs-up"></i> Good first issue</span>`;
         }
         return `<span class="border px-4 py-2 font-bold rounded-xl"><i class="fa-brands fa-accusoft"></i> Documentation</span>`;
     })
     return ans.join(" ");
}

const borderFunc = (status) =>{
      if (status === 'closed'){
          return `border-t-purple-500`;
      }
      return 'border-t-green-500';
}

const funcPriorty = (e)=>{
     if (e === 'high'){
         return 'text-red-500 border-red-500 border-red-400 bg-red-50';
     }else if (e == 'medium') {
        return 'text-yellow-500 border-yellow-500 border-yellow-400 bg-yellow-50';
     }
     return 'text-gray-500 border-gray-500 border-gray-400 bg-gray-50';
}
const getSearchList = async (s)=>{
    const ans = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${s}`);
    const serchValue = await ans.json();
    const res = serchValue ?.data;
    return res ;
}
document.getElementById('search-issues').addEventListener('click' ,async ()=>{
     const input = document.getElementById('search-input');
     const ans = await getSearchList(input.value);
     input.value='';
     LoaddingFunction(true);
     removeBtnPrimary();
     displayFunction(ans);
}) 