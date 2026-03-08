let all = [];
let Open = [];
let Closed = [];

const informationCollection = async() =>{
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
    div.className = 'p-4 grid  grid-cols-2 md:grid-cols-4 gap-3';
    cards.forEach(element => {
        const divElement = document.createElement('div');
        divElement.innerHTML = element;
        div.appendChild(divElement);
    });
    cardContainer.appendChild(div);
    console.log(cardContainer);
}

const showCard = (id)=>{
   const idvalue = document.getElementById('my_modal_5');
   idvalue.showModal();
}
const funcLun = (event)=>{
    const ans =  event.map(e => {
           return `<div onClick='showCard(${e.id})' class=" h-full bg-white ${borderFunc(e.status)} rounded-xl border-t-[5px] p-3 space-y-4">
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
            return `<span class="border p-3 text-red-400 border-red-400 rounded-xl"><i class="fa-solid fa-bug"></i>Bug</span>`;
         }else if ( e === 'help wanted'){
             return `<span class=" border p-3 text-yellow-400 font-bold border-yellow-400 rounded-xl"><i class="fa-solid fa-life-ring"></i>Help wanted</span>`;
         }else if ( e === 'enhancement'){
             return `<span class=" border p-3 text-green-400 font-bold border-green-400 rounded-xl"><i class="fa-regular fa-star"></i>Enhancement</span>`;
         }else if(e === 'good first issue'){
             return `<span class="border p-3 text-blue-400 font-bold border-blue-400 rounded-xl"><i class="fa-solid fa-thumbs-up"></i>Good first issue</span>`;
         }
         return `<span class="btn  rounded-xl"><i class="fa-brands fa-accusoft"></i>Documentation</span>`;
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
         return 'text-red-500 border-red-500 border-red-400';
     }else if (e == 'medium') {
        return 'text-yellow-500 border-yellow-500 border-yellow-400';
     }
     return 'text-gray-500 border-gray-500 border-gray-400';
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
     removeBtnPrimary();
     displayFunction(ans);
}) 