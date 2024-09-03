import Image from "next/image";
import { useEffect } from "react";
import { GameComponentProps } from "@/cards/[cardId]";

const GameForm = ({ game: game, register, errors, imgSrc, setImgSrc }: GameComponentProps) => {
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
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="title" className="text-black">
              Title* <span className="small text-muted font-italic">A name for the card</span>
            </label>
            <input disabled={game.isWon} type="text" className="form-control shadow-sm" id="title" {...register("title", { required: true })} />
            {errors.title && <span className="text-danger">This field is required</span>}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="description" className="text-black">
              Description* <span className="small text-muted font-italic">A description of what the card is for.</span>
            </label>
            <textarea disabled={game.isWon} className="form-control shadow-sm" id="description" {...register("description", { required: true })} rows={13}></textarea>
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
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="description" className="text-black">
              Image <span className="small text-muted font-italic">An optional image.</span>
            </label>
            <div className="image-preview-wrapper shadow-sm">
              <Image
                id="img"
                src={imgSrc?.startsWith("blob:") ? imgSrc : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${imgSrc}`}
                alt={"Image for game " + game?.title}
                unoptimized={true}
                fill={true}
                style={{ objectFit: "cover", cursor: "pointer" }}
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
                  cursor: "pointer",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameForm;
