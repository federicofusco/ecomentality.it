import Image from 'next/image';
 const Avatar = ({name , img}) => {
    return <div style={{width: 200, height: 240, backgroundColor: '#32a820', borderRadius: 10, margin: 20}}>

        <Image 
        style={{backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,}}
        width={200}
        height={200}
		alt={name}
        src={img}/>
        <h1 style={{textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: 500}}>{name}</h1>
    </div>
}
export default Avatar;