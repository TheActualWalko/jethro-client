const socket = io.connect("http://sam-watkinson.com:3000");

const img = document.getElementById("img");

const vote = (dir)=>{
  console.log("voting " + dir);
  socket.emit("vote", dir, result=>{
    if( result === "voted" ){
      console.log("voted successfully");
    }else{
      console.log("vote failed: " + result);
    }
  });
};

socket.on("connect", ()=>{
  console.log("connected");
});

socket.on("results", results=>{
  console.log(results);
});

socket.on("frame", frame=>{
  const blob = new Blob([frame], { type : "image/jpg" });
  const blobURL = URL.createObjectURL(blob);
  img.setAttribute("src", blobURL);
  console.log("got frame");
});

const buttons = document.querySelectorAll("button");

buttons.forEach(b=>{
  b.addEventListener("click", ()=>{
    vote(b.attributes["data-vote"].value);
  });
});