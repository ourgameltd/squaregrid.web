import { useRef, useState } from 'react';
import { Block } from '@/Block';
import { v4 as uuidv4 } from 'uuid';
import { GameComponentProps } from '@/cards/[cardId]';

const GameBlocks = ({ game, setError, clearError, errors }: GameComponentProps) => {
    const [blocks, setBlocks] = useState<Block[]>(game?.blocks ?? []);
    const [blockCount, setBlockCount] = useState<number>(game?.blockCount ?? 0);
    const [claimedBlockCount, setClaimedBlockCount] = useState<number>(game?.claimedBlockCount ?? 0);
    const [percentageClaimed, setPercentageClaimed] = useState<number>(game?.percentageClaimed ?? 0);

    const inputRef = useRef<HTMLInputElement>(null);

    const addBlock = (newBlock: Block) => {
        setBlocks((prevBlocks) => {
            const updatedBlocks = [...prevBlocks, newBlock];
            return updatedBlocks.sort((a, b) => a.index - b.index); // Sort blocks by index
        });
    };

    const updateBlock = (updatedBlock: Block) => {
        setBlocks((prevBlocks) =>
            prevBlocks
                .map((block) =>
                    block.partitionKey === updatedBlock.partitionKey && block.rowKey === updatedBlock.rowKey
                        ? updatedBlock
                        : block
                )
                .sort((a, b) => a.index - b.index)
        );
    };

    const removeBlock = (partitionKey: string, rowKey: string) => {
        setBlocks((prevBlocks) =>
            prevBlocks.filter((block) => !(block.partitionKey === partitionKey && block.rowKey === rowKey))
        );
    }

    const getNextAvailableIndex = () => {
        const usedIndices = blocks.map(block => block.index);
        let nextIndex = 1;
        while (usedIndices.includes(nextIndex)) {
            nextIndex++;
        }
        return nextIndex;
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const inputValue = inputRef.current?.value;

        if (!inputValue) {
            setError('blockInput', {
                type: "manual",
                message: "This field is required",
              });
            return;
        } else {
            clearError(['blockInput']);
        }
        
        addBlock({
            partitionKey: uuidv4(),
            rowKey: uuidv4(),
            title: inputValue ?? "",
            index: getNextAvailableIndex(),
            isClaimed: false,
            isConfirmed: false,
            isWinner: false
        } as Block);

        inputRef!.current!.value = '';
    };

    return (
        <>
            <div className="form-group">
                <label htmlFor="options" className="text-black">Options* <span className="text-muted">(Blocks for the card)</span></label>
                <div className="input-group">
                    <input
                        disabled={game.isWon}
                        type="text"
                        id="blockInput"
                        className="form-control"
                        placeholder="Add a value for the block"
                        aria-label="Add Block"
                        aria-describedby="Add Block"
                        ref={inputRef} />
                    <button 
                        disabled={game.isWon} 
                        className="btn btn-success btn-smaller" 
                        onClick={(e) => onSubmit(e)}
                        type="submit">
                            Add <i className="bi bi-plus-circle"></i>
                    </button>
                </div>
                {errors.blockInput && <span className="text-danger">This field is required</span>}
            </div>
            <div className="progress">
                <div className={"progress-bar bg-" + (game.isWon ? "warning" : game.isClaimed ? "success" : "primary")} role="progressbar" style={{ width: `${percentageClaimed}%` }} aria-valuenow={claimedBlockCount} aria-valuemin={0} aria-valuemax={blockCount}></div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Taken by</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {blocks.map((block) => (
                            <tr className={block.isWinner ? "table-warning" : ""} key={`${block.partitionKey}-${block.rowKey}`}>
                                <th scope="row">{block.index}</th>
                                <td>{block.title}</td>
                                <td title={block.isWinner ? `Game was won by ${block.claimedByFriendlyName}` : ""}>{block?.claimedByFriendlyName ?? "-"}</td>
                                <td></td>
                                <td width={"25%"}>
                                    {!game.isWon && <button className='btn-sm btn-warning ml-1' role="button">
                                        {block?.isConfirmed && <i className="bi bi-exclamation-triangle-fill" title="Mark this square as no longer complete."></i>}
                                        {!block?.isConfirmed && <i className="bi bi-check-circle" title="Confirm this square as complete."></i>}
                                    </button>}
                                    {!game.isWon && <button disabled={game.isWon} title="Clear this square from being claimed." className='btn-sm btn-danger ml-1' role="button" onClick={() => removeBlock(block.partitionKey, block.rowKey)}>
                                        <i className="bi bi-eraser-fill"></i>
                                    </button>}
                                    {!game.isWon && <button disabled={game.isWon} title="Delete this square altogether." className='btn-sm btn-info ml-1' role="button" onClick={() => removeBlock(block.partitionKey, block.rowKey)}>
                                        <i className="bi bi-trash"></i>
                                    </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default GameBlocks;
