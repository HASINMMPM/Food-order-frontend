import React from "react";

const Services = () => {
  const services = [
    {
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400",
      title: "Healthy Fast Meals",
      description:
        "Provide a selection of nutritious meals that are both healthy and prepared quickly, perfect for those with limited time.",
    },
    {
      image: "https://th.bing.com/th/id/OIG1.vN4L15U48VanVL7Wu3VT?pid=ImgGn",
      title: "Restaurant Selection",
      description:
        "Provide a platform for users to browse menus from a variety of restaurants in their area.",
    },
    {
      image:
        "https://bsmedia.business-standard.com/_media/bs/img/article/2018-01/29/full/1517243856-5092.jpg",
      title: "Online Ordering:",
      description:
        "Enable users to place orders for food and drinks directly through the company's website or app.",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/018/825/386/non_2x/fast-delivery-by-scooter-on-mobile-e-commerce-concept-online-food-order-infographic-webpage-app-design-blue-background-perspective-free-vector.jpg",
      title: "Speed Delivery: ",
      description: "Prioritize fast delivery times, ideal for busy customers.",
    },
  ];
  return (
    <section className="mysection bg-secondary">
      <div className="flex justify-center items-center">
      <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xs md:text-xl text-center font-semibold py-4">
      Our Survices
        </span>
      </div>
      <div className="grid grid-cols-1   place-items-center md:grid-cols-2 px-16 gap-8  ">
        {services.map((service, index) => (
          <article
            key={index}
            className="flex flex-col lg:flex-row justify-center items-center p-4 hover:shadow-xl gap-4 shadow-md"
          >
            <div className="w-20 md:w-48">
              <img
                className="w-16 h-16  object-cover md:h-32 md:w-32 rounded-full"
                src={service.image}
                alt=""
              />
            </div>
            <div className="">
              <h5 className="font-semibold text-lg md:text-xl underline underline-offset-2 md:no-underline">
                {service.title}
              </h5>
              <p className="text-md md:text-lg">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
