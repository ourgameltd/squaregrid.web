import { useRef, useState, useEffect } from 'react';
import { Block } from '@/Block';
import { v4 as uuidv4 } from 'uuid';
import { GameComponentProps } from '@/cards/[cardId]';
import EditBlockModal from './EditBlockForm';

const GameBlocks = ({ game, setError, clearError, errors, blocks, setBlocks }: GameComponentProps) => {
    const [blockCount, setBlockCount] = useState<number>(0);
    const [claimedBlockCount, setClaimedBlockCount] = useState<number>(0);
    const [percentageClaimed, setPercentageClaimed] = useState<number>(0);
    const [isEditing, setIsEditing] = useState<Block | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setBlockCount(blocks?.length);

        const claimedCount = blocks?.filter(block => block.isClaimed)?.length;
        setClaimedBlockCount(claimedCount);

        const percentage = blocks?.length > 0 ? (claimedCount / blocks?.length) * 100 : 0;
        setPercentageClaimed(percentage);
    }, [blocks, setBlocks]);

    const addBlock = (newBlock: Block) => {
        setBlocks((prevBlocks) => {
            const updatedBlocks = [...prevBlocks, newBlock];
            return updatedBlocks.sort((a, b) => a.index - b.index);
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

    const removeBlock = (partitionKey: string, rowKey: string, event: React.FormEvent) => {
        event.preventDefault();
        setBlocks((prevBlocks) =>
            prevBlocks.filter((block) => !(block.partitionKey === partitionKey && block.rowKey === rowKey))
        );
    };

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
            partitionKey: game.rowKey,
            rowKey: uuidv4(),
            title: inputValue ?? "",
            index: getNextAvailableIndex(),
            isClaimed: false,
            isConfirmed: false,
            isWinner: false
        } as Block);

        inputRef!.current!.value = '';
    };

    const openEditModal = (block: Block, event: React.FormEvent) => {
        event.preventDefault();
        setIsEditing(block);
    };

    const handleModalClose = () => {
        setIsEditing(null);
    };

    const handleSaveChanges = (updatedBlock: Block) => {
        updateBlock(updatedBlock);
        handleModalClose();
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
                {errors.blockInput && <span className="text-danger">{errors.blockInput.message}</span>}
            </div>
            <div className="progress mb-3">
                <div className={"progress-bar bg-" + (game.isWon ? "warning" : percentageClaimed == 100 ? "success" : "primary")} role="progressbar" style={{ width: `${percentageClaimed}%` }} aria-valuenow={claimedBlockCount} aria-valuemin={0} aria-valuemax={blockCount}></div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Taken by</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {blocks?.map((block) => (
                            <tr className={block.isWinner ? "table-warning" : ""} key={`${block.partitionKey}-${block.rowKey}`}>
                                <th scope="row">{block.index}</th>
                                <td>{block.title} {block.isConfirmed && <i className="bi bi-patch-check-fill text-primary"></i>}</td>
                                <td title={block.isWinner ? `Game was won by ${block.claimedByFriendlyName}` : ""}>{block?.claimedByFriendlyName}</td>
                                <td>
                                    {!game.isWon && 
                                    <button
                                        disabled={game.isWon}
                                        title="Delete this square altogether."
                                        className='btn-sm btn-danger ml-1 float-end'
                                        role="button"
                                        onClick={(e) => removeBlock(block.partitionKey, block.rowKey, e)}>
                                        <i className="bi bi-trash"></i>
                                    </button>}
                                    {!game.isWon &&
                                        <button
                                            className='btn-sm btn-primary ml-1 float-end'
                                            onClick={(e) => openEditModal(block, e)}
                                            role="button">
                                            <i className="bi bi-pencil"></i>
                                        </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <EditBlockModal
                    block={isEditing}
                    show={true}
                    onClose={handleModalClose}
                    onSave={handleSaveChanges}
                />
            )}
        </>
    );
};

export default GameBlocks;
