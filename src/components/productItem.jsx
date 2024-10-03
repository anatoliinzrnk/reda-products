import { parseISO, format } from "date-fns";

const ProductItem = ({ product, onClick, checked = false }) => {
  const handleToggleSelect = () => {
    onClick(product.id);
  };

  return (
    <div
      className="p-4 gap-5 flex items-start cursor-pointer shadow-md border"
      onClick={handleToggleSelect}
    >
      <input type="checkbox" className="mt-1" checked={checked} />
      <img
        src={product.images[0].src}
        alt={product.title}
        width={100}
        height={50}
      />
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[18px]">{product.title}</span>
        <div className="rounded-full bg-emerald-200 w-fit px-2 text-[14px]">
          {`EUR ${product.variants[0].price}`}
        </div>
        <span className="text-[12px]">{`Created: ${format(
          parseISO(product.created_at),
          "M/d/yyyy, h:mm:ss a"
        )}`}</span>
        <span>
          {product.tags.map((tag, index) => (
            <div
              key={index}
              className="rounded bg-gray-300 w-fit px-2 text-[14px]"
            >
              {tag}
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
