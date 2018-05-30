$(function(){
    const header=$("#header");
    const main=$("#homePage");
    const arrow= $(".downArrow");
    const workList=$(".workList");
    const submit=$("#submit");
    const closeWindow=$(".closeWindow");
    const layer=$(".layer");
    const leftArrow=$(".leftArrow");
    const rightArrow=$(".rightArrow");
    const hamburger=$(".hamburger");
    let min=0,max=0;
    let currentWork=0; //represents the number of the currentWork that is being displayed in the overlay
    
    //typed.js 
    var typed = new Typed('.typed-text', {
          strings: ["","Hello There!", "I'm Abdesselam ." ,"I'm a software Developer." ,"scroll down to learn more about me"],
          typeSpeed: 50,
        smartBackspace: true,
            backDelay: 1000,
            startDelay: 1000,
            loop:false
        });
    
    
    
    minMax();
    //creating two variables one for min and one for max depending on the number of li in the workList 
    function minMax(){
     let len=  $(".workList li").length;
     if(len>1){
         min=1;
         max=len;
     }else if(len===1){
         min=max=len;
     }
    }
    
    //adding class displayBackground to the header when the hamburger is clicked
    hamburger.on("click",function(){
       $("#header").toggleClass("displayBackground"); 
    });
    
    //disable click on a elements of the workList to prevent it from jumping to the site without passing through the description
    $(".workList li a").on("click",function(){
       return false;
    });
    
    //adding click event to the left and right arrows of the overlay 
    leftArrow.on("click",function(){
        if(currentWork===min){
            return ;
        }
         let previousWork=$(`[data-number=${--currentWork}]`);
         previousWork.click();
    });
    rightArrow.on("click",function(){
        if(currentWork===max){
            return ;
        }
        let nextWork=$(`[data-number=${++currentWork}]`);
        nextWork.click();
    });
    
    //adding a click event to the closeWindow button to close the overlay 
    closeWindow.on("click",function(){
       $(".overlay").css("display","none"); 
       $(".wrap").css("transform","translateY(-112%)");
       $(this).css("opacity","0"); 
       layer.addClass("hideArrows");
        
    });
    
    
    //adding id home to html tag for codepen
   document.querySelector("html").setAttribute("id","home");
    
    //handling the click of submit button
    submit.on("click",function(e){
      
      let empty=false;
      //check if one of the inputs is empty
      $("input").each(function(x,i){
        if($(this).attr("type")!=="checkbox" && $(this).val()===""){
          $(this).css("outline","#a52121 2px solid");
          empty=true;
        }else if($(this).attr("type")!=="checkbox"){
            $(this).css("outline","#a52121 0px solid");
        }
      });
        //checking the textarea too
        if($("textarea").val()===""){
            $("textarea").css("outline","2px solid #a52121");
        }else{
            $("textarea").css("outline","0px solid #a52121");
        }
     if(empty){
         alert("all the boxes must be filled");
         e.preventDefault();
     }
      
    });
    
    //applying click event on the work list items
   workList.find("li").each(function(event){

     
      let li=this;
     
      this.addEventListener("click",function(event){
          console.log(this);
          event.stopPropagation();
          currentWork=parseInt($(li).attr("data-number"));
          let Ppicture=$(".Ppicture");
          let Pdescription=$(".Pdescription");
          //cloning the picture because append moves it to another place 
          let img=$(li).find("img").clone();
          //appending the picture to the Ppicture div of the overlay 
          Ppicture.empty().append(img);
          let Pdesc=$(li).find(".Pdesc").html();
          Pdescription.html(Pdesc);
          let link=$(li).find("a").attr("href");
          $(".link").attr("href",link);
          $(".overlay").css("display","block");
          setTimeout(function(){
          $(".wrap").css("transform","translateY(0%)");
          //make the close button appear on transitionend
          $(".wrap").on("transitionend",function(){
              closeWindow.css("opacity","1");
              layer.removeClass("hideArrows");
          });
          },100);
         
        //checking if we are at the last work page 
       //if so hide the right arrow and same for the left arrow
       if(currentWork===min){
          $(".leftArrow").hide();
       }else if(currentWork===max){
           $(".rightArrow").hide();
       }else{
           $(".leftArrow").show();
           $(".rightArrow").show();
       }
      });
     
    });
    //handling the clicks of a elements in the nav
    document.querySelectorAll(".headerItems").forEach(item=>{
       item.addEventListener("click",function(e){
           e.preventDefault();
           linkClicked(item);
       })
    });
    document.querySelector(".name").addEventListener("click",function(e){
        e.preventDefault();
       linkClicked(this); 
    });
   function linkClicked(item){
     let link= item.querySelector("a");
       smoothScroll(link);
   }
    
    
    
    //smooth scrolling
    arrow.on("click",function(e){
     e.preventDefault();
     let link=this.querySelector("a");
      smoothScroll(link);
    });
    
    function smoothScroll(f){
        let id=f.getAttribute("href");
        let top=$(id).offset().top-84; //-84 is the height of the nav bar so that it's not hidden by the nav bar
        $("html ,body ").stop().animate({scrollTop:top},1500);
    }
  $(window).on("scroll",debounce(executeOnScroll));
  
       function debounce(func, wait = 15, immediate = true) {
          var timeout;
          return function() {
            var context = this, args = arguments;
            var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
          };
    };
    
    
    function executeOnScroll(){
    // making the navbar stick to the top on scroll
     if(window.pageYOffset>20){
         header.addClass("fixed");
     } else{
         header.removeClass("fixed");
     } 
      

      //cheking if scroll is below the sample 
     
       document.querySelectorAll(".sample").forEach(x=>{
          let aboutSectionOffset=document.querySelector("#about").offsetTop;
          let height=parseInt(window.getComputedStyle(x,null).getPropertyValue("height").slice(0,-2));
          let sampleOffset=height+x.offsetTop;
         if(window.pageYOffset+window.innerHeight>sampleOffset+aboutSectionOffset){
           x.classList.remove("invisible");
           x.querySelector(".information").classList.remove("invisible");
         }else if(!x.classList.contains("invisible")){
             x.classList.add("invisible");
             x.querySelector(".information").classList.add("invisible");
         }
      });
    
        //applying fadeIn on sections when scrolling to them 
        let sections=document.querySelectorAll("section");
        sections.forEach(section=>{
        let sectionOffset=section.offsetTop+200;
        if(window.pageYOffset+window.innerHeight>sectionOffset && section.classList.contains("fadeIn")){
           section.classList.remove("fadeIn");
        }else if(window.pageYOffset+window.innerHeight< sectionOffset && !section.classList.contains("fadeIn")){
            section.classList.add("fadeIn");
        }
          
      });
        //hiding the down arrow when scrolling half the home section
         let downArrow=$(".downArrow");
         let halfMainSection=(main.height()/2)+50;
         if(this.pageYOffset>=halfMainSection){    
             downArrow.css("opacity","0");
         }else if(downArrow.css("opacity")==="0"){
             downArrow.css("opacity","1");
         }
        
        
        
    }
    
    
    
  });