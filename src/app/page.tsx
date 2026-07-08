import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegistrationForm } from "../components/RegistrationForm";
import { Header } from "../components/Header";
import { AmbientBackground } from "../components/AmbientBackground";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-animated-mesh-v3 text-gray-900 selection:bg-[#ea4a22] selection:text-white pb-12 relative ">
      {/* Contenedor de Luces Ambientales Aleatorias Optimizadas (Componente React) */}
      <AmbientBackground />

      {/* Capa de líneas en movimiento estilo deportivo */}
      <div className="pattern-mesh-v3"></div>
      
      <div className="relative z-10">
        <Header />
      </div>
      
      <main className="px-4 max-w-4xl mx-auto relative z-20 -mt-10 md:-mt-14">
        {/* Formulario superpuesto */}
        <RegistrationForm />
      </main>

      {/* Footer del Desarrollador */}
      <Footer />

      {/* Notificaciones */}
      <ToastContainer 
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-poppins font-medium text-sm"
      />
    </div>
  );
}