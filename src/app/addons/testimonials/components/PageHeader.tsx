const PageHeader = ({
  children,
  className,
  title,
  description,
}: {
  children?: React.ReactNode;
  className?: string;
  title: string;
  description: string;
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-1">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {children}
    </div>
  );
};

export { PageHeader };
