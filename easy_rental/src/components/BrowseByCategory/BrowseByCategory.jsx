import CategoryCard from '../CategoryCard/CatergoryCard'
import teslaImage from "../assets/img/tesla.png";
import bmw from "../assets/img/bmw.png";
import mercedes from "../assets/img/mercedes.png";

const BrowseByCategory = () => (
    <section className="py-12 px-6 md:px-10 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <a className="text-primary hover:underline" href="browse-cars">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CategoryCard
            imgSrc={teslaImage}
            imgAlt="Economy Cars"
            title="Economy Cars"
            description="Fuel-efficient and affordable"
          />
          <CategoryCard
            imgSrc={bmw}
            imgAlt="Luxury Cars"
            title="Luxury Cars"
            description="Indulge in style and comfort"
          />
          <CategoryCard
            imgSrc={mercedes}
            imgAlt="SUVs"
            title="SUVs"
            description="Spacious and versatile"
          />
          <CategoryCard
            imgSrc={teslaImage}
            imgAlt="Vans"
            title="Vans"
            description="Spacious and comfortable"
          />
        </div>
      </div>
    </section>
  );
  
export default BrowseByCategory;  