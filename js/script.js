const findApiData= async(isButtonClicked=false, isShortClicked=false )=>{
    const response= await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const data= await response.json();
        const dataFind= await data.data;
        const dataArray = await dataFind.tools;
        lodeData(dataArray,isButtonClicked,isShortClicked);
    
}
findApiData();

const lodeData= (arrayOfData, isButtonClicked,isShortClicked)=>{
    let allArrayData= arrayOfData;
    let aiPlace= document.getElementById('ai_container');
    aiPlace.innerHTML='';

    let showBTN = document.getElementById('showAll');
    
    if(isShortClicked === true){
        allArrayData.sort((a,b)=>{
            let dateA= new Date(a.published_in);
            let dateB= new Date(b.published_in);
            return dateB - dateA;
        });
        allArrayData = arrayOfData;
        showBTN.classList.add("hidden");
    }else if(isButtonClicked != true){
        allArrayData = arrayOfData.slice(0,6);
        showBTN.classList.remove("hidden");
    }else{
        allArrayData = arrayOfData;
        showBTN.classList.add("hidden");
    }

    allArrayData.forEach(singleAi => {
        console.log(singleAi)
        let id = singleAi.id;
        let div= document.createElement('div');
        div.innerHTML=`  
        <div onclick="modalOpen('${id}')" class="min-h-[480px] bg-[#eee] rounded-xl shadow-xl border-[1px] border-black p-5 flex  flex-col justify-between">
            <figure class=rounded-xl overflow-hidden p-3">
                <img class="h-52 rounded-xl mx-auto" src="${singleAi?.image ? `${singleAi.image}`: "No Image Found" }" alt="Ai_picture" />
            </figure>
            <div class="mt-1 px-3">
                <h2 class="text-2xl font-semibold">Features</h2>
                <ul id="features">
                ${singleAi.features.map(value=>
                    `<li class="list-decimal ml-3">${value}</li>`).join('')}
                </ul>
                <hr class="border-black my-5">
                <h2 id="company" class="text-2xl font-bold">${singleAi.name}</h2>
                <div id="date" class="font-medium text-base">${singleAi.published_in}</div>
            </div>
        </div>
    `;
        aiPlace.appendChild(div);
        let featurePlace = document.getElementById('features');
    });  
};

const buttonClicked=()=>{
    findApiData(true, 'false');
};

const shortBTN=()=>{
    findApiData('false',true);
};
 

const modalOpen= async(id)=>{
    my_modal.showModal();
    const response= await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const responseData= await response.json();
    const singleResponseData = responseData.data;
    loadModal(singleResponseData);
};

const loadModal=(singleResponseData)=>{
    let modalDescription = document.getElementById('modalDescription');
    let pricing = document.getElementById('pricing');
    let modalFeatures = document.getElementById('modalFeatures');
    let modalIntegrations = document.getElementById('modalIntegrations');
    let image = document.getElementById('image');
    let input = document.getElementById('input');
    let output = document.getElementById('output');

    modalDescription.innerText=`${singleResponseData.description}`;

    pricing.innerHTML=`
        ${singleResponseData?.pricing?.map(value=>
            `<div class="flex flex-col p-3 min-w-[100px] bg-red-100    rounded-lg text-center">
                <h2 class="text-xl">${value.plan?`${value.plan}`:'NO DATA'}</h2>
                <p class="text-lg font-medium mt-3">${value.price?`${value.price}`:'NO DATA'}</p>
                </div>
            `).join('')
        }`;

    let featuresOBJ =singleResponseData.features;
    for(let key in featuresOBJ){
        let p= document.createElement('li');
        p.classList.add('ml-3')
        p.innerText=`${featuresOBJ[key].feature_name}`;
        modalFeatures.appendChild(p);
    };

    modalIntegrations.innerHTML=`
    ${singleResponseData.integrations.map(value=>`
        <li>${value}</li>
    `).join('')}
    `;

    image.innerHTML=`
    <img src='${singleResponseData.image_link[0]}' alt="Ai Image" class="rounded-xl overflow-hidden border-[1px] min-h-[250px]">
    `;

    input.innerHTML=`${singleResponseData.input_output_examples.map(data=>`<h2 class="mb-6">${data.input}</h2>`).join('')}`;
    output.innerHTML=`${singleResponseData.input_output_examples.map(data=>`<p class="mb-5">${data.output}</p>`).join('')}`;
};
