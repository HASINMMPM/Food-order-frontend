import React from "react";

const Services = () => {
    const services=[
        {
            image:"/Logo.png",
            title: "Restaurant Selection",
            description:
              "Provide a platform for users to browse menus from a variety of restaurants in their area."
        },
        {
            image:"/Logo.png",
            title: "Restaurant Selection",
            description:
              "Provide a platform for users to browse menus from a variety of restaurants in their area."
        },
        {
            image:"/Logo.png",
            title: "Restaurant Selection",
            description:
              "Provide a platform for users to browse menus from a variety of restaurants in their area."
        },
        {
            image:"/Logo.png",
            title: "Restaurant Selection",
            description:
              "Provide a platform for users to browse menus from a variety of restaurants in their area."
        },
    ]
  return (
    <section className="mysection bg-secondary">
      <div className="flex justify-center items-center">
        <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xl text-center font-semibold py-6">
          Our Survices
        </span>
      </div>
      <div className="grid grid-cols-1 gap-10 place-items-center md:grid-cols-2 px-16">
        {
            services.map((service, index) => (
              <article key={index} className="relative w-full  h-48 bg-white rounded-md shadow-md p-6 flex flex-row gap-10 justify-center items-center">
                <img src={service.image} alt={service.title} className="w-32 h-32 object-contain bg-primary rounded-full justify-center items-center" />
                <div className="flex flex-col w-1/2">
                <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                <p className="mt-2 text-gray-600 text-base">{service.description}</p>
                </div>
                
              </article>
            ))
  
        }
      </div>
    </section>
  );
};

export default Services;
