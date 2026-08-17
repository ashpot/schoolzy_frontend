import Modal from "@/shared/components/modal/Modal";
import CopyableRow from "@/shared/components/modal/CopyableRow";
import ModalHeader from "@/shared/components/modal/ModalHeader";

interface UserCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  username: string;
  password: string;
  role: string;
}

export default function UserCreatedModal({
  isOpen, onClose, fullName, username, password, role,
}: UserCreatedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader
        variant="success"
        title={`${role} Account Created`}
        subtitle={
          <>
            Share these login details with{" "}
            <span className="font-medium text-text-primary">{fullName}</span>.
            This is the only time the password will be shown here.
          </>
        }
      />
      <div className="flex flex-col gap-2.5">
        <CopyableRow label="Username" value={username} />
        <CopyableRow label="Password" value={password} />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-hover transition-colors"
      >
        Done
      </button>
    </Modal>
  );
}