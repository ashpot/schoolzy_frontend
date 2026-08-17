import CopyableRow from "@/shared/components/modal/CopyableRow";
import Modal from "@/shared/components/modal/Modal";
import ModalHeader from "@/shared/components/modal/ModalHeader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  name: string;
  id: string | number;
}

export default function SessionCreatedModal({ isOpen, onClose, title, name, id }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader
        variant="success"
        title={title}
        subtitle={
          <>
            <span className="font-medium text-text-primary">{name}</span> was created successfully.
          </>
        }
      />
      <CopyableRow label="ID" value={String(id)} />
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