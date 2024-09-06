import { useRef, useState, useEffect } from "react";
import { Block } from "@/Block";
import { v4 as uuidv4 } from "uuid";
import { GameComponentProps } from "@/cards/[cardId]";
import EditBlockModal from "./modals/EditBlockForm";
import BlockListLayout from "./views/BlockListLayout";
import BlockGridLayout from "./views/BlockGridLayout";

const GameBlocks = ({ game, register, setError, clearError, errors, blocks, setBlocks, watch }: GameComponentProps) => {
  const [isEditing, setIsEditing] = useState<Block | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const gridLayout = watch('gridLayout');

  useEffect(() => {
    console.log("Grid layout changed to:", gridLayout);
  }, [gridLayout]);

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

  useEffect(() => {
    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && inputRef.current && inputRef.current === document.activeElement) {
        event.preventDefault();
        submitButtonRef.current?.click();  // Programmatically trigger the submit button
      }
    };

    document.addEventListener("keydown", handleEnterPress);

    return () => {
      document.removeEventListener("keydown", handleEnterPress); // Clean up the event listener
    };
  }, []);

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

  const renderLayout = () => {
    switch (gridLayout) {
      case 'list':
        return <BlockListLayout game={game} blocks={blocks} openEditModal={openEditModal} removeBlock={removeBlock} sidebar={false}></BlockListLayout>;
      case 'listSidebar':
        return <BlockListLayout game={game} blocks={blocks} openEditModal={openEditModal} removeBlock={removeBlock} sidebar={true}></BlockListLayout>;
      case 'gridSidebar':
        return <BlockGridLayout game={game} blocks={blocks} openEditModal={openEditModal} removeBlock={removeBlock} sidebar={true}></BlockGridLayout>;
      default:
        return <BlockGridLayout game={game} blocks={blocks} openEditModal={openEditModal} removeBlock={removeBlock} sidebar={false}></BlockGridLayout>;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group game-layout pb-0 mb-0">
            <label htmlFor="options" className="text-black">
              Layout* <span className="small text-muted font-italic">(How it looks when played)</span>
            </label>
            <div className="d-flex justify-content-around input-group">
              <div className="custom-control custom-radio">
                <input disabled={game.isWon} type="radio" id="gridLayout" value={"grid"} className="custom-control-input" {...register("gridLayout", { required: true })} />
                <label className="custom-control-label" htmlFor="gridLayout">
                  <img src="/images/layout_grid_only.png" />
                  <span className="small text-muted font-italic">Grid</span>
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input disabled={game.isWon} type="radio" id="gridInfoLayout" value={"gridSidebar"} className="custom-control-input" {...register("gridLayout", { required: true })} />
                <label className="custom-control-label" htmlFor="gridInfoLayout">
                  <img src="/images/layout_outline_with_sidebar.png" />
                  <span className="small text-muted font-italic">Grid & Sidebar</span>
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input disabled={game.isWon} type="radio" id="listLayout" value={"list"} className="custom-control-input" {...register("gridLayout", { required: true })} />
                <label className="custom-control-label" htmlFor="listLayout">
                  <img src="/images/layout_padded_list_no_sidebar.png" />
                  <span className="small text-muted font-italic">List</span>
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input disabled={game.isWon} type="radio" id="listInfoLayout" value={"listSidebar"} className="custom-control-input" {...register("gridLayout", { required: true })} />
                <label className="custom-control-label" htmlFor="listInfoLayout">
                  <img src="/images/layout_with_padded_list.png" />
                  <span className="small text-muted font-italic">List & Sidebar</span>
                </label>
              </div>
            </div>
            {errors.gridLayout && (
              <p>
                <span className="text-danger">{errors.gridLayout.message}</span>
              </p>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            {renderLayout()}
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="options" className="text-black">
              Options* <span className="small text-muted font-italic">Add one or add many by seperating with a comma.</span>
            </label>
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
                <button disabled={game.isWon} className="btn btn-success" onClick={(e) => onSubmit(e)} type="submit"
                  ref={submitButtonRef}>
                  Add <i className="bi bi-plus-circle"></i>
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
      </div>
      {isEditing && <EditBlockModal block={isEditing} show={true} onClose={handleModalClose} onSave={handleSaveChanges} />}
    </>
  );
};

export default GameBlocks;
