function PageContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const style = "flex-1 bg-background text-foreground max-w-screen" + className ? className : ""
  return (
    <div
      className={style}
      {...props}
    >
      {children}
    </div>
  );
}

export { PageContainer };
