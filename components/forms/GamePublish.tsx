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
          <div className="form-group">
            <label htmlFor="validationServerUsername">
              Share link <span className="small text-muted font-italic">Make a friendly link for your card</span>
            </label>
            <div className="input-group">
              <input
                disabled={game.isWon}
                type="text"
                placeholder="e.g. my-club"
                className="form-control"
                id="groupName"
                onKeyUp={handleGroupNameKeyUp}
                {...register("groupName", { pattern: /^[A-Za-z0-9-]+$/ })}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">
                  /
                </span>
              </div>
              <input
                disabled={game.isWon}
                type="text"
                placeholder="e.g. card-for-x"
                className="form-control"
                id="shortName"
                onKeyUp={handleShortNameKeyUp}
                {...register("shortName", { pattern: /^[A-Za-z0-9-]+$/ })}
              />
            </div>
            <p>
              <Link target="_blank" href={shareableLink}>
                {shareableLink}
              </Link>
            </p>
            {((errors.groupName && errors.groupName.type === "pattern") || (errors.shortName && errors.shortName.type === "pattern")) && (
              <p>
                <span className="text-danger">Only letters, numbers, and hyphens are allowed</span>
              </p>
            )}
          </div>
        </div>
        {qrLink && (
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="validationServerUsername">
                QR code <span className="small text-muted font-italic">Share this via physical media</span>
              </label>
              <div>
                <img className="shadow" src={qrLink} alt="QR Code" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePublish;
