let canvas = undefined;

$( document ).ready(function() {
  $('#order').on('change', (e) => {
    if (canvas === undefined) {
      init();
    }else{
      $('#game-div').html('<canvas id="game" width="720" height="680" style="border:1px solid #000000;"></canvas>');
      $('#ok').off();
      init();
    }
    
    if ($('#order').val() == 'first') {
      console.log('first');
      $('#order_span').text("你");
      $('#ok').show();
    }else{
      $('#ok').hide();
      let cpu = setInterval(()=>{
        cpu_random_choose(canvas);
        clearInterval(cpu);
      },40);

      let cpu_clear = setInterval(()=>{
        if(canvas.getObjects().length > 0){
          // let clearStone = setInterval(()=>{
            for (let i = 0; i < canvas.getObjects().length; i++) {
              if(canvas.getObjects()[i].opacity === 0.5) canvas.remove(canvas.getObjects()[i]);
            }
            // for (let i = 0; i < canvas.getObjects().length; i++) {
            //   if(canvas.getObjects()[i].opacity === 0.5) canvas.remove(canvas.getObjects()[i]);
            // }
            if(canvas.getObjects().length <= 0){
              result(canvas,"你贏了!");
            }
            $('#order_span').text("你");
            $('#ok').show();
          //   clearInterval(clearStone);
          // },1000);  
        }else{
          result(canvas,"你輸了!");
        }
        clearInterval(cpu_clear);
      },1000);
    }
  });
  // fabric.util.getRandomInt(310, 550)
});

function init() {
  canvas = new fabric.Canvas('game',{
    hoverCursor: 'pointer',
    selection: false,
    targetFindTolerance: 2
  });
  canvas.on('mouse:down', function(e) {
    if (e.target && $('#order_span').text() === "你") {
      //console.log('an object was clicked! ', e.target);
      // if(e.target.cacheKey <=  && e.target.cacheKey >=)
      // this.remove(e.target);
      
      if (e.target.opacity == 0.5) {
        e.target.opacity = 1.0;
      }else{
        let num = 0;
        let minTop = 999999;
        for (let i = 0; i < canvas.getObjects().length; i++) {
          if(canvas.getObjects()[i].opacity === 0.5) num++;
          if(canvas.getObjects()[i].top < minTop) minTop = canvas.getObjects()[i].top;
        }
        if(num<2 && e.target.top === minTop){
          e.target.opacity = 0.5;
        }
      }
    }
  });
  let key = 1;
  
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < (i+1); j++) {
      drawStone(canvas,key,10+i*51.2,310-i*25.6+j*55);
      key++;
    }
  }
  

  $('#ok').click((e)=>{
    let num = 0;
    for (let i = 0; i < canvas.getObjects().length; i++) {
      if(canvas.getObjects()[i].opacity === 0.5) num++;
    }
    if (num < 1) {
      alert("請至少選擇一顆石頭!");
    }else{
      for (let i = 0; i < canvas.getObjects().length; i++) {
        if(canvas.getObjects()[i].opacity === 0.5) canvas.remove(canvas.getObjects()[i]);
      }
      for (let i = 0; i < canvas.getObjects().length; i++) {
        if(canvas.getObjects()[i].opacity === 0.5) canvas.remove(canvas.getObjects()[i]);
      }
      $('#ok').hide();
      // let cpu_choose = setInterval(()=>{
        cpu_random_choose(canvas);
      //   clearInterval(cpu_choose);
      // },100);
  
      let cpu_clear = setInterval(()=>{
        if(canvas.getObjects().length > 0){
          // let clearStone = setInterval(()=>{
            for (let i = 0; i < canvas.getObjects().length; i++) {
              if(canvas.getObjects()[i].opacity === 0.5) canvas.remove(canvas.getObjects()[i]);
            }
            for (let i = 0; i < canvas.getObjects().length; i++) {
              if(canvas.getObjects()[i].opacity === 0.5) canvas.remove(canvas.getObjects()[i]);
            }
            if(canvas.getObjects().length <= 0){
              result(canvas,"你贏了!");
            }
            $('#order_span').text("你");
            $('#ok').show();
          //   clearInterval(clearStone);
          // },1000);  
        }else{
          result(canvas,"你輸了!");
        }
        clearInterval(cpu_clear);
      },1000);
    }
    
  });
}

function cpu_random_choose(canvas) {
  $('#order_span').text("電腦");
  let minTop = 999999;
  if(canvas.getObjects().length > 0){
    for (let i = 0; i < canvas.getObjects().length; i++) {
      if(canvas.getObjects()[i].top < minTop && canvas.getObjects()[i].opacity !== 0.5) minTop = canvas.getObjects()[i].top;
    }
    let can_choose = [];
    for (let i = 0; i < canvas.getObjects().length; i++) {
      if(canvas.getObjects()[i].top === minTop && canvas.getObjects()[i].opacity !== 0.5) can_choose.push(canvas.getObjects()[i]);
    }
    let choose = [];

    for (let i = 0; i < Math.round(Math.random()+1); i++) {
      let rand = Math.floor(Math.random() * can_choose.length);
      while(choose.includes(rand) === true){
        rand = Math.floor(Math.random() * can_choose.length);
      }
      can_choose[rand].opacity = 0.5;
      if(can_choose.length == 1) break;
    }
  }
  
}

function drawStone(canvas,key,x,y){
  fabric.Image.fromURL('img/stone.png', function(oImg) {
    // scale image down, and flip it, before adding it onto canvas
    oImg.scale(0.1);
    oImg.set('top',x);
    oImg.set('left',y);
    // oImg.set('angle',fabric.util.getRandomInt(0, 180));
    oImg.perPixelTargetFind = true;
    oImg.hasControls = oImg.hasBorders = false;
    oImg.set('selectable', false);
    oImg.set('cacheKey',key);
    // oImg.set('hoverCursor','pointer');
    canvas.add(oImg);
  });

}

function result(canvas,result){
  var textbox = new fabric.Textbox(result, {
    left: 50,
    top: 50,
    width: 150,
    fontSize: 20
  });
  canvas.add(textbox);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}