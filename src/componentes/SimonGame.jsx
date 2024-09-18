import {useState, useEffect} from "react";
import ButtonGame from "./ButtonGame";
import "./SimonGame.css";

const colors = ["verde", "rojo", "amarillo", "azul"];
export default function SimonGame(){
    //useStates
    const [playing, setPlaying] = useState(false); 
    const [secuence, setSecuence] = useState([]); 
    const [userSecuence, setUserSecuence] = useState([]); 
    const [userState, setUserState] = useState(null);
    const [activeColor, setActiveColor] = useState(true); 
    const [interval, setInterval] = useState(0);
    const [count, setCount] = useState(0); 

    //function
    const addNewColor = () => {
        const selectColor = colors[Math.floor(Math.random()*4)];
        const newSecuence = [...secuence, selectColor];
        setSecuence(newSecuence);
        setUserSecuence([]);
    }

    // Mostrar la secuencia
    const playSecuence = () => {
        secuence.forEach((color, index) => {
            setTimeout(() => {
                setActiveColor(color); //Activa el color seleccionado
            }, (index + 1) * interval);  
            setTimeout(() => {
                setActiveColor(null);  // Apagar el botón
            }, (index + 1) * interval + 400); 
        });
    }

    // Manejar el clic del botón del usuario
    const handleUserClick = (color) => {
        if (!playing || activeColor) return;  // Evitar interacción del usuario durante la secuencia del juego

        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 500);

        const newUserSecuence = [...userSecuence, color];
        setUserSecuence(newUserSecuence);

        // Verificar si el usuario ha cometido un error
        if (color !== secuence[newUserSecuence.length - 1]) {
            setPlaying(false);
            setSecuence([]); 
            setCount(0);
            setInterval(0);
            setUserState(false)
            console.log(userState);
            return;
        }

        // Verificar si el usuario completó la secuencia correctamente
        if (newUserSecuence.length === secuence.length) {
            setTimeout(() => addNewColor(), 500);  // Añadir un nuevo color después de un breve retraso
            setCount(count + 1);
        }
    };

    const handleDifficulty = (difficulty) => {
          switch(difficulty){
            case "facil": setInterval(1100);
                break;
            case "medio": setInterval(700);
                break;
            case "dificil": setInterval(500);
                break;
          }
    }

    const handlePlay = () => {
        if(!playing && interval>0){
            setPlaying(true);
            addNewColor();
        }
    }

    //useEffect
    useEffect(() => {
        if (secuence.length > 0) {
            playSecuence();
        }
    }, [secuence]);
    
    return (
        <>
            <main className="game">
            {playing === false ?   
                <>
                <p className="message"><b>Elige la dificultad</b></p>
                <div className="difficultyMenu">
                    <button onClick={() => handleDifficulty("facil")}>FÁCIL</button>
                    <button onClick={() => handleDifficulty("medio")}>MEDIO</button>
                    <button onClick={() => handleDifficulty("dificil")}>DIFICIL</button>
                </div>
                </>:
                <p className="message"><b>Copia la secuencia de colores</b></p>
            }

                <div className="container">
                    <ButtonGame 
                        color={`ButtonGame verde ${activeColor === "verde" ? "verdeActive" : ""}`} 
                        onClick={() => handleUserClick("verde")} 
                    />
                    <ButtonGame 
                        color={`ButtonGame rojo ${activeColor === "rojo" ? "rojoActive" : ""}`} 
                        onClick={() => handleUserClick("rojo")} 
                    />
                    <ButtonGame 
                        color={`ButtonGame amarillo ${activeColor === "amarillo" ? "amarilloActive" : ""}`} 
                        onClick={() => handleUserClick("amarillo")} 
                    />
                    <ButtonGame 
                        color={`ButtonGame azul ${activeColor === "azul" ? "azulActive" : ""}`} 
                        onClick={() => handleUserClick("azul")} 
                    />

                    {playing === false && userState == null?
                        <button className="buttonPlay" onClick={handlePlay}>Jugar</button> : 
                        userState == false && playing == false? 
                        <button className="buttonPlay" onClick={handlePlay}>Reiniciar</button>: 
                        <label className="count">{count}</label>
                    }
                </div>
            </main>
        </>
    );
}
