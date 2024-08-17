import Image from 'next/image';
import { useState } from 'react';
import { GameComponentProps } from '@/cards/[cardId]';

const GameForm = ({ game: game, register, errors }: GameComponentProps) => {
    const [imgSrc, setImgSrc] = useState(game.image);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImgSrc(previewUrl);
        }
    };

    return (
        <>
            <input type="hidden" id="partitionKey" {...register('partitionKey', { required: true })} />
            <input type="hidden" id="rowKey" {...register('rowKey', { required: true })} />
            <input type="hidden" id="eTag" {...register('eTag', { required: true })} />

            <div className="form-group">
                <label htmlFor="title" className="text-black">Title* <span className="text-muted">(Title of the card)</span></label>
                <input disabled={game.isWon} type="text" className="form-control" id="title" {...register('title', { required: true })} />
                {errors.title && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description" className="text-black">Description* <span className="text-muted">(Description of the card and its purpose.)</span></label>
                <textarea disabled={game.isWon} className="form-control" id="description" {...register('description', { required: true })} rows={9}></textarea>
                {errors.description && <span className="text-danger">This field is required</span>}
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group">
                        <label htmlFor="imageUpload" className="form-label">Image <span className="text-muted">(Optional image for the card.)</span></label>
                        <input
                            disabled={game.isWon}
                            className="form-control"
                            type="file"
                            id="imageUpload"
                            {...register('imageUpload', { required: false })}
                            onChange={handleImageChange}
                            accept="image/*"></input>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="image-preview-wrapper">
                        <Image
                            src={imgSrc?.startsWith('blob:') ? imgSrc : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${imgSrc}`}
                            alt={"Image for game " + game?.title}
                            unoptimized={true}
                            layout="fill"
                            objectFit="contain"
                            onError={() => setImgSrc(`images/games/placeholder.webp`)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameForm;
