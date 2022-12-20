import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { JsxEmit } from 'typescript'


//https://api.shrtco.de/v2/shorten?url=

export type Objects = {
   code:'string',
   full_share_link:'string',
   full_short_link:'string', 
   full_short_link2:'string',
   full_short_link3:'string',
   original_link:'string',
   share_link:'string',
   short_link:'string',
   short_link2:'string',
   short_link3:'string'
}

function MainPage() {
 /* for handling menu bar at mobile view*/ 
const [expand, setExpand] = useState<boolean>(false)

/* for handling shortner */
const [text, setText] = useState<string>("")

/* array to save the url data */
const [data, setData] = useState<Objects | null>(null)

/* for handling copy to clipboard */
const [copy, setCopy] = useState<boolean>(false)

let HandleClick = (event: React.MouseEvent<HTMLDivElement>)=>{
      if(expand === false){
         setExpand(true)
      }else{
         setExpand(false)
      }
}


let HandleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{

   setText(event.target.value)

}

let HandleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
   event.preventDefault()

   if(!text){

      console.log("Empty text")

   }else{

      axios.get(`https://api.shrtco.de/v2/shorten?url=${text}`).then((res)=>{

          let result = res.data.result
          
          setData(result)

      }).catch(error=>console.error(`Error: ${error}`))

      setText("")
      
   }

}

let HandleClipboard = (event: React.MouseEvent<HTMLButtonElement>)=>{

   navigator.clipboard.writeText(data === null ? "" : data.full_short_link2)

   if(copy === false){
      setCopy(true)
   }

}



// console.log(text)
// console.log(data)
  return (
    <>
    <div className='head'>

       <div className={!expand ? 'navigation' : 'navigation expanded'}>

          <div className='logo'>
            <img src="./UrlShortner/images/logo.svg" alt="logo-image" className='logo-img'/>
          </div>

         
         
           <div className="navlist">
           
             <ul className='leftList'>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Resources</a></li>
             </ul>
            

            
             <ul className='rightList'>
                <li><a href="#">Login</a></li>
                <li className='active'><a href="#">Sign Up</a></li>
             </ul>
             
          
         </div> 

          <div className='burga' onClick={HandleClick}>
           <i className="fa fa-bars"></i>
          </div>
          
       </div> 

       

       <div className='banner1'>

          <div className="left">

           <div className="info">
             <h1>More than just</h1>
             <h1>shorter links</h1>
             <div className='pDiv'>
               <p>Build your brand's recognition and get detailed</p>
               <p>insight on how your links are performing</p>
             </div>
           </div> 

            <div className='getStarted'>  
              <div className='anchor'>
                <a href="#">Get Started</a>
               </div>  
            </div>

          </div>

          <div className="right">
             <img src="./UrlShortner/images/illustration-working.svg" alt="worker-img"/>
          </div>

       </div>
        
    </div>

    <div className='shortner'>

       <div className='shortnerDiv'>

          <div className='shortInput'>

            <img src="./UrlShortner/images/bg-shorten-desktop.svg" alt="image"/>

            <div className='tags'>

              <form className='inputTag' onSubmit={HandleSubmit}>

               <div className='input'>

                 <input type="text" placeholder='Shorten a link here...'
                 value={text} onChange={HandleChange}/>

                 <div>
                    <p>please add a link</p>
                 </div>

                 </div>

                 <div className='btnTag'>
                    <button>Shorten it!</button>
                 </div>

              </form>  

            </div>

          </div>

       </div> 

       <div className='shortner-list-container'>
            
       {
         data === null ? <div></div> :
              <div className="shortner-list-div">
                     <div className="list1">{data === null ? null : data.original_link}</div>
                     <div className="list2">{data === null ? null : data.full_short_link2}</div>
                     <div className={copy === false ? "list-btn" : "list-click"}>
                        <button onClick={HandleClipboard}>{copy === false ? "copy" : "Copied!"}</button>     
                     </div>
              </div> 
       }      
            
         </div>

        <div className='advanceStats'>

            <div className='headingtxt'>
                <h1>Advanced Statistics</h1>    
            </div>

            <div className='paratxt'>
                <p>Track how links are perfroming across the web with</p>
                <p>our advanced statistics dashboard.</p>
            </div>

        </div>

        <div className="cards">
         
          
          <hr className='horizon-line'/> 

          <div className='box-container'>

            <div className='box1'>
               <div className='img-container'>

                  <div className='img'>

                     <img src="./UrlShortner/images/icon-brand-recognition.svg"/>

                  </div>

               </div>

               <div className='box-body'>
                  <h4>Brand Recognition</h4>

                  <p>Boost your brand recognition with</p>
                  <p>each click. Generic links don't mean a</p>
                  <p>thing. Branded links help instil</p>
                  <p>confidence in your content.</p>
               </div>

            </div>

            <div className='vert-div'>
                <div className='vert-line'></div>
            </div>    
         
            <div className='box2'>

               <div className='img-container'>

                  <div className='img'>

                     <img src="./UrlShortner/images/icon-detailed-records.svg"/>

                  </div>

               </div>

               <div className='box-body'>
                  <h4>Detailed Records</h4>

                  <p>Gain insight into who is clicking your</p>
                  <p>elinks. Knowing when and where</p>
                  <p>people engage with your content</p>
                  <p>helps inform better decisions.</p>
               </div>
            
            </div>

            <div className='vert-div'>
                <div className='vert-line'></div>
            </div>    

            <div className='box3'>

               <div className='img-container'>

                  <div className='img'>

                     <img src="./UrlShortner/images/icon-fully-customizable.svg"/>

                  </div>

               </div>

               <div className='box-body'>
                  <h4>Fully Customizable</h4>

                  <p>Improve brand awareness and</p>
                  <p>content discoverability through</p>
                  <p>customizable links. supercharging</p>
                  <p>audience engagement.</p>
               </div>
            
            </div> 

         </div>

      </div>


   </div>   

   <div className='boostsection'>

      <img src="./UrlShortner/images/bg-boost-desktop.svg" alt="img"/>

      <div className='descript'>

         <div className='textDiv'>

         <div className='title'>
            <h1>Boost your links today</h1>
         </div>

         <div className='btnDiv'>

            <div className='btn'>
               <a href="#">Get Started</a>
            </div>

         </div>

        </div> 
          
      </div>

   </div>

   <div className='footer'>

      <div className='logo'>
         <h3>Shortly</h3>
      </div>

      <div className='info'>

         <div className='features'>
            <h3>Features</h3>

            <ul>
               <li><a href="#">Link Shortening</a></li>
               <li><a href="#">Branded Links</a></li>
               <li><a href="#">Analytics</a></li>
            </ul>

         </div>

         <div className='resources'>
           <h3>Resources</h3>

            <ul>
               <li><a href="#">Blog</a></li>
               <li><a href="#">Developers</a></li>
               <li><a href="#">Support</a></li>
            </ul>

         </div>

         <div className='company'>
           <h3>Company</h3>

            <ul>
               <li><a href="#">About</a></li>
               <li><a href="#">Our Team</a></li>
               <li><a href="#">Careers</a></li>
               <li><a href="#">Contact</a></li>
            </ul>

         </div>

      </div>

      <div className='media'>

         <ul>
            <a href="#"><i className='fab fa-facebook'></i></a>
            <a href="#"><i className='fab fa-twitter'></i></a>
            <a href="#"><i className='fab fa-pinterest'></i></a>
            <a href="#"><i className='fab fa-instagram'></i></a>
         </ul>

      </div>

   </div>

 </> 
  )
}

export default MainPage