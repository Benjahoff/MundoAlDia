export default function Footer() {
    return (
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-blue-400 text-sm">
            &copy; {new Date().getFullYear()} MundoAlDía. Todos los derechos reservados.
          </p>
          <p className="text-blue-400 text-sm mt-2">
            Desarrollado por <span className="font-semibold">Benjamín Hoffman</span>
          </p>
          <p className="text-blue-400 text-sm mt-2">
            <a href="https://github.com/Benjahoff" target="_blank" rel="noopener noreferrer" className="underline">
              GitHub: Benjahoff
            </a>
          </p>
        </div>
      </footer>
    );
  };
  