import { useState, useRef, useEffect } from "react";

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);
    


    function startTimer(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
           
    }

    function stopTimer(){
        setIsRunning(false);
    }

    function resetTimer(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");


        return `${minutes}:${seconds}:${milliseconds}`;
    }



    return(<div>
        <h1> StopWatch</h1>
        <p> { formatTime() }</p>
        <div className="btn-wrapper">
            <button onClick={startTimer} className="btn-start">Start</button>
            <button onClick={stopTimer} className="btn-stop">Stop</button>
            <button onClick={resetTimer} className="btn-reset">Reset</button>
        </div>
    </div>);
}

export default StopWatch;