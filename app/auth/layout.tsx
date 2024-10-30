

export default function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="p-5 justify-center items-center flex">
        {/* Include shared UI here e.g. a header or sidebar */}   
        {children}
      </section>
    )
  }