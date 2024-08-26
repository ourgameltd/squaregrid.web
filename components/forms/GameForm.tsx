import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GameComponentProps } from '@/cards/[cardId]';
import Link from 'next/link';

const GameForm = ({ game: game, register, errors, imgSrc, setImgSrc }: GameComponentProps) => {
    const [shareableLink, setShareableLink] = useState('');

    useEffect(() => {
        const inputImg = document.getElementById('imageUpload')
        const img = document.getElementById('img') as any;

        function getImg(event: any) {
            const file = event.target.files[0];
            let url = window.URL.createObjectURL(file);
            img!.src = url
       }

       inputImg?.addEventListener('change', getImg);
    }, []);

    useEffect(() => {
        let link = '';
        if (game.groupName && game.shortName) {
            link = `${process.env.NEXT_PUBLIC_DOMAIN}/play/${game.groupName}/${game.shortName}`;
        }
        setShareableLink(link);
    }, [game.groupName, game.shortName]);

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
                            accept="image/*"></input>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="image-preview-wrapper">
                        <Image
                            id="img"
                            src={imgSrc?.startsWith('blob:') ? imgSrc : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${imgSrc}`}
                            alt={"Image for game " + game?.title}
                            unoptimized={true}
                            fill={true}
                            style={{ objectFit: "cover" }}
                            priority={true}
                            onError={() => setImgSrc(`images/games/placeholder.webp`)}
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="displayAsGrid"
                                disabled={game.isWon}
                                defaultChecked={game.displayAsGrid}
                                {...register('displayAsGrid', { pattern: /^[A-Za-z0-9-]+$/ })} />
                            <label className="form-check-label" htmlFor="displayAsGrid">Display options as a grid</label>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="confirmedWinnersOnly"
                                disabled={game.isWon}
                                defaultChecked={game.confirmedWinnersOnly}
                                {...register('confirmedWinnersOnly', { pattern: /^[A-Za-z0-9-]+$/ })} />
                            <label className="form-check-label" htmlFor="confirmedWinnersOnly">Only confirmed can win</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="groupName" className="text-black">Group* <span className="text-muted">(Group name for url)</span></label>
                        <input disabled={game.isWon} type="text" className="form-control" id="groupName" {...register('groupName', { pattern: /^[A-Za-z0-9-]+$/ })} />
                        {errors.groupName && errors.groupName.type === 'pattern' && (
                            <span className="text-danger">Only letters, numbers, and hyphens are allowed</span>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="shortName" className="text-black">Short name* <span className="text-muted">(Short name for url)</span></label>
                        <input disabled={game.isWon} type="text" className="form-control" id="shortName" {...register('shortName', { pattern: /^[A-Za-z0-9-]+$/ })} />
                        {errors.shortName && errors.shortName.type === 'pattern' && (
                            <span className="text-danger">Only letters, numbers, and hyphens are allowed</span>
                        )}
                    </div>
                </div>
            </div>
            {shareableLink &&
                <div className="row">
                    <div className="form-group">
                        <div className="col-md-12 text-center">
                            <label className="text-black"><span className="text-muted">(Link to share)</span></label>
                            <p><Link target='_blank' href={shareableLink}>{shareableLink}</Link></p>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default GameForm;
