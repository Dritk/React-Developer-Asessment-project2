interface ProductCardProps {
  imgSrc?: string;
  title: string;
  price?: number;
  rating?: number;
  discount?: number;
  onClick?: () => void;
}

const ProductCard = ({
  title,
  imgSrc,
  price,
  rating,
  discount,

  onClick,
}: ProductCardProps) => {
  return (
    <div className=" bg-white border border-gray-200 w-80 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5">
      <div className="flex flex-col items-center">
        <img
          src={imgSrc || "/vite.svg"}
          alt={title}
          className="w-32 h-32  rounded-lg mb-4"
        />
        <p className="font-semibold text-lg text-gray-800 text-center mb-2 ">
          {title}
        </p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className=" font-bold text-lg">${price}</span>
        <span className=" text-sm font-semibold px-2 py-1 rounded">
          ⭐{rating}
        </span>
      </div>
      <p className=" font-medium mb-4">Discount: {discount}%</p>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        onClick={onClick}
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;
