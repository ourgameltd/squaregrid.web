import { useForm, SubmitHandler } from 'react-hook-form';

interface GameFormProps {
    defaultValues: Game,
    onSubmit: SubmitHandler<Game>;
}

const GameForm = ({ defaultValues, onSubmit }: GameFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Game>({
        defaultValues: defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="partitionKey" {...register('partitionKey', { required: true })} />
            <input type="hidden" id="rowKey" {...register('rowKey', { required: true })} />
            <input type="hidden" id="eTag" {...register('eTag', { required: true })} />
            <div className="form-group">
                <label htmlFor="title" className="text-black">Title</label>
                <input type="text" className="form-control" id="title" {...register('title', { required: true })} />
                {errors.title && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="image" className="text-black">Image</label>
                <input type="text" className="form-control" id="image" {...register('image', { required: true })} />
                {errors.image && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description" className="text-black">Description</label>
                <textarea className="form-control" id="description" {...register('description', { required: true })}></textarea>
                {errors.description && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="published" className="text-black">Published</label>
                <input type="checkbox" id="published" {...register('published')} readOnly={true} />
            </div>
            <div className="form-group">
                <label htmlFor="blocks" className="text-black">Blocks</label>
                <input type="number" className="form-control" id="blocks" {...register('blocks', { required: true, min: 0, max: 100 })} />
                {errors.blocks && <span className="text-danger">This field is required and must be non-negative</span>}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="blocksClaimed" className="text-black">Blocks Claimed</label>
                        <input type="number" className="form-control" id="blocksClaimed" {...register('blocksClaimed', { required: true, min: 0 })} readOnly={true} />
                        {errors.blocksClaimed && <span className="text-danger">This field is required and must be non-negative</span>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="blocksRemaining" className="text-black">Blocks Remaining</label>
                        <input type="number" className="form-control" id="blocksRemaining" {...register('blocksRemaining', { required: true, min: 0 })} readOnly={true} />
                        {errors.blocksRemaining && <span className="text-danger">This field is required and must be non-negative</span>}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="isCompleted" className="text-black">Is Completed</label>
                <input type="checkbox" id="isCompleted" {...register('isCompleted')} readOnly={true} />
            </div>
            <div className="form-group">
                <label htmlFor="isWon" className="text-black">Is Won</label>
                <input type="checkbox" id="isWon" {...register('isWon')} readOnly={true} />
            </div>
            <div className="form-group">
                <label htmlFor="timestamp" className="text-black">Timestamp</label>
                <input type="text" className="form-control" id="timestamp" {...register('timestamp', { required: true })} readOnly={true} />
                {errors.timestamp && <span className="text-danger">This field is required</span>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default GameForm;
