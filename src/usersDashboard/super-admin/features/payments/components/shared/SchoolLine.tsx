export default function SchoolLine({ name, location }: { name: string; location?: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-text-primary">{name}</p>
      {location && <p className="text-xs text-text-muted">{location}</p>}
    </div>
  );
}