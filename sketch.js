let facemesh;
let video;
let predictions = [];
let angle = 0;

// 화장 이미지

let lipsImg;
let eyebrowImg_R;
let eyebrowImg_L;
let cheekImg_R;
let cheekImg_L;
let eyeshadow;
let eyeline_L;
let eyeline_R;
let eyelashL;
let eyelashR;
let eyeunder_L;
let eyeunder_R;
let foundation;

function setup() {
  createCanvas(640, 480);
  
  
  lipsImg = loadImage('lips.png'); // 윗입술 이미지 불러오기
  lips2Img = loadImage('lips under.png');// 아랫입술 이미지 불러오기 
  eyebrowImg_R = loadImage('eyebrowR.png'); // 오른쪽 눈썹 이미지 불러오기
  eyebrowImg_L = loadImage('eyebrowL.png'); // 왼쪽 눈썹 이미지 불러오기
  cheekImg_L = loadImage('cheekL.png');// 왼쪽 볼 이미지 불러오기
  cheekImg_R = loadImage('cheekR.png');//오른쪽 볼 이미지 불러오기 
  eyeshadow = loadImage('eyeshadow.png');//눈 위 셰도우 이미지 불러오기
  eyeline_L = loadImage('eyelineL.png');
  eyeline_R = loadImage('eyelineR.png');
  eyelashL = loadImage('eyelashL.png');
  eyelashR = loadImage('eyelashR.png');
  eyeunder_L = loadImage('eyeunderL.png');
  eyeunder_R = loadImage('eyeunderR.png');
  foundation = loadImage('foundation.png');//코끝시도 
  
  video = createCapture(VIDEO);
  video.size(640, 480);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
    // console.log(predictions)
    // console.log(predictions[i].annotations) 
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}




function draw() {
  image(video, 0, 0, 640, 480);
  // We call function to draw all keypoints
  drawKeypoints();
}




// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    // const keypoints = predictions[i].scaledMesh;

    let part = predictions[i].annotations
    console.log(part) // 리스트들 뽑는것
    //console.log(part.rightEyebrowLower[0])
    // drawKeypoints2(part.rightEyeUpper2[0]) 

    let dx = part.leftCheek[0][0] - part.rightCheek[0][0]
    let dy = part.leftCheek[0][1] - part.rightCheek[0][1]
    let size = dist(part.leftCheek[0][0], part.leftCheek[0][1], part.rightCheek[0][0], part.rightCheek[0][1])
    angle = atan2(dy, dx)


    
    //입술 아래
    let lipLower = getBoundingBox(part.lipsLowerOuter)
    let offsetY0 = -2;
    push()
    translate(lipLower.x, lipLower.y+ offsetY0)
    rotate( angle )
    //blendMode( LIGHTEST )
    tint(200, 40) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part8').hasClass('on') ){
      image(lips2Img, -2, 3, lipLower.width*1.1, lipLower.height*1.0); 
    }
    imageMode(CORNER)
    pop()


    //입술 위
    let lipUpper = getBoundingBox(part.lipsUpperOuter)
    let offsetY5 = 4;
    push()
    translate(lipUpper.x, lipUpper.y+ offsetY5)
    rotate( angle )
    //blendMode( LIGHTEST )
    tint(200, 40) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part8').hasClass('on') ){
      image(lipsImg, 0, -3, lipUpper.width*1, lipUpper.height*1.1); 
    }
    imageMode(CORNER)
    pop()



    //눈썹-R
    let eyebrowRight = getBoundingBox(part.rightEyebrowUpper)
    push()
    translate(eyebrowRight.x, eyebrowRight.y)
    rotate( angle )
    
    tint(100, 80) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part1').hasClass('on') ){
      image(eyebrowImg_R, 3, -5, eyebrowRight.width, eyebrowRight.height);
    }
    imageMode(CORNER)
    pop()


    
    //눈썹-L
    let eyebrowLeft = getBoundingBox(part.leftEyebrowUpper)
    push()
    translate( eyebrowLeft.x, eyebrowLeft.y)
    rotate( angle ) 
    tint(100, 80) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part1').hasClass('on') ){
      image(eyebrowImg_L, 3, -5, eyebrowLeft.width, eyebrowLeft.height); 
    }
    imageMode(CORNER)
    pop()
    
     //셰도우 L
     let eyeshadow1 = getBoundingBox(part.leftEyeUpper1)
     let offsetY9 = -2;
     push()
     translate( eyeshadow1.x,eyeshadow1.y+ offsetY9)
     rotate( angle )
     //blendMode( LIGHTEST ) 
     tint(200, 80) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part2').hasClass('on') ){
     image(eyeshadow, 8 ,0, eyeshadow1.width, eyeshadow1.height); 
     }
     imageMode(CORNER)
     pop()

      //셰도우 L
      let eyeshadow2 = getBoundingBox(part.leftEyeUpper2)
      let offsetY10 = -1;
      push()
      translate( eyeshadow2.x,eyeshadow2.y+ offsetY10)
      rotate( angle )
      //blendMode( LIGHTEST ) 
      tint(200, 50) // 흰색인데, 뒤에껀 투명도
      imageMode(CENTER)
      if( $('#btn_part2').hasClass('on') ){
      image(eyeshadow, 5 ,0, eyeshadow2.width, eyeshadow2.height); 
      }
      imageMode(CORNER)
      pop()

        //셰도우 R
     let eyeshadow3 = getBoundingBox(part.rightEyeUpper1)
     let offsetY11 = -2;
     push()
     translate( eyeshadow3.x,eyeshadow3.y+ offsetY11)
     rotate( angle )
     //blendMode( LIGHTEST ) 
     tint(200, 80) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part2').hasClass('on') ){
     image(eyeshadow, -8 ,0, eyeshadow3.width, eyeshadow3.height); 
     }
     imageMode(CORNER)
     pop()

      //셰도우 R
      let eyeshadow4 = getBoundingBox(part.rightEyeUpper2)
      let offsetY12 = -1;
      push()
      translate( eyeshadow4.x,eyeshadow4.y+ offsetY12)
      rotate( angle )
      //blendMode( LIGHTEST ) 
      tint(200, 50) // 흰색인데, 뒤에껀 투명도
      imageMode(CENTER)
      if( $('#btn_part2').hasClass('on') ){
      image(eyeshadow, -5 ,0, eyeshadow4.width, eyeshadow4.height); 
      }
      imageMode(CORNER)
      pop()
 

     //아이라인 L
     let eyelineLeft = getBoundingBox(part.leftEyeUpper1)
     push()
     translate( eyelineLeft.x,eyelineLeft.y)
     rotate( angle )
     //blendMode( LIGHTEST ) 
     tint(100,90) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part3').hasClass('on') ){
     image(eyeline_L, 7,0, eyelineLeft.width, eyelineLeft.height); 
     }
     imageMode(CORNER)
     pop()

     //아이라인 R
     let eyelineRight = getBoundingBox(part.rightEyeUpper1)
     push()
     translate( eyelineRight.x,eyelineRight.y)
     rotate( angle )
     //blendMode( LIGHTEST ) 
     tint(100,90) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part3').hasClass('on') ){
     image(eyeline_R, -7,1, eyelineRight.width, eyelineRight.height); 
     }
     imageMode(CORNER)
     pop()

     //아마속눈썹 L
     let eyelashLeft = getBoundingBox(part.leftEyeUpper1)
     push()
     translate( eyelashLeft.x,eyelashLeft.y)
     rotate( angle )
     //blendMode( LIGHTEST ) 
     tint(100, 90) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part4').hasClass('on') ){
     image(eyelashL, 7 ,-1, eyelashLeft.width, eyelashLeft.height); 
     }
     imageMode(CORNER)
     pop()

      //아마속눈썹 R
      let eyelashRight = getBoundingBox(part.rightEyeUpper1)
      push()
      translate( eyelashRight.x,eyelashRight.y)
      rotate( angle )
      //blendMode( LIGHTEST ) 
      tint(100, 90) // 흰색인데, 뒤에껀 투명도
      imageMode(CENTER)
      if( $('#btn_part4').hasClass('on') ){
      image(eyelashR, -7 ,1, eyelashRight.width, eyelashRight.height); 
      }
      imageMode(CORNER)
      pop()
 
     
  

     


     //눈아래 L
     let eyeunderL = getBoundingBox(part.leftEyeLower1)
     let offsetY3 = -3;
     push()
     translate( eyeunderL.x,eyeunderL.y+ offsetY3)
     rotate( angle )
     blendMode( LIGHTEST ) 
     tint(200, 20) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part5').hasClass('on') ){
     image(eyeunder_L, 8 ,0, eyeunderL.width, eyeunderL.height); 
     }
     imageMode(CORNER)
     pop()

     //눈아래 R
     let eyeunderR = getBoundingBox(part.rightEyeLower1)
     let offsetY4 = -3;
     push()
     translate( eyeunderR.x,eyeunderR.y+ offsetY4)
     rotate( angle )
     blendMode( LIGHTEST ) 
      tint(200, 20) // 흰색인데, 뒤에껀 투명도
     imageMode(CENTER)
     if( $('#btn_part5').hasClass('on') ){
     image(eyeunder_R, -6 ,2, eyeunderR.width, eyeunderR.height); 
     }
     imageMode(CORNER)
     pop()
  



    //왼쪽볼터치
    let leftCheek = getBoundingBox(part.leftCheek)
    push()
    translate(leftCheek.x, leftCheek.y)
    rotate( angle )
    blendMode( LIGHTEST )
    tint(1000, 50) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part6').hasClass('on') ){
    image(cheekImg_L, 15, -10, size/1.5, size/1.4); 
    }
    imageMode(CORNER)
    pop()



    //오른쪽볼터치
    let rightCheek = getBoundingBox(part.rightCheek)
    push()
    translate(rightCheek.x, rightCheek.y)
    rotate( angle )
    blendMode( LIGHTEST )
    tint(1000, 50) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part6').hasClass('on') ){
    image(cheekImg_R, -15, -10, size/1.5, size/1.4); 
    }
    imageMode(CORNER)
    pop()


    //하이라이터 
    let noseTip = getBoundingBox(part.noseTip)
    let offsetY = -10; 
    push()
    translate(noseTip.x, noseTip.y + offsetY)
    rotate( angle )
    //blendMode( LIGHTEST )
    tint(100, 80) // 흰색인데, 뒤에껀 투명도
    imageMode(CENTER)
    if( $('#btn_part7').hasClass('on') ){
    image(foundation, 0, 0, size/2, size/2); 
    }
    imageMode(CORNER)
    pop()
    

  }
}




function getBoundingBox(_array){
  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

  let sumX=0
  let sumY=0
  for(let i in _array){
    if(_array[i][0] > maxX) maxX = _array[i][0]
    if(_array[i][0] < minX) minX = _array[i][0] 
    if(_array[i][1] > maxY) maxY = _array[i][1] 
    if(_array[i][1] < minY) minY = _array[i][1] 
    sumX += _array[i][0]
    sumY += _array[i][1]
  }

  let result = {x: sumX/_array.length, y:sumY/_array.length, width: maxX - minX, height: maxY - minY}
  return result;
}


// 버튼 인터랙션
$('#btn_makeup1').click(function(){
  lipsImg = loadImage('lips4.png'); // 윗입술 이미지 불러오기
  lips2Img = loadImage('lips under4.png');// 아랫입술 이미지 불러오기 
  eyebrowImg_R = loadImage('eyebrowR.png'); // 오른쪽 눈썹 이미지 불러오기
  eyebrowImg_L = loadImage('eyebrowL.png'); // 왼쪽 눈썹 이미지 불러오기
  cheekImg_L = loadImage('cheekL4.png');// 왼쪽 볼 이미지 불러오기
  cheekImg_R = loadImage('cheekR4.png');//오른쪽 볼 이미지 불러오기 
  eyeshadow = loadImage('eyeshadow4.png');//눈 위 셰도우 이미지 불러오기
  eyeline_L = loadImage('eyelineL.png');
  eyeline_R = loadImage('eyelineR.png');
  eyelashL = loadImage('eyelashL.png');
  eyelashR = loadImage('eyelashR.png');
  eyeunder_L = loadImage('eyeunderL.png');
  eyeunder_R = loadImage('eyeunderR.png');
  foundation = loadImage('foundation.png');//코끝시도 
  

  $('.button-large').removeClass('on')
  $(this).addClass('on');
})
$('#btn_makeup2').click(function(){
  lipsImg = loadImage('lips3.png'); // 윗입술 이미지 불러오기
  lips2Img = loadImage('lips under3.png');// 아랫입술 이미지 불러오기 
  eyebrowImg_R = loadImage('eyebrowR.png'); // 오른쪽 눈썹 이미지 불러오기
  eyebrowImg_L = loadImage('eyebrowL.png'); // 왼쪽 눈썹 이미지 불러오기
  cheekImg_L = loadImage('cheekL3.png');// 왼쪽 볼 이미지 불러오기
  cheekImg_R = loadImage('cheekR3.png');//오른쪽 볼 이미지 불러오기 
  eyeshadow = loadImage('eyeshadow3.png');//눈 위 셰도우 이미지 불러오기
  eyeline_L = loadImage('eyelineL.png');
  eyeline_R = loadImage('eyelineR.png');
  eyelashL = loadImage('eyelashL.png');
  eyelashR = loadImage('eyelashR.png');
  eyeunder_L = loadImage('eyeunderL.png');
  eyeunder_R = loadImage('eyeunderR.png');
  foundation = loadImage('foundation.png');//코끝시도 
  

  $('.button-large').removeClass('on')
  $(this).addClass('on');
})

$('#btn_makeup3').click(function(){
  lipsImg = loadImage('lips2.png'); // 윗입술 이미지 불러오기
  lips2Img = loadImage('lips under2.png');// 아랫입술 이미지 불러오기 
  eyebrowImg_R = loadImage('eyebrowR.png'); // 오른쪽 눈썹 이미지 불러오기
  eyebrowImg_L = loadImage('eyebrowL.png'); // 왼쪽 눈썹 이미지 불러오기
  cheekImg_L = loadImage('cheekL2.png');// 왼쪽 볼 이미지 불러오기
  cheekImg_R = loadImage('cheekR2.png');//오른쪽 볼 이미지 불러오기 
  eyeshadow = loadImage('eyeshadow2.png');//눈 위 셰도우 이미지 불러오기
  eyeline_L = loadImage('eyelineL.png');
  eyeline_R = loadImage('eyelineR.png');
  eyelashL = loadImage('eyelashL.png');
  eyelashR = loadImage('eyelashR.png');
  eyeunder_L = loadImage('eyeunderL.png');
  eyeunder_R = loadImage('eyeunderR.png');
  foundation = loadImage('foundation.png');//코끝시도 

  $('.button-large').removeClass('on')
  $(this).addClass('on');
})

$('#btn_makeup4').click(function(){
  lipsImg = loadImage('lips.png'); // 윗입술 이미지 불러오기
  lips2Img = loadImage('lips under.png');// 아랫입술 이미지 불러오기 
  eyebrowImg_R = loadImage('eyebrowR.png'); // 오른쪽 눈썹 이미지 불러오기
  eyebrowImg_L = loadImage('eyebrowL.png'); // 왼쪽 눈썹 이미지 불러오기
  cheekImg_L = loadImage('cheekL.png');// 왼쪽 볼 이미지 불러오기
  cheekImg_R = loadImage('cheekR.png');//오른쪽 볼 이미지 불러오기 
  eyeshadow = loadImage('eyeshadow.png');//눈 위 셰도우 이미지 불러오기
  eyeline_L = loadImage('eyelineL.png');
  eyeline_R = loadImage('eyelineR.png');
  eyelashL = loadImage('eyelashL.png');
  eyelashR = loadImage('eyelashR.png');
  eyeunder_L = loadImage('eyeunderL.png');
  eyeunder_R = loadImage('eyeunderR.png');
  foundation = loadImage('foundation.png');//코끝시도 

  $('.button-large').removeClass('on')
  $(this).addClass('on');
})

//토글 - 건드릴필요없음

$('.button-small').click(function(){
  $(this).toggleClass('on')
});

