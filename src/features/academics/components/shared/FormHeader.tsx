interface FormHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  icon: React.ReactNode;
}
const FormHeader = ({ title, icon, ...props }: FormHeaderProps) => {
  return (
    <section className="py-5 border-b border-border-line04" {...props}>
        <div className="flex items-center gap-4 px-5">
        <span className="w-7 h-7 rounded-full bg-brand-primary/10 flex-center">
          {icon}
        </span>
        <h2 className="section-title">{title}</h2>
      </div>
    </section>
  )
}

export default FormHeader
