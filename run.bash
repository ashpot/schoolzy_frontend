cd "$(git rev-parse --show-toplevel)" && [ -f package.json ] && [ -d src ] || { echo "❌ Not in project root"; return 1 2>/dev/null; }

F="src/usersDashboard/super-admin/features"
RL="$F/roles"
AU="$F/audit"
mkdir -p "$RL"/{types,schemas,animations,data,utils,hooks,pages,components} "$AU"/{types,animations,data,utils,hooks,pages,components}

FILES=(
  "$RL/api.ts" "$RL/index.ts" "$RL/types/index.ts" "$RL/schemas/index.ts" "$RL/animations/variants.ts"
  "$RL/utils/constants.ts" "$RL/utils/derive.ts" "$RL/utils/format.ts"
  "$RL/data/mockRoles.ts" "$RL/hooks/useRoles.ts" "$RL/pages/RolesPage.tsx"
  "$RL/components/RolesList.tsx" "$RL/components/RoleHeader.tsx" "$RL/components/PermissionsMatrix.tsx"
  "$RL/components/RolePanel.tsx" "$RL/components/RoleFormModal.tsx"
  "$AU/api.ts" "$AU/index.ts" "$AU/types/index.ts" "$AU/animations/variants.ts"
  "$AU/utils/constants.ts" "$AU/utils/format.ts" "$AU/utils/tones.tsx"
  "$AU/data/mockAudit.ts" "$AU/hooks/useAudit.ts" "$AU/pages/AuditLogsPage.tsx"
  "$AU/components/auditColumns.tsx" "$AU/components/LogDrawer.tsx"
  "$AU/components/ActivityTimeline.tsx" "$AU/components/SecurityInsights.tsx"
)

touch "${FILES[@]}"
echo "✅ ${#FILES[@]} files scaffolded"