import React, {useState} from 'react';

function Button(props) {
    console.log(props);
    return (
        <div>
            <button onClick={(event)=>props.submit(event)}>Submit</button>
            <p>{props.userName}</p>
        </div>
    );
}

export default Button;