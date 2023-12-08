import banner from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <section
      className=" min-h-[80vh] bg-cover relative "
      style={{
        backgroundImage: `URL(${banner})`,
        backgroundPosition: "",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="opacity-layer"></div>
    </section>
  );
};

export default Banner;
