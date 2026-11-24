import { useEffect, useState } from "react";
import { useSavePermissions } from "../hooks/useRoles";
import type { PermissionMap, Role } from "../types";
import { sameMap } from "../utils/derive";
import PermissionsMatrix from "./PermissionsMatrix";
import RoleHeader from "./RoleHeader";

interface RolePanelProps {
  role: Role;
  onDirty: (dirty: boolean) => void;
  onEdit: () => void;
}

// Mount it with key={role.id} so each role starts from its saved permissions.
export default function RolePanel({ role, onDirty, onEdit }: RolePanelProps) {
  const [draft, setDraft] = useState<PermissionMap>(role.permissions);
  const save = useSavePermissions();
  const dirty = !sameMap(draft, role.permissions);

  useEffect(() => {
    onDirty(dirty);
    return () => onDirty(false);
  }, [dirty, onDirty]);

  return (
    <div className="space-y-6">
      <RoleHeader role={role} onEdit={onEdit} />
      <PermissionsMatrix
        role={role}
        draft={draft}
        onChange={setDraft}
        dirty={dirty}
        saving={save.isPending}
        saved={save.isSuccess}
        error={save.isError ? save.error.message : null}
        onSave={() => save.mutate({ id: role.id, permissions: draft })}
      />
    </div>
  );
}