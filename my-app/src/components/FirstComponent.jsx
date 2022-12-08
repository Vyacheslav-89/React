import  Children from './Children';


const FirstComponent =() =>{

    let myWidth="50px";

    return(
    <div className="first">

        <h1>Первый текст</h1>
        <p>
            Текст 2
        </p>
        <Children text="Текст который хранится в пропсах" width={myWidth}/>
    </div>
    );
}

export default FirstComponent