interface AuthHeadingProps {
  title: string;
  subtitle: string;
}

export default function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="space-y-4">
      <h1 className="font-jakarta text-4xl font-semibold text-text-primary lg:text-5xl">
        {title}
      </h1>
      <p className="font-lato text-lg text-text-secondary">{subtitle}</p>
    </div>
  );
}