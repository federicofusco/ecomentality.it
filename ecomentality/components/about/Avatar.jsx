import Image from 'next/image';
 const Avatar = ({name , img}) => {
    return <div className="h-60 w-[200px] rounded-lg m-5 bg-nav-color">

        <Image 
			className="bg-white rounded-t-lg"
			width={200}
			height={200}
			alt={name}
			src={img}/>
        <h1 className="text-white text-center font-medium text-md">{name}</h1>
    </div>
}
export default Avatar;