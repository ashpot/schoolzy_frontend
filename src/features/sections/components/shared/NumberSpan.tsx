
export default function NumberSpan({number}:{number: string | number}) {
  return (
    <span
      className="px-2.5 py-1.5 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold border border-border-line02"
    >
      {number}
    </span>
  )
}