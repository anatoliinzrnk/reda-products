import { CloseIcon } from "@/icons/close";
import { EditIcon } from "@/icons/edit";
import { SearchIcon } from "@/icons/search";
import ProductItem from "@components/productItem";
import { useEffect, useMemo, useState } from "react";
import TranslationIcon from "../icons/translation";
import MagicIcon from "../icons/magic";

const FetchedProductsModal = ({
  open,
  url,
  onClose,
  selectedProducts,
  setSelectedProducts,
  onImportProducts,
}) => {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`https://orthofrei.com/products.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then(({ products }) => {
        setProducts(products);
      });
  }, [url]);

  const handleQChange = (e) => {
    setQ(e.target.value);
  };

  const handleToggleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.some(
        (product) => product.id === productId
      );
      const clickedProduct = products.find(
        (product) => product.id === productId
      );
      return isSelected
        ? prevSelected.filter((product) => product.id !== productId)
        : clickedProduct
        ? [...prevSelected, clickedProduct]
        : prevSelected;
    });
  };

  const handleChangeTag = (e) => {
    setTag(e.target.value);
  };

  const handleAddTags = () => {
    if (tag && !tags.includes(tag)) setTags((prev) => [...prev, tag]);
    setTag("");
  };

  const handleRemoveTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      ),
    [q, products]
  );

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        open ? "" : "hidden"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-[20px] w-[800px]">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <EditIcon />
            <span className="text-[20px] font-semibold">
              Select the products to be imported
            </span>
          </div>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto py-2">
          {/* <div className="mb-4 flex flex-col gap-4 p-4 border-y">
            <span className="text-[18px] font-semibold">
              Enhance your products with AI
            </span>
            <div className="flex gap-4 items-start">
              <div className="bg-fuchsia-200 rounded flex-1 border border-gray-400">
                <div className="p-1 border-b border-gray-400 flex items-center gap-2">
                  <MagicIcon width={16} />
                  Improve with AI
                </div>
                <div className="p-1 flex flex-col gap-1">
                  {["Reword Titles", "Reword Descriptions"].map((item) => (
                    <div className="flex items-center gap-2" key={item}>
                      <input type="checkbox" id={item} />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-200 rounded flex-1 border border-gray-400">
                <div className="p-1 border-b border-gray-400 flex items-center gap-2">
                  <TranslationIcon width={16} />
                  Translate your products
                </div>
                <div className="p-1 flex flex-col gap-1 border-b border-gray-400">
                  {[
                    "Translate Titles",
                    "Translate Descriptions",
                    "Translate Variants",
                  ].map((item) => (
                    <div className="flex items-center gap-2" key={item}>
                      <input type="checkbox" id={item} />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="p-2 flex items-center gap-2">
                  <span>Translate to</span>
                  <span>Spanish</span>
                </div>
              </div>
            </div>
          </div> */}

          <div className="p-4 gap-4 flex flex-col border-b">
            <span className="text-[18px] font-semibold">
              Tags to be added to all products
            </span>
            <div>
              <div>
                (Add multiple by separating by comma. E.g: "tag1,tag2,tag3")
              </div>
              <div className="flex gap-1">
                <input
                  className="rounded-full shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
                  value={tag}
                  onChange={handleChangeTag}
                />
                <button
                  className="rounded-full border px-4 py-1 shadow-md"
                  onClick={handleAddTags}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex wrap gap-2">
              {tags.map((tag) => (
                <div
                  className="p-1 flex items-center gap-2 bg-gray-200 w-fit rounded"
                  key={tag}
                >
                  {tag}
                  <span className="cursor-pointer">
                    <CloseIcon
                      width={16}
                      height={16}
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 gap-4 flex flex-col border-b">
            <div className="flex justify-between">
              <span className="text-[18px] font-semibold">
                Product Collections
              </span>
              <div className="flex items-center gap-2">
                <button className="rounded-full border px-4 py-1 shadow-md">
                  Create collection
                </button>
                <button className="rounded-full border px-4 py-1 shadow-md">
                  Select collections
                </button>
              </div>
            </div>
            <div className="flex flex-1 items-center bg-teal-100 p-2 border-2 border-gray-300 rounded">
              Products will be added to the default collection
            </div>
          </div>

          <div className="p-4 gap-4 flex flex-col border-b">
            <div>Publish Product</div>
            <div className="flex gap-2">
              <input type="checkbox" id="publish-product" />
              <label htmlFor="publish-product">
                Publish products to Online Store on import
              </label>
            </div>
          </div>

          {/* <div className="text-[18px] font-semibold mb-1">Filter products</div> */}
          {/* <input className="border shadow-sm rounded-full w-full p-4 py-2 mb-4" /> */}
          <div className="p-4 gap-4 flex flex-col border-b">
            <div className="text-[18px] font-semibold mb-4">
              Products to import
            </div>

            <div className="p-4 gap-5 flex flex-col shadow-md border">
              <div className="flex items-center gap-2 flex-1">
                <SearchIcon />
                <input
                  className="border shadow-sm rounded-full w-full p-4 py-2"
                  placeholder="Filter products by title or price (unrounded)"
                  value={q}
                  onChange={handleQChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                  <span className="font-semibold text-[18px]">
                    Showing {selectedProducts.length}/{filteredProducts.length}{" "}
                    products
                  </span>
                </div>
                <button className="border rounded-full px-4 py-2">
                  Default
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              {filteredProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onClick={handleToggleSelectProduct}
                  checked={selectedProducts.some(
                    (selected) => selected.id === product.id
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 pt-1">
          <div className="flex items-center gap-3">
            <button className="bg-black text-white rounded-[10px] p-2">
              Available: 10847
            </button>
            <button className="bg-black text-white rounded-[10px] p-2">
              Cost: ~0
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="border-2 border-green-200 rounded-full p-2 text-green-500 px-4">
              Export to CSV
            </button>
            <button
              className="bg-gradient-to-br from-violet-400 to-violet-700 rounded-full p-2 text-white px-4 hover:scale-105 duration-500"
              onClick={onImportProducts}
            >
              Import {selectedProducts.length} products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchedProductsModal;
