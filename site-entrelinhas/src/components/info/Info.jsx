import React from "react";
import "./Info.css";

const Info = () => {
  return (
    <>
      <div className="container">
        <div>
          <h3 id="SobreNos" className=" text-danger pt-5">
            QUEM É A REDev?
          </h3>
          <p>
            Na REDev, somos apaixonados por criar experiências digitais que
            transformam a maneira como as pessoas compram e vendem online.
            Especializados em desenvolvimento de sites para comércio eletrônico,
            nossa missão é capacitar empresas e empreendedores a alcançarem o
            sucesso no mercado digital.
          </p>
        </div>
        <div>
          <h3 id="NossosServicos" className="text-danger pt-5">
            NOSSOS SERVIÇOS
          </h3>
          <p>
            <strong>Desenvolvimento de Sites Personalizados:</strong> Cada
            negócio é único, e acreditamos que seu site deve refletir isso.
            Desenvolvemos sites sob medida, garantindo que cada detalhe atenda
            às necessidades específicas do seu empreendimento. Desde a
            arquitetura da informação até o design e a funcionalidade, tudo é
            planejado para oferecer uma experiência de usuário excepcional.
          </p>
          <p>
            <b>Design Responsivo:</b> Com a crescente utilização de dispositivos
            móveis, é crucial que seu site ofereça uma experiência perfeita em
            todas as telas. Nossos designs são totalmente responsivos,
            garantindo que seus clientes possam navegar e comprar facilmente,
            independentemente do dispositivo que estejam usando.
          </p>
          <p>
            <b>Segurança e Suporte Técnico:</b> A segurança dos dados dos seus
            clientes é nossa prioridade. Implementamos as melhores práticas de
            segurança e oferecemos suporte técnico contínuo, garantindo que seu
            site esteja sempre protegido e funcionando perfeitamente.
          </p>
        </div>
        <div className="text-center">
          <h2 className=" text-danger pt-5">REDEV DESENVOLVIMENTOS</h2>
          <a>
            Na REDev, não somos apenas desenvolvedores de sites; somos parceiros
            de negócios. Acreditamos no poder da colaboração e trabalhamos lado
            a lado com nossos clientes, desde a concepção do projeto até o
            lançamento e além. Nosso compromisso é com a excelência e a
            inovação, sempre buscando as melhores soluções para impulsionar seu
            negócio online.
          </a>
        </div>
      </div>
    </>
  );
};

export default Info;
