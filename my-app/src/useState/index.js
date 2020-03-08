import React from "react"
import {useState} from "./useState"
import {withHook} from "./withHook"

export const HookApp = withHook(() => {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    return (
        <div>
            <p>
                {count} - {count2}
            </p>
            <button
                onClick={() => {
                    setCount(count + 1);
                    setCount2(count2 + 2);
                }}
            >
                +
            </button>
        </div>
    );
})