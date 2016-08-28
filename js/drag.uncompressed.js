var drag=function(){
  return{
    move:function(d,x,y){
      d.style.left=x+'px';
      d.style.top=y+'px';
    },
    startMoving:function(d,c,e){
      e=e||window.event;
      var c=document.getElementById(c),x=e.clientX,y=e.clientY,l=d.style.left,t=d.style.top,eh=d.clientHeight,ew=d.clientWidth,ch=c.clientHeight,cw=c.clientWidth;
      c.style.cursor='move';
      l=l.replace('px','');
      t=t.replace('px','');
      var dx=x-l,dy=y-t;
      document.onmousemove=function(e){
        e=e||window.event;
        var x=e.clientX,y=e.clientY,ax=x-dx,ay=y-dy;
        if(ax<0)ax=0;
        if(ay<0)ay=0;
        if(ax+ew>cw)ax=cw-ew;
        if(ay+eh>ch)ay=ch-eh;
        drag.move(d,ax,ay);
      }
    },
    stopMoving:function(c){
      var a=document.createElement('script');
      document.getElementById(c).style.cursor='default';
      document.onmousemove=function(){}
    },
  }
}();