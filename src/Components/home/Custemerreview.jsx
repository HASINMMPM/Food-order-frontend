import React from "react";
import img from '/Logo.png'

const Custemerreview = () => {
  return (
    <section className="mysection ">
      <div className="flex justify-center items-center">
        <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xl text-center font-semibold py-6">
          Our support
        </span>
      </div>
      <div className="flex flex-col md:flex-row mt-6">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {/* 
        Images
         */}
         <img src={img} alt="" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6  justify-center mt-10 md:mt-0">
          <h3 className="text-primary  text-3xl font-semibold font-sub-heading text-start capitalize">
            What Our customers says
          </h3>
          <p className="text-xl">
            "I cannot express how pleased I am with the service I received from
            this company. From the moment I contacted them until the completion
            of the project, they were professional, efficient, and courteous.
            The team went above and beyond to ensure that my needs were met, and
            the end result was even better than I had hoped. I highly recommend
            this company to anyone looking for quality service and a positive
            experience. Thank you for your outstanding work!"
          </p>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12">
                <span>+99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Custemerreview;
