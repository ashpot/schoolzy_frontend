interface Props {
  left:  React.ReactNode;
  right: React.ReactNode;
}

export default function SplitLayout({ left, right }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}