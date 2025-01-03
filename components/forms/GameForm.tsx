import Image from "next/image";
import { useEffect, useState } from "react";
import { GameComponentProps } from "@/cards/[cardId]";
import Link from "next/link";
import QRCode from "qrcode";

const GameForm = ({ game: game, register, errors, imgSrc, setImgSrc }: GameComponentProps) => {
  const [shareableLinkPrefix, setShareableLinkPrefix] = useState(`${process.env.NEXT_PUBLIC_DOMAIN}/play/`);
  const [shareableLink, setShareableLink] = useState("");

  const [qrLink, setQrLink] = useState("");
  const [linkGroup, setLinkGroup] = useState(game.groupName);
  const [linkName, setLinkName] = useState(game.shortName);
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = (e: any) => {
    e.preventDefault();

    navigator.clipboard.writeText(shareableLink).then(
      () => {
        setCopySuccess(true);
      },
      (err) => {
        setCopySuccess(false);
      }
    );
  };

  useEffect(() => {
    let link = "";
    if (linkGroup && linkName) {
      link = `${shareableLinkPrefix}${linkGroup}/${linkName}`;
    }
    setShareableLink(link);
  }, [linkGroup, linkName]);

  useEffect(() => {
    if (shareableLink) {
      QRCode.toDataURL(shareableLink)
        .then((dataUrl) => {
          setQrLink(dataUrl);
        })
        .catch((err) => {
          console.error("Error generating QR code", err);
        });
    } else {
      setQrLink("");
    }
  }, [shareableLink]);

  const handleGroupNameKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLinkGroup(event.currentTarget.value);
  };

  const handleShortNameKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLinkName(event.currentTarget.value);
  };


  const handleImageClick = () => {
    const img = document.getElementById("imageUpload") as any;
    img.click();
  };

  useEffect(() => {
    const inputImg = document.getElementById("imageUpload");
    const img = document.getElementById("img") as any;
    const imgIcon = document.getElementById("imgIcon") as any;

    function getImg(event: any) {
      const file = event.target.files[0];
      let url = window.URL.createObjectURL(file);
      img!.src = url;
    }

    inputImg?.addEventListener("change", getImg);
  }, []);

  return (
    <>
      {/* Friendly name */}
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="validationServerUsername">
            Your organisation <p className="small text-muted font-italic mb-0">A name of your group, team or organisation.</p>
          </label>
          <div className="input-group">
            <input
              disabled={game.isWon}
              type="text"
              placeholder="e.g. My football team"
              className="form-control"
              id="groupName"
              onKeyUp={handleGroupNameKeyUp}
              {...register("groupName", { pattern: /^[A-Za-z0-9-]+$/ })}
            />
          </div>
          <div className="input-group">
            {((errors.groupName && errors.groupName.type === "pattern")) && (
              <p>
                <span className="text-danger">Only letters, numbers, and hyphens are allowed</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="validationServerUsername">
            Card name <p className="small text-muted font-italic mb-0">A name for the card.</p>
          </label>
          <div className="input-group">
            <input
              disabled={game.isWon}
              type="text"
              placeholder="e.g. Charity game 2014"
              className="form-control"
              id="shortName"
              onKeyUp={handleShortNameKeyUp}
              {...register("shortName", { pattern: /^[A-Za-z0-9-]+$/ })}
            />
          </div>
          <div className="input-group">
            {((errors.groupName && errors.groupName.type === "pattern")) && (
              <p>
                <span className="text-danger">Only letters, numbers, and hyphens are allowed</span>
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Title */}
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="title" className="text-black">
            Title* <p className="small text-muted font-italic mb-0">A title for the card.</p>
          </label>
          <input disabled={game.isWon} type="text" className="form-control shadow-sm" id="title" {...register("title", { required: true })} />
          {errors.title && <span className="text-danger">This field is required</span>}
        </div>
      </div>
      {/* Description, image and QR */}
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="description" className="text-black">
            Description* <p className="small text-muted font-italic mb-0">The purpose of the card and details for the players.</p>
          </label>
          <textarea disabled={game.isWon} className="form-control shadow-sm" id="description" {...register("description", { required: true })} rows={10}></textarea>
          {errors.description && <span className="text-danger">This field is required</span>}
        </div>
        <input
          disabled={game.isWon}
          className="form-control shadow"
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          {...register("imageUpload", { required: false })}
          accept="image/*"
        ></input>
      </div>
      <div className="col-md-3">
        <div className="form-group">
          <label htmlFor="description" className="text-black">
            Image <p className="small text-muted font-italic mb-0">An optional image.</p>
          </label>
          <div className="image-preview-wrapper shadow-sm">
            <Image
              id="img"
              src={imgSrc?.startsWith("blob:") ? imgSrc : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${imgSrc}`}
              alt={"Image for game " + game?.title}
              unoptimized={true}
              fill={true}
              style={{
                objectFit: "cover",
                cursor: game.isWon ? "default" : "pointer"
              }}
              priority={true}
              onClick={handleImageClick}
              onError={() => setImgSrc(`images/games/placeholder.webp`)}
            />
            <i
              onClick={handleImageClick}
              className="bi bi-cloud-upload position-absolute "
              style={{
                bottom: "10px",
                right: "20px",
                fontSize: "1.5rem",
                cursor: game.isWon ? "default" : "pointer",
              }}
            ></i>
          </div>
        </div>
      </div>
      {qrLink && (
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="validationServerUsername">
              QR code <p className="small text-muted font-italic mb-0">Share on devices e.g. screens, leaflets.</p>
            </label>
            <div>
              <img className="shadow img-fluid" src={qrLink} alt="QR Code" />
            </div>
          </div>
        </div>)}
      {/* Share link */}
      {qrLink && (
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="validationServerUsername">
              Link <p className="small text-muted font-italic mb-0">For sharing via social channels or email.</p>
            </label>
            <div>
              <p>
                <Link target="_blank" href={shareableLink}>
                  {shareableLink}
                </Link> <button disabled={game.isWon} role="button" className="btn-smallest" onClick={(e) => copyToClipboard(e)}><i className="bi bi-copy"></i> </button> {copySuccess && <span>Copied to clipboard <i className="bi bi-check-circle-fill"></i></span>}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameForm;
