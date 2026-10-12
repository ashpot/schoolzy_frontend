import Button from "@/shared/ui/Button";

interface Props {
  isError: boolean;
  onRetry: () => void;
}

export default function OnboardingState({ isError, onRetry }: Props) {
  if (isError) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center card-shadow">
        <h2 className="section-title">Couldn't load your setup</h2>
        <p className="text-body-small text-text-secondary mt-1">
          Check your connection and try again.
        </p>
        <Button variant="outline" onClick={onRetry} className="mt-5">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-64 rounded-lg bg-border-line02" />
      <div className="h-2.5 w-full rounded-full bg-border-line02" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-36 rounded-2xl bg-border-line02" />
      ))}
    </div>
  );
}