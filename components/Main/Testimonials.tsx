interface ITestimonialCard {
  name: string;
  img?: string;
  title: string;
  company?: string;
  description: string;
}

const testimonials: ITestimonialCard[] = [
  {
    name: 'Leandro Souza',
    img: '/testimonials/leandro.jpg',
    title: 'Software Developer',
    company: 'Robotizei',
    description:
      'Gostaria de parabenizá-lo pelo excelente trabalho que realizou entregando a brapi como uma alternativa gratuita com relação a consulta de dados do mercado financeiro.',
  },
  {
    name: 'Gilson Vieira',
    img: '/testimonials/gilson.jpg',
    title: 'Desenvolvedor Front-end',
    company: 'Credsolaris',
    description:
      'Primeiramente gostaria de parabenizar pela qualidade e pela iniciativa da API, muito bem documentada e de fácil entendimento, eu como desenvolvedor de sistemas me senti muito satisfeito e grato pelo serviço oferecido.',
  },
  {
    name: 'Misael Vidal',
    img: '/testimonials/misael.jpg',
    title: 'Analista de Infraestrutura e Operação Senior',
    company: 'F1RST Tecnologia',
    description:
      'Parabéns pelo trabalho que realizam e disponibilizam, é muito 10!',
  },
  {
    name: 'Fábio R. Candiá',
    img: '/testimonials/fabio.jpg',
    title: 'Diretor de Desenvolvimento',
    company: 'Projetus TI',
    description:
      'Fantástico! Gostei demais da Brapi, vai ajudar muito. Parabéns pela iniciativa. Estava pesquisando APIs e não é muito simples.',
  },
  {
    name: 'Alex Ronchi',
    img: '/testimonials/alex.jpg',
    title: 'Desenvolvedor de sistemas',
    company: 'Freelancer em Desenvolvimento',
    description:
      'Achei muito legal a Brapi, tem muita informação interessante.',
  },
  {
    name: 'Diego Porfirio',
    img: '/testimonials/diego.jpg',
    title: 'Analista de sistemas',
    company: 'Sistema Ocepar',
    description:
      'Parabéns pela API! Ficou show o site, documentação, layout, tudo.',
  },
  {
    name: 'Filipe Menezes',
    title: 'Developer',
    company: 'easyfii.app',
    description:
      'Gostaria de parabenizá-los pela API e dizer que está me ajudando bastante no desenvolvimento de algumas soluções.',
  },
  {
    name: 'Sergio Eduardo',
    title: 'Developer',
    company: null,
    description:
      'Depois de muito pesquisar no Google encontrei o site da brapi, gostaria de parabenizar pela iniciativa e qualidade do serviço.',
  },
];

export const Testimonials = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="[column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  name,
  img,
  title,
  company,
  description,
}: ITestimonialCard) => {
  return (
    <div className="mb-8 sm:break-inside-avoid cursor-default">
      <blockquote className="rounded-xl bg-gray-800 p-6 shadow">
        <p className="leading-relaxed text-gray-300">{description}</p>
      </blockquote>

      <div className="mt-4 flex items-center gap-4 filter grayscale hover:grayscale-0 transition duration-300 ease-in-out">
        {img && (
          <img
            alt={`Foto de ${name}`}
            src={img || '/testimonials/default.jpg'}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}

        <div className="text-sm text-gray-400">
          <p className="font-medium">{name}</p>
          <p>{title}</p>
          <p>{company}</p>
        </div>
      </div>
    </div>
  );
};
