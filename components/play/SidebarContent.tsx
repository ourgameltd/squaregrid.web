import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withNewLines } from "@/stringUtils";
import { GameFormModel } from "@/Game";
import QRCode from "qrcode";

export interface SidebarContentComponentProps {
  game: GameFormModel;
}

const SidebarContent: React.FC<SidebarContentComponentProps> = ({ game }) => {
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

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-12">
          <div className="image-container">
            <Image
              src={game?.image?.startsWith("blob:") ? game?.image : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${game?.image}`}
              alt={"Image for game " + game?.title}
              unoptimized={true}
              fill={true}
              style={{ objectFit: "cover" }}
              priority={true}
              className="img-fluid rounded-start"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="card-body">
            <h5 className="card-title">{game?.title}</h5>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: withNewLines(game?.description) }}></p>
            <div className="row">
              <div className="col-md-12 text-center mb-4">
                <img className="shadow w-50" src={qrLink} alt="QR Code" />
              </div>
              <div className="col-md-12 text-center">
                <button role="button" className="btn btn-success" onClick={copyToClipboard}>Copy share link  <i className="bi bi-copy"></i></button> {copySuccess && <i className="bi bi-check-circle-fill"></i>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
