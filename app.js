let searchBtn=document.querySelector('#search');
let notFound=document.querySelector('.not_found');
let apiKey='d61623dc-b96a-44ae-899b-0b4c491ba5af';
let defBox = document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.loading');
searchBtn.addEventListener('click',function(e){
    e.preventDefault;
var input=document.getElementById("input").value; //  I think scope problem when defining outside 

// clear data
// that mean jab phir se text doge to clear hone ke baad badega bcz pahle ki blanck kar diya 
audioBox.innerHTML="";
notFound.innerText='';
defBox.innerText='';

// get input data 

 const word=input;
if(word =='')
{
    alert("type something");
    return;
}

getData(input);

// call api 

})
async function getData(input){
    // js me bhi css change kar sakte h .style karke 
    loading.style.display='block';
    // ajax call 
console.log(input)
   const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/
   ${input}}?key=${apiKey}`);
    const data= await response.json();
      console.log(data);
    if(!data.length){
        loading.style.display='none';
        notFound.innerText ="No Result Found";
        return;
    }

    // IF result is suggestions 
    if(typeof data[0] ==='string'){
        loading.style.display='none';
        // alert("kjdbfk")
        let heading =document.createElement('h3');
        heading.innerText='Did You Mean?';
        
        notFound.appendChild(heading);
        data.forEach(element =>{
            let suggestion=document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText=element;
            notFound.appendChild(suggestion);

        })
        return;
    }
    /* Result found */
    loading.style.display='none';
    let defination =data[0].shortdef[0];
    defBox.innerText=defination;

// Sound 
const soundName= data[0].hwi.prs[0].sound.audio;
if(soundName)
{
  renderSound(soundName);
}

 function renderSound(soundName) {
    // https:media.merriam-webster.com/soundc11
    let subfolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?{apiKey}`;

    let aud=document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;  // imp ,all controls provide karta 
    audioBox.appendChild(aud);


 }  
}