import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import FInput from "@/components/form/FInput";
import {
  useGetAllbrandsQuery,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import ProductCard from "@/components/card/ProductCard";
import { TQueryParam } from "@/types";
import ReactSlider from "react-slider";
import Loader from "@/components/Shared/Loader";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/Shared/Pagination";

const categories = [
  "Writing",
  "Office Supplies",
  "Art Supplies",
  "Educational",
  "Technology",
];

const ProductPage = () => {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("Default");
  const [range, setRange] = useState([0, 1000]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (category) {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev : [...prev, category]
      );
    }
  }, [category]);

  // Construct query parameters
  const queryParams: TQueryParam[] = [
    search && { name: "searchTerm", value: search },
    inStock && { name: "inStock", value: inStock },
    range && { name: "minPrice", value: range[0].toString() },
    range && { name: "maxPrice", value: range[1].toString() },
    selectedCategories.length > 0 && {
      name: "category",
      value: selectedCategories.join(","),
    },
    selectedBrands.length > 0 && {
      name: "brand",
      value: selectedBrands.join(","),
    },
    sortBy !== "Default" && { name: "sort", value: sortBy },
    { name: "limit", value: itemsPerPage.toString() },
    { name: "page", value: page },
  ].filter(Boolean) as TQueryParam[];

  const { data, isLoading, isFetching } = useGetAllProductsQuery(queryParams);
  const productData = data?.data;
  const totalPages = data?.meta?.totalPage;

  const { data: brandData } = useGetAllbrandsQuery({
    category: selectedCategories.join(","),
    skip: !selectedCategories,
  });

  const brands = brandData?.data;

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="custom-container mt-10 grid grid-cols-1 md:grid-cols-4 md:gap-4">
      {/* Filters Section */}
      <div className="col-span-1">
        <div className="p-4 border rounded-lg w-full">
          <FInput
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-4 w-full mx-auto">
            <h2 className="text-lg font-semibold mb-2">Price Range</h2>
            <div className="relative">
              <ReactSlider
                className="w-full h-2"
                thumbClassName="h-5 w-5 bg-primary rounded-full cursor-pointer border-2 border-white focus:outline-none"
                trackClassName="bg-primary h-2 rounded-lg"
                value={range}
                min={0}
                max={1000}
                onChange={(value) => setRange(value)}
                pearling
                minDistance={10}
              />
            </div>
            <div className="flex justify-between mt-5">
              <input
                type="number"
                className="w-20 text-center border border-gray-300 rounded px-2 py-1"
                value={range[0]}
                readOnly
              />
              <input
                type="number"
                className="w-20 text-center border border-gray-300 rounded px-2 py-1"
                value={range[1]}
                readOnly
              />
            </div>
          </div>

          <div className="mt-4" onClick={() => setInStock(!inStock)}>
            <label
              htmlFor="inStock"
              className="text-lg block font-semibold mb-2"
            >
              In Stock
            </label>
            <Checkbox
              id="inStock"
              checked={inStock}
              onClick={() => setInStock(!inStock)}
            />{" "}
            In Stock
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            {categories?.map((category, index) => (
              <div key={index}>
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>

          {brands && brands?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Brands</h2>
              {brands?.map((brand, index) => (
                <div key={index}>
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={brand} className="ml-2">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Display Section */}
      <div className="col-span-3">
        <div className="mb-3 border flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between bg-gray-100 p-3 rounded-md">
          {/* Search Term */}
          <p className="text-lg font-medium">Products</p>

          {/* Filter Options */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Show Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show:</span>
              <select
                className="border rounded-md p-1"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                {[10, 20, 30, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort By:</span>
              <select
                className="border rounded-md p-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="-createdAt">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {isFetching || isLoading ? (
            <div className="w-10 mt-10 mx-auto">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {productData?.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <div>
            <CustomPagination
              page={page}
              totalPages={totalPages as number}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1); // Reset to page 1 when limit changes
              }}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
