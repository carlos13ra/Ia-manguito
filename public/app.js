async function sendMessage(){

const input = document.getElementById("input");
const chat = document.getElementById("chat");

const text = input.value.trim();

if(!text) return;

chat.innerHTML += `
<div class="user">
${text}
</div>
`;

input.value="";

const thinking = document.createElement("div");

thinking.className = "ai";

thinking.innerHTML = "🤔 Pensando...";

chat.appendChild(thinking);

chat.scrollTop = chat.scrollHeight;

try{

const response = await fetch("/api/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

});

const data = await response.json();

thinking.innerHTML = data.reply;

}catch(error){

thinking.innerHTML =
"❌ Error al conectar con MANGUITO IA™";

}

chat.scrollTop = chat.scrollHeight;

}

document
.getElementById("input")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){

sendMessage();

}

});
