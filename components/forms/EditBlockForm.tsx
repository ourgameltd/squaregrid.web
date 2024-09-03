import { Block } from "@/Block";
import React, { useEffect, useState } from "react";

interface EditBlockModalProps {
  block: Block | null;
  show: boolean;
  onClose: () => void;
  onSave: (updatedBlock: Block) => void;
}

const EditBlockModal: React.FC<EditBlockModalProps> = ({ block, show, onClose, onSave }) => {
  const [editTitle, setEditTitle] = useState<string>(block?.title || "");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(block?.isConfirmed || false);
  const [claimedBy, setClaimedBy] = useState<string | undefined>(block?.claimedByFriendlyName);

  useEffect(() => {
    if (block) {
      setEditTitle(block.title);
      setIsConfirmed(block.isConfirmed);
      setClaimedBy(block.claimedByFriendlyName);
    }
  }, [block]);

  const handleSave = () => {
    if (block) {
      onSave({
        ...block,
        title: editTitle,
        isConfirmed,
        claimedByFriendlyName: claimedBy,
        isClaimed: claimedBy ? true : false,
        dateConfirmed: isConfirmed ? new Date() : undefined,
        dateClaimed: claimedBy ? new Date() : undefined,
      });
    }
  };

  return (
    <>
      <div className="modal-overlay" style={{ background: "#CBCBCB", opacity: 0.7, display: show ? "block" : "none" }}></div>
      <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content" style={{ background: "#FFF", opacity: 1 }}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Block</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="blockTitle">Block Title</label>
                <input type="text" className="form-control" id="blockTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="blockClaimedBy">Claimed By</label>
                <input type="text" className="form-control" id="blockClaimedBy" value={claimedBy} onChange={(e) => setClaimedBy(e.target.value)} />
              </div>
              <div className="form-group">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="blockConfirmed" defaultChecked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} />
                  <label className="form-check-label" htmlFor="blockConfirmed">
                    Confirmed
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlockModal;
