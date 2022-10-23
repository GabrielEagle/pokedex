// import { ReactNode } from 'react';
import { Text } from "./Title.style"

type TitleProps = {
    // text: ReactNode;
    text: string;
    // children: ReactNode;
};

function Title(props: TitleProps) {
    return (
     <Text>{props.text}</Text>)
}

export default Title;