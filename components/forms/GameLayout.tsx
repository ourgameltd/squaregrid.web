import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface GameLayoutProps {
    game: Game
}

const GameLayout = ({ game }: GameLayoutProps) => {
    const blocks = Array.from({ length: game.blocks }, (_, i) => i);
    const options: string[] = game.options.split(",");

    const [editingBlock, setEditingBlock] = useState<number>(-1);

    const editing = (block: number, e: any) => {
        setEditingBlock(block);
    };
    const doneEditing = (e: any) => {
        e.stopPropagation();
        setEditingBlock(-1);
    };

    return (
        <div className="container game-card-list">
            <div className="row">
                {blocks.map((block) => (
                    <div key={block} className="col-lg-2 col-md-3 col-sm-4 col-6 text-center card-list">
                        <div className="card" style={{ minHeight: 150 }}>
                            <div className="card-header fw-bold text-start text-truncate">{block + 1}. {options[block]}</div>
                            <div className="card-body d-flex justify-content-center align-items-center" onClick={(e) => editing(block, e)}>
                                {editingBlock != block && 
                                    <><h5 className="card-title text-truncate"></h5><i className="bi bi-pencil"></i></>}
                                {editingBlock == block && 
                                    <div className="input-group input-group-sm">
                                        <input type="text" className="form-control" aria-label="Enter a name." placeholder="Enter a name." aria-describedby="inputGroup-sizing-sm" />
                                        <button className="btn btn-success" type="submit" onClick={(e) => doneEditing(e)}><i className="bi bi-save"></i></button>
                                    </div>} 
                            </div>
                            <div className="card-footer text-muted">
                                <button type="submit" className="btn btn-danger btn-smallest float-end ml-1" disabled={true}>Clear</button>
                                <button type="submit" className="btn btn-primary btn-smallest float-end" disabled={true}>Confirm</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameLayout;
