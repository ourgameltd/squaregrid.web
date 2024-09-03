import { useRef, useState, useEffect } from "react";
import { Block } from "@/Block";
import { v4 as uuidv4 } from "uuid";
import { GameComponentProps } from "@/cards/[cardId]";
import EditBlockModal from "./EditBlockForm";

const GameBlocks = ({ game, setError, clearError, errors, blocks, setBlocks }: GameComponentProps) => {
  const [isEditing, setIsEditing] = useState<Block | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const addBlock = (newBlock: Block) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks, newBlock];
      return updatedBlocks.sort((a, b) => a.index - b.index);
    });
  };

  const updateBlock = (updatedBlock: Block) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.partitionKey === updatedBlock.partitionKey && block.rowKey === updatedBlock.rowKey ? updatedBlock : block)).sort((a, b) => a.index - b.index)
    );
  };

  const removeBlock = (partitionKey: string, rowKey: string, event: React.FormEvent) => {
    event.preventDefault();
    setBlocks((prevBlocks) => prevBlocks.filter((block) => !(block.partitionKey === partitionKey && block.rowKey === rowKey)));
  };

  const getNextAvailableIndex = (currentBlocks: Block[]) => {
    const usedIndices = currentBlocks.map((block) => block.index);
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
      setError("blockInput", {
        type: "manual",
        message: "This field is required",
      });
      return;
    } else {
      clearError(["blockInput"]);
    }

    const currentBlocks = [...blocks];
    const newBlocks = inputValue
      .split(",")
      .filter((i) => i)
      .map((i) => {
        const nextIndex = getNextAvailableIndex(currentBlocks);
        const newBlock: Block = {
          partitionKey: game.rowKey,
          rowKey: uuidv4(),
          title: i.trim() ?? "",
          index: nextIndex,
          isClaimed: false,
          isConfirmed: false,
          isWinner: false,
        } as Block;
        currentBlocks.push(newBlock); // Add the new block to the temporary list to track used indices
        return newBlock;
      });

    newBlocks.forEach((block) => addBlock(block));

    inputRef!.current!.value = "";
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
      <div className="row">
        <div className="col-md-12">
          <div className="form-group game-layout">
            <label htmlFor="options" className="text-black">
              Layout* <span className="small text-muted font-italic">(How it looks when played)</span>
            </label>
            <div className="d-flex justify-content-between input-group">
              <div className="custom-control custom-radio mr-1">
                <input disabled={game.isWon} type="radio" id="gridLayout" name="layoutOptions" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="gridLayout">
                  <img src="/images/layout_grid_only.png" />
                  <span className="small text-muted font-italic">Grid & Popover</span>
                </label>
              </div>
              <div className="custom-control custom-radio mr-1">
                <input disabled={game.isWon} type="radio" id="gridInfoLayout" name="layoutOptions" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="gridInfoLayout">
                  <img src="/images/layout_outline_with_sidebar.png" />
                  <span className="small text-muted font-italic">Grid & Sidebar</span>
                </label>
              </div>
              <div className="custom-control custom-radio mr-1">
                <input disabled={game.isWon} type="radio" id="listLayout" name="layoutOptions" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="listLayout">
                  <img src="/images/layout_padded_list_no_sidebar.png" />
                  <span className="small text-muted font-italic">List & Popover</span>
                </label>
              </div>
              <div className="custom-control custom-radio mr-1">
                <input disabled={game.isWon} type="radio" id="listInfoLayout" name="layoutOptions" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="listInfoLayout">
                  <img src="/images/layout_with_padded_list.png" />
                  <span className="small text-muted font-italic">List & Sidebar</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="options" className="text-black">
              Options* <span className="small text-muted font-italic">You can also add a comma separated list here to add in bulk</span>
            </label>
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
                      <td>
                        <span className="text-truncate">{block.title}</span>
                      </td>
                      <td title={block.isWinner ? `Game was won by ${block.claimedByFriendlyName}` : ""}>
                        {block?.claimedByFriendlyName}
                        {block.isConfirmed && <i className="bi bi-patch-check-fill text-primary float-end"></i>}
                      </td>
                      <td>
                        {!game.isWon && (
                          <button
                            disabled={game.isWon}
                            title="Delete this square altogether."
                            className="btn btn-smaller btn-danger ml-1 float-end"
                            role="button"
                            onClick={(e) => removeBlock(block.partitionKey, block.rowKey, e)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                        {!game.isWon && (
                          <button className="btn btn-smaller btn-primary ml-1 float-end" onClick={(e) => openEditModal(block, e)} role="button">
                            <i className="bi bi-pencil"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="input-group">
              <input
                disabled={game.isWon}
                type="text"
                id="blockInput"
                className="form-control"
                placeholder="e.g. United or City, Rovers, County"
                aria-label="Add Block"
                aria-describedby="Add Block"
                ref={inputRef}
              />
              <div className="input-group-append">
                <button disabled={game.isWon} className="btn btn-success" onClick={(e) => onSubmit(e)} type="submit">
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </div>
            <span className="small text-muted font-italic"></span>
            {errors.blockInput && (
              <p>
                <span className="text-danger">{errors.blockInput.message}</span>
              </p>
            )}
          </div>
        </div>
        <div className="col-md-6"></div>
      </div>
      {isEditing && <EditBlockModal block={isEditing} show={true} onClose={handleModalClose} onSave={handleSaveChanges} />}
    </>
  );
};

export default GameBlocks;
