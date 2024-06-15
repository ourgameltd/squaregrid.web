import { useForm, SubmitHandler } from 'react-hook-form';

interface GameFormProps {
    game: Game,
    onSubmit: SubmitHandler<Game>;
}

const GameForm = ({ game: game, onSubmit }: GameFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Game>({
        defaultValues: game,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="partitionKey" {...register('partitionKey', { required: true })} />
            <input type="hidden" id="rowKey" {...register('rowKey', { required: true })} />
            <input type="hidden" id="eTag" {...register('eTag', { required: true })} />

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="title" className="text-black">Title* <span className="text-muted">(Title of the card)</span></label>
                        <input type="text" className="form-control" id="title" {...register('title', { required: true })} />
                        {errors.title && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="blocksClaimed" className="text-black">Squares* <span className="text-muted">(Pick between 12-36 squares)</span>
                            <span className="badge rounded-pill bg-primary ml-2">{game.blocksClaimed}/{game.blocks}</span>
                        </label>
                        <input type="number" className="form-control" id="blocks" {...register('blocks', { required: true, min: 12, max: 36 })} />
                        {errors.blocks && <span className="text-danger">This field must be between 12 and 36</span>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="description" className="text-black">Description* <span className="text-muted">(Description of the card and its purpose.)</span></label>
                        <textarea className="form-control" id="description" {...register('description', { required: true })} rows={9}></textarea>
                        {errors.description && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="image" className="form-label">Image <span className="text-muted">(Optional image for the card.)</span></label>
                        <input type="hidden" id="image" {...register('image', { required: false })} />
                        {game.image && <img style={{ maxHeight: 250, display: "block" }} src={game.image} className="img-fluid img-thumbnail" alt={`Game ${game.title} image.`} />}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="description" className="text-black">Square Options* <span className="text-muted">(Comma seperarted list of options.)</span></label>
                <textarea className="form-control" id="description" {...register('options', { required: true })} rows={5}></textarea>
                {errors.options && <span className="text-danger">This field is required</span>}
            </div>
            <button type="submit" className="btn btn-success btn-smaller ml-2 float-end" disabled={true}>
                Publish <i className="bi bi-globe"></i>
            </button>
            <button type="submit" className="btn btn-primary btn-smaller ml-2 float-end">Save</button>
        </form>
    );
};

export default GameForm;
