$(function(){
    const header=$("#header");
    const main=$("#homePage");
    const arrow= $(".downArrow");
    const workList=$(".workList");
    const submit=$("#submit");
    
    //handling the click of submit button
    submit.on("click",function(){
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
     }
      
    });
    
    //applying click event on the work list items
    workList.find("li").each(function(){
      let li=this;
      this.addEventListener("click",function(){
        li.querySelector("a").click();  
      });
    });
    
    document.querySelectorAll(".headerItems").forEach(item=>{
       item.addEventListener("click",function(){
           linkClicked(item);
       })
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
        let top=$(id).offset().top;
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
    }
    
    
    
  });