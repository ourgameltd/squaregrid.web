import { useForm, SubmitHandler } from 'react-hook-form';

interface GameLayoutProps {
    blockCount: number
}

const GameLayout = ({ blockCount }: GameLayoutProps) => {
    const blocks = Array.from({ length: blockCount }, (_, i) => i);

    return (
        <ul className="list-inline">
            {blocks.map((block) => (
                <li key={block} className="list-inline-item">
                    <div className="square bg-primary"></div>
                </li>
            ))}
        </ul>
    );
};

export default GameLayout;
