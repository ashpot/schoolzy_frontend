import { ENABLE_SOCIAL_LOGIN } from "../../utils/constants";

// TODO: Replace with local SVGs in @/assets/super-admin-auth/social/
const PROVIDERS = [
  { id: "facebook", label: "Facebook", icon: "https://cdn.simpleicons.org/facebook/1877F2" },
  { id: "google", label: "Google", icon: "https://cdn.simpleicons.org/google" },
  { id: "apple", label: "Apple", icon: "https://cdn.simpleicons.org/apple/000000" },
];

export default function SocialLoginRow() {
  if (!ENABLE_SOCIAL_LOGIN) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border-line03" />
        <span className="text-base text-text-muted">Or login with</span>
        <span className="h-px flex-1 bg-border-line03" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Continue with ${p.label}`}
            onClick={() => {
              // TODO: Replace with actual OAuth flow
            }}
            className="flex-center rounded-xl border border-border-line03 py-4 transition-colors hover:border-brand-primary"
          >
            <img src={p.icon} alt="" className="h-6 w-6" />
          </button>
        ))}
      </div>
    </div>
  );
}