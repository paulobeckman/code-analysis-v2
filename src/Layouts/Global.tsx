import { Link, Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <>
      <header className="flex justify-center items-center gap-20 h-16 bg-white shadow-md mb-6">
        <Link
          to="/grammar"
          className="underline underline-offset-4 hover:text-slate-500"
        >
          Gramatica - Analisador Sintático
        </Link>
      </header>
      <main className="m-auto md:max-w-[960px]">
        <Outlet />
      </main>
    </>
  );
};

export default GlobalLayout;
