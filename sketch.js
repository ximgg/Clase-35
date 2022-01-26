var hypnoticBall, database;
var position;


function setup(){
  //agregamos la base de datos
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//ref(referencia)
  var hypnoticBallPosition = database.ref('ball/position');
  //.on (oyente)
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  //.set permite actualizar posiciones
  database.ref('ball/position').set({ 
    'x':position.x +x, 
    'y':position.y +y

  })
}
//permite mover a la pelota con la base de datos
function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}
