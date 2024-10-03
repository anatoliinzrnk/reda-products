import { CloseIcon } from "@/icons/close";
import { SearchIcon } from "@/icons/search";
import { StarIcon } from "@/icons/star";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FetchedProductsModal from "@components/fetchedProductsModal";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [fetchedProductsModalOpen, setFetchedProductsModalOpen] =
    useState(false);

  const handleOpenFetchedProductsModal = () => {
    setFetchedProductsModalOpen(true);
  };

  const handleRemoveURL = () => {
    setValue("URL", "");
  };

  const handleCloseFetchedProductsModal = () => {
    setFetchedProductsModalOpen(false);
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [imported, setImported] = useState(false);

  const handleImportProducts = () => {
    setImported(true);
    setFetchedProductsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-10 flex flex-col gap-4">
        <span className="text-[32px] font-bold">Store or collection URL</span>
        <form onSubmit={handleSubmit(handleOpenFetchedProductsModal)}>
          <div className="flex justify-between gap-4">
            <div className="flex flex-1 gap-2 items-center">
              <input
                className={`shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 ${
                  errors.URL ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Input URL"
                {...register("URL", {
                  required: "Please enter a valid Shopify store URL.",
                })}
              />
              <button
                className={`bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  watch("URL") ? "" : "hidden"
                }`}
                onClick={handleRemoveURL}
              >
                <CloseIcon stroke="white" />
              </button>
            </div>

            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow"
              type="submit"
            >
              Import products
            </button>
          </div>

          {errors.URL && (
            <span className="text-red-500 text-sm mt-2">
              {errors.URL.message}
            </span>
          )}
        </form>

        <div className="mt-5">
          <div className="flex items-center mb-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:bg-gray-500"
            />
            <label htmlFor="default-checkbox" className="ms-2 font-medium">
              Import more than 250 products
            </label>
          </div>
          <span className="ml-6">
            Note: Importing more than 250 products may take longer and slow down
            your computer
          </span>
        </div>

        <div className="mt-6">
          <div className="p-4 bg-zinc-800 flex flex-1 text-white gap-2 rounded-[20px]">
            <div className="mt-1">
              <StarIcon stroke="white" width={20} height={20} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg">
                Products processed by AI in the background
              </span>
              <span className="text-sm tracking-wide">
                The products imported are being processed by AI in the
                background. You may now leave this page.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-[20px]">
              <span className="font-semibold">Successful Uploads</span>
              <span className="text-gray-600">{selectedProducts.length}</span>
            </div>
            <div className="rounded-[10px] bg-white shadow-md">
              <div className="p-4 flex gap-2 items-center border-b border-gray-300">
                <SearchIcon width={20} height={20} />
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
                  type="text"
                  placeholder="Filter products"
                />
              </div>
              <div>
                {imported &&
                  selectedProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-4 border-b">
                      <img
                        src={product.images[0].src}
                        alt={product.title}
                        width={100}
                      />
                      <div className="flex flex-col gap-2">
                        <div>{product.title}</div>
                        <div className="text-green-500">
                          Successfully imported
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {fetchedProductsModalOpen && (
        <FetchedProductsModal
          open={fetchedProductsModalOpen}
          onClose={handleCloseFetchedProductsModal}
          url={watch("URL")}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onImportProducts={handleImportProducts}
        />
      )}
    </div>
  );
};

export default Home;
