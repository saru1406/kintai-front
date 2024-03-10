import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Show = () => {
    let { id } = useParams();
    console.log(id);

    return(
        <>
            <div>test</div>
        </>
    )
}

export default Show
