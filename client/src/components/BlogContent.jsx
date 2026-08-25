import P from "@editorjs/image";

const Img = ({url,caption})=>{
    return(
        <div><img src={url} alt="" />
        {caption.length?<p className="w-full text-center my-3 md:mb-12 text-base text-grey"></p>:""}
        </div>
    )
}
const Quote = ({quote,caption})=>{
    return(
        <div className="bg-purple-500/10 p-3 pl-5 border-l-4 border-purple-500">
            <p className="text-xl leading-10 md:text-2xl ">"{quote}"</p>
        {caption.length?<p className="w-full text-purple-500 text-center my-3 md:mb-12 text-base "></p>:""}
        </div>
    )
}
const List = ({style,items})=>{
    return(
        <ol className={`pl-5 ${style == "ordered "?"list-decimal":"list-disc"}`}>
            {items.map((listItem,i)=>{
                return <li key={i} className="my-4" dangerouslySetInnerHTML={{__html:listItem}}></li>
            })}
        </ol>
    )
}
const BlogContent = ({block}) => {
    let {type,data}=block
    if (type == "paragraph") {
        return <p dangerouslySetInnerHTML={{__html:data.text}}></p>
    }
    if (type == "header") {
        return <p dangerouslySetInnerHTML={{__html:data.text}}></p>
    }
    if (type == "paragraph") {
        if (data.level==3) {
            return <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{__html:data.text}}></h3>
        }
        if (data.level==2) {
            return <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{__html:data.text}}></h2>
        }
        if (data.level==3) {
            return <h3 className="text-5xl font-bold" dangerouslySetInnerHTML={{__html:data.text}}></h3>
        }
    }
    if (type == "image") {
        return <Img url={data.file.url} caption={data.caption} dangerouslySetInnerHTML={{__html:data.text}}></Img>
    }
    if (type=="quote") {
        return <Quote quote={data.text} caption={data.caption}/>
        
    }
    
    if (type=="list") {
        return <List style={data.style} items={data.items}/>
        
    }
    
    return ( <></> );
}
 
export default BlogContent;
