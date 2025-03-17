import { createContext } from 'react';

const MarkdownContext = createContext([null, () => { }, false, () => { }] as [string | null, React.Dispatch<React.SetStateAction<string | null>>, boolean, React.Dispatch<React.SetStateAction<boolean>>]);

export default MarkdownContext;
