const SectionTitle = ({
  heading,
  subTitle,
}: {
  heading: string;
  subTitle?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 mt-5 space-y-2">
      <h2 className="text-2xl text-gray-800 md:text-3xl font-semibold text-center font-heading">{heading}</h2>
      <p className="text-center text-gray-700">{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
