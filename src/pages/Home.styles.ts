import styled from "styled-components";

// export const Title = styled.h1`
//     font-weight: 700;
//     font-size: 40px;
//     line-height: 62px;
//     color: #171718;

//     max-width: 700px;
//     margin: 160px 0 80px;
    
//     @media only screen and (max-width: 400px) {
//         font-size: 32px;
//         line-height: 48px;
//         margin: 100px 0 80px;
//     }
// `;

// export const List = styled.div`
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     row-gap: 50px;
//     column-gap: 30px;

//     @media only screen and (max-width: 1000px) {
//         grid-template-columns: repeat(2, 1fr);
//     }

//     @media only screen and (max-width: 700px) {
//         grid-template-columns: repeat(1, 1fr);
//     }

// `;

export const Input = styled.input`
    width: 100%;
    font-size: 1.2rem;
    color: #17171b;
    padding: 0.5rem;
    margin-bottom: 80px;

    &::placeholder {
        color: red;
    }
`;