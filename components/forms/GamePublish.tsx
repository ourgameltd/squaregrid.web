import { useEffect, useState } from "react";
import { GameComponentProps } from "@/cards/[cardId]";
import Link from "next/link";
import QRCode from "qrcode";

const GamePublish = ({ game: game, register, errors }: GameComponentProps) => {
  const [shareableLinkPrefix, setShareableLinkPrefix] = useState(`${process.env.NEXT_PUBLIC_DOMAIN}/play/`);
  const [shareableLink, setShareableLink] = useState("");
  const [qrLink, setQrLink] = useState("");
  const [linkGroup, setLinkGroup] = useState(game.groupName);
  const [linkName, setLinkName] = useState(game.shortName);
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    // Copy the link to the clipboard
    navigator.clipboard.writeText(shareableLink).then(
      () => {
        // On success, update the UI to show success message
        setCopySuccess(true);
      },
      (err) => {
        // Handle any errors that may occur
        setCopySuccess(false);
        console.error("Failed to copy: ", err);
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

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-0 pb-0">
            <label htmlFor="validationServerUsername">
              Your group <span className="small text-muted font-italic">A friendly name of your group.</span>
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
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-0 pb-0">
            <label htmlFor="validationServerUsername">
              Card name <span className="small text-muted font-italic">A friendly name for the card.</span>
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
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              {((errors.groupName && errors.groupName.type === "pattern") || (errors.shortName && errors.shortName.type === "pattern")) && (
                <p>
                  <span className="text-danger">Only letters, numbers, and hyphens are allowed</span>
                </p>
              )}
            </div>
          </div>
        </div>
        {qrLink && (
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="validationServerUsername pb-0 mb-0" className="mb-0">
                QR code <span className="small text-muted font-italic">Share on devices e.g. screens, leaflets.</span>
              </label>
              <div>
                <img className="shadow" src={qrLink} alt="QR Code" />
              </div>
            </div>
          </div>
        )}
        {qrLink && (
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="validationServerUsername pb-0 mb-0" className="mb-0">
                Link <span className="small text-muted font-italic">Share via social channels or email.</span>
              </label>
              <div>
                <p>
                  <Link target="_blank" href={shareableLink}>
                    {shareableLink}
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button role="button" className="btn btn-success" onClick={copyToClipboard}>Copy share link  <i className="bi bi-copy"></i></button> {copySuccess && <i className="bi bi-check-circle-fill"></i>}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePublish;
