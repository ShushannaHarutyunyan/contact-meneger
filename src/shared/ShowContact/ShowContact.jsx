import './ShowContact.css';

const ShowContact=({title, value})=>{
    return (  <div className="contener"> 
{
(Array.isArray(value))? value.map((el, index)=>{
    console.log(el)
return <div key={index}>{el}</div> }):<div>{value}</div>
}
</div>)
}
export default ShowContact;